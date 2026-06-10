// links to the on-site contact form (formerly a mailto: link)

export const MailTo = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <a
    href="/contact"
    aria-label="Contact Session Buddy"
    className={className}
  >
    {text}
  </a>
);
