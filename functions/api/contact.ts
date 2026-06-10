// Cloudflare Pages Function: handles POST /api/contact
//
// Receives the contact form submission, validates it, drops obvious spam via a
// honeypot field, and relays the message to support via Resend.
//
// Required Cloudflare Pages env var (Settings -> Environment variables):
//   RESEND_API_KEY   - Resend API key (store as a secret/encrypted)
// Optional overrides:
//   CONTACT_TO       - recipient address (default: support@sessionbuddy.com)
//   CONTACT_FROM     - sender, must be on a Resend-verified domain
//                      (default: "Session Buddy Contact <contact@sessionbuddy.com>")

interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
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

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
