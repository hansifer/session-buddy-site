// prevents simple email harvesting by bots

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
      const mailto = [
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

      // option 1:
      e.currentTarget.href = mailto;

      // option 2 (opens in same tab):
      // e.preventDefault();
      // window.location.href = mailto;

      // option 3:
      // e.preventDefault();
      // window.open(mailto, '_blank', 'noopener,noreferrer');
    }}
    target="_blank"
    rel="noreferrer"
    aria-label="Session Buddy contact email"
    className={className}
  >
    {text}
  </a>
);
