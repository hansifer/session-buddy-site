import { Logo } from '@/components/Logo';

const socials = [
  // {
  //   name: 'Facebook',
  //   icon: <Logo />,
  //   url: '#',
  // },
  // {
  //   name: 'Twitter',
  //   icon: <Logo />,
  //   url: '#',
  // },
  // {
  //   name: 'Instagram',
  //   icon: <Logo />,
  //   url: '#',
  // },
] as const;

const sections = [
  {
    title: 'Products',
    links: [
      {
        label: 'Services',
        href: '#',
      },
      {
        label: 'About us',
        href: '#',
      },
      {
        label: 'News and stories',
        href: '#',
      },
      {
        label: 'Roadmap',
        href: '#',
      },
    ],
  },
  {
    title: 'Important links',
    links: [
      {
        label: 'Organization team',
        href: '#',
      },
      {
        label: 'Our journeys',
        href: '#',
      },
      {
        label: 'Pricing plans',
        href: '#',
      },
      {
        label: 'Roadmap',
        href: '#',
      },
      {
        label: 'Terms & conditions',
        href: '#',
      },
      {
        label: 'Privacy policy',
        href: '#',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      {
        label: 'About us',
        href: '#',
      },
      {
        label: 'Jobs',
        href: '#',
      },
      {
        label: 'Press',
        href: '#',
      },
      {
        label: 'Contact us',
        href: '#',
      },
    ],
  },
] as const;

export const Footer = () => {
  return (
    <footer aria-label="Site footer">
      <div
        className="
          pt-10
          lg:pt-20
          pb-24
          lg:pb-16
          bg-secondaryBackgroundColor
        "
      >
        <div
          className="
            flex
            gap-10
            container
            w-4/5
            lg:w-10/12
            xl:w-4/5
            2xl:w-2/3
            px-4
            mx-auto
          "
        >
          <div
            className="
              flex
              flex-col
              items-center
              lg:items-start
              text-center
              lg:text-left
              max-w-120
              lg:max-w-sm
              mx-auto
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
                text-white
              "
            >
              <Logo />
              <div
                className="
                  text-xl
                  font-bold
                "
              >
                Session Buddy
              </div>
            </div>
            <p
              className="
                mt-4
                leading-loose
                text-secondaryTextColor
              "
            >
              Session Buddy is built by a team of passionate developers. Read
              more about our software philosophy{' '}
              <a
                href="#"
                aria-label="Session Buddy development philosophy"
                className="text-primaryTextColor"
              >
                here
              </a>
              .
            </p>
            {socials?.length ? (
              <div
                className="
                  flex
                  items-center
                  gap-2
                  mx-auto
                  lg:mx-0
                  mt-10
                "
              >
                {socials.map(({ name, icon, url }) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    aria-label={name}
                    className="
                      w-10
                      h-10
                      outlined-button
                    "
                  >
                    {icon}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
          <div
            className="
              hidden
              lg:flex
              justify-between
              flex-auto
              xl:pl-30
              whitespace-nowrap
            "
          >
            {sections.map(({ title, links }) => (
              <div
                key={title}
                className="px-6"
              >
                <h3
                  className="
                    mb-6
                    text-2xl
                    font-bold
                  text-primaryTextColor
                  "
                >
                  {title}
                </h3>
                <ul>
                  {links.map(({ label, href }) => (
                    <li
                      key={href}
                      className="mb-4"
                    >
                      <a
                        href={href}
                        aria-label={label}
                        className="
                          text-secondaryTextColor
                          hover:text-primaryTextColor
                          transition-colors
                        "
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
