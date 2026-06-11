// Cloudflare Pages Function: handles POST /api/contact
//
// Receives the contact form submission, validates it, drops obvious spam via a
// honeypot field, and relays the message to support via Resend.
//
// Required Cloudflare Pages env var (Settings -> Environment variables):
//   RESEND_API_KEY        - Resend API key (store as a secret/encrypted)
// Optional overrides:
//   CONTACT_TO            - recipient address (default: support@sessionbuddy.com)
//   CONTACT_FROM          - sender, must be on a Resend-verified domain
//                           (default: "Session Buddy Contact <contact@sessionbuddy.com>")
//   TURNSTILE_SECRET_KEY  - Cloudflare Turnstile secret (store as a secret).
//                           When set, submissions must carry a valid token
//                           (the frontend's PUBLIC_TURNSTILE_SITE_KEY pairs with
//                           it). When unset, the captcha check is skipped.

interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
  TURNSTILE_SECRET_KEY?: string;
}

interface RequestContext {
  request: Request;
  env: Env;
}

const TO_DEFAULT = 'support@sessionbuddy.com';
const FROM_DEFAULT = 'Session Buddy Contact <contact@sessionbuddy.com>';

const MAX_LENGTHS: Record<string, number> = {
  name: 100,
  email: 200,
  subject: 150,
  message: 5000,
};

export async function onRequestPost(
  context: RequestContext,
): Promise<Response> {
  const { request, env } = context;

  if (!env.RESEND_API_KEY) {
    return json({ error: 'The contact form is not configured.' }, 500);
  }

  // accept JSON (from the React form) or a classic form post

  let data: Record<string, unknown>;

  try {
    const contentType = request.headers.get('content-type') ?? '';

    if (contentType.includes('application/json')) {
      data = (await request.json()) as Record<string, unknown>;
    } else {
      const form = await request.formData();
      data = Object.fromEntries(form.entries());
    }
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  // honeypot: real users never fill `company`; silently accept and drop bots

  if (str(data.company)) {
    return json({ ok: true });
  }

  const name = str(data.name);
  const email = str(data.email);
  const subject = str(data.subject);
  const message = str(data.message);

  const errors: Record<string, string> = {};

  if (!name) errors.name = 'Please enter your name.';

  if (!email) errors.email = 'Please enter your email.';
  else if (!isValidEmail(email)) errors.email = 'Please enter a valid email.';

  if (!message) errors.message = 'Please enter a message.';

  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    if (str(data[field]).length > max) {
      errors[field] = 'This field is too long.';
    }
  }

  if (Object.keys(errors).length) {
    return json({ errors }, 422);
  }

  // captcha: verify the Turnstile token with Cloudflare before sending anything
  if (env.TURNSTILE_SECRET_KEY) {
    const token = str(data.turnstileToken);

    if (!token) {
      return json({ error: 'Please complete the captcha.' }, 422);
    }

    const passed = await verifyTurnstile(
      token,
      env.TURNSTILE_SECRET_KEY,
      request.headers.get('CF-Connecting-IP'),
    );

    if (!passed) {
      return json(
        { error: 'Captcha verification failed. Please try again.' },
        422,
      );
    }
  }

  let res: Response;

  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM ?? FROM_DEFAULT,
        to: env.CONTACT_TO ?? TO_DEFAULT,
        reply_to: email,
        subject: subject.trim() || 'Session Buddy Support inquiry',
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p>${escapeHtml(message)}</p>`,
      }),
    });
  } catch (err) {
    // network/subrequest failure reaching Resend — surface it rather than
    // letting it bubble up as Cloudflare's generic "error code: 502"
    console.error('contact: fetch to Resend threw', err);
    return json(
      { error: 'Could not reach the mail service.', detail: String(err) },
      502,
    );
  }

  if (!res.ok) {
    // TODO: drop `status`/`detail` from the response once delivery is verified
    const detail = await res.text().catch(() => '');
    console.error('contact: Resend returned', res.status, detail);
    return json(
      {
        error: 'Could not send your message. Please try again later.',
        status: res.status,
        detail,
      },
      502,
    );
  }

  return json({ ok: true });
}

const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';

// Validate a Turnstile token against Cloudflare's siteverify endpoint. Returns
// false on any failure (bad token, network error, malformed response) so the
// caller can reject the submission.
async function verifyTurnstile(
  token: string,
  secret: string,
  ip: string | null,
): Promise<boolean> {
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body });
    if (!res.ok) return false;
    const outcome = (await res.json()) as { success?: boolean };
    return outcome.success === true;
  } catch (err) {
    console.error('contact: Turnstile verify threw', err);
    return false;
  }
}

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
