export const MailTo = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      window.location.href = [
        'ma',
        'il',
        'to:',
        'supp',
        'ort',
        '@',
        'sess',
        'ionb',
        'uddy',
        '.c',
        'om',
      ].join('');
    }}
    rel="noreferrer"
    aria-label="Session Buddy contact email"
    className={className}
  >
    {text}
  </a>
);
