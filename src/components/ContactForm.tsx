import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import { tw } from '@/util/tailwind';

type Status = 'idle' | 'submitting' | 'success' | 'error';

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

  const update =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-primaryTextColor font-medium"
        >
          Email
        </label>
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
        disabled={submitting}
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
    </form>
  );
};
