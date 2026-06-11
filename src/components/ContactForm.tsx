import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import { tw } from '@/util/tailwind';

type Status = 'idle' | 'submitting' | 'success' | 'error';

// Cloudflare Turnstile. The site key is public and injected at build time via an
// Astro `PUBLIC_`-prefixed env var; the matching secret lives only on the server
// (see functions/api/contact.ts). When unset (e.g. local dev without keys) the
// widget is skipped and the form still works.
const TURNSTILE_SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY as
  | string
  | undefined;

const TURNSTILE_SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

interface TurnstileApi {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback?: (token: string) => void;
      'error-callback'?: () => void;
      'expired-callback'?: () => void;
      theme?: 'auto' | 'light' | 'dark';
    },
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let turnstileScriptPromise: Promise<void> | undefined;

// Load the Turnstile script once, shared across any mounts of this component.
function loadTurnstile(): Promise<void> {
  if (turnstileScriptPromise) return turnstileScriptPromise;

  turnstileScriptPromise = new Promise<void>((resolve, reject) => {
    if (window.turnstile) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Turnstile.'));
    document.head.appendChild(script);
  });

  return turnstileScriptPromise;
}

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
  // honeypot: kept empty by humans, filled by bots; see functions/api/contact.ts
  company: '',
};

type FormState = typeof initialForm;

const inputClassName = tw`
  w-full
  px-4
  py-3
  rounded-2xl
  bg-blockBackgroundColor
  block-border
  text-primaryTextColor
  placeholder:text-secondaryTextColor
  outline-none
  focus:border-primaryColor
  transition-colors
`;

export const ContactForm = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState('');

  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // The success screen replaces the form (and its widget container) entirely, so
  // the widget's lifetime is tied to the form being visible.
  const formVisible = status !== 'success';

  // Render the Turnstile widget while the form is shown, and tear it down when
  // it's hidden (e.g. on the success screen) or on unmount. Re-running on
  // `formVisible` is what lets a fresh widget appear after "Send another
  // message". The token arrives via `callback` and is cleared if it errors or
  // expires.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !formVisible) return;

    let cancelled = false;

    loadTurnstile()
      .then(() => {
        if (
          cancelled ||
          !widgetRef.current ||
          !window.turnstile ||
          widgetIdRef.current !== null
        ) {
          return;
        }

        widgetIdRef.current = window.turnstile.render(widgetRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: 'auto',
          callback: (t) => setToken(t),
          'error-callback': () => setToken(''),
          'expired-callback': () => setToken(''),
        });
      })
      .catch(() => {
        // leave the token empty; submit stays blocked until the user retries
      });

    return () => {
      cancelled = true;
      setToken('');
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [formVisible]);

  // Turnstile tokens are single-use, so clear and re-challenge after a failed
  // attempt (the form stays visible). On success the form unmounts and the
  // effect above handles teardown instead.
  const resetTurnstile = () => {
    setToken('');
    if (widgetIdRef.current !== null && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  };

  const update =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (TURNSTILE_SITE_KEY && !token) {
      setStatus('error');
      setErrorMessage('Please complete the captcha.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken: token }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
          errors?: Record<string, string>;
        };

        const message =
          data.error ??
          (data.errors ? Object.values(data.errors)[0] : undefined) ??
          'Something went wrong. Please try again.';

        throw new Error(message);
      }

      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong.',
      );
      resetTurnstile();
    }
  };

  if (status === 'success') {
    return (
      <div
        className="
          px-6
          sm:px-10
          py-12
          rounded-3xl
          bg-blockBackgroundColor
          block-border
          text-center
        "
      >
        <h2 className="content-title">Thanks — message sent!</h2>
        <p className="mt-3 text-secondaryTextColor">
          We&apos;ve received your message and will get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="
            mt-8
            inline-flex
            items-center
            justify-center
            rounded-full
            px-6
            py-3
            font-semibold
            bg-primaryColor
            text-primaryBackgroundColor
            transition
            hover:opacity-90
          "
        >
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="
        flex
        flex-col
        gap-5
        px-6
        sm:px-10
        py-10
        rounded-3xl
        bg-blockBackgroundColor
        block-border
      "
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="text-primaryTextColor font-medium"
        >
          Name
        </label>
        <span>
          {/* wrapped because lastpass may append sibling div after <input/> and container is a flex container with gap */}
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            value={form.name}
            onChange={update('name')}
            disabled={submitting}
            className={inputClassName}
            placeholder="Your name"
          />
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-primaryTextColor font-medium"
        >
          Email
        </label>
        <span>
          {/* wrapped because lastpass may append sibling div after <input/> and container is a flex container with gap */}
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            value={form.email}
            onChange={update('email')}
            disabled={submitting}
            className={inputClassName}
            placeholder="you@example.com"
          />
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="subject"
          className="text-primaryTextColor font-medium"
        >
          Subject{' '}
          <span className="text-secondaryTextColor font-normal">
            (optional)
          </span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          maxLength={150}
          value={form.subject}
          onChange={update('subject')}
          disabled={submitting}
          className={inputClassName}
          placeholder="What's this about?"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-primaryTextColor font-medium"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={5000}
          rows={6}
          value={form.message}
          onChange={update('message')}
          disabled={submitting}
          className={`${inputClassName} resize-y`}
          placeholder="How can we help?"
        />
      </div>

      {/* honeypot field — visually hidden, ignored by humans */}
      <div
        aria-hidden="true"
        className="hidden"
      >
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={update('company')}
        />
      </div>

      {status === 'error' && errorMessage ? (
        <p
          role="alert"
          className="text-red-400"
        >
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting || (!!TURNSTILE_SITE_KEY && !token)}
        className="
          mt-2
          inline-flex
          items-center
          justify-center
          rounded-full
          px-6
          py-3
          font-semibold
          bg-primaryColor
          text-primaryBackgroundColor
          transition
          hover:opacity-90
          disabled:opacity-60
          disabled:cursor-not-allowed
        "
      >
        {submitting ? 'Sending…' : 'Send message'}
      </button>

      {TURNSTILE_SITE_KEY ? (
        <div
          ref={widgetRef}
          className="mt-4 text-center"
        />
      ) : null}
    </form>
  );
};
