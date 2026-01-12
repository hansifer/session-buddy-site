import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Logo } from '@/components/Logo';
import { tw } from '@/util/tailwind';

import '@/styles/global.css';

// use of ! on margins in this file is to override Starlight's css reset (only an issue in docs; impacts prod builds only)

type Mode = 'default' | 'docs';

type Link = {
  label: string;
  href: string;
  ariaLabel: string;
  hidden?: boolean;
  variant?: 'contained' | 'outlined';
};

const centerLinks: Link[] = [
  {
    label: 'Features',
    href: '/#features',
    ariaLabel: 'Features',
  },
  {
    label: 'Docs',
    href: '/docs',
    ariaLabel: 'Docs',
  },
  {
    label: 'Pricing',
    href: '/pricing',
    ariaLabel: 'Pricing',
    hidden: true,
  },
];

const rightLinks: Link[] = [
  {
    label: 'Log in',
    href: '/login',
    ariaLabel: 'Log in',
    hidden: true,
  },
  {
    label: 'Sign up',
    href: '/signup',
    ariaLabel: 'Sign up',
    variant: 'outlined',
    hidden: true,
  },
  {
    label: 'Install',
    href: '/install',
    ariaLabel: 'Install',
    variant: 'contained',
  },
];

export const Navbar = ({ mode = 'default' }: { mode?: Mode }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    const opening = !isMobileNavOpen;

    // hide Starlight search and mobile nav menu buttons (if present) when site mobile nav menu is open. this wasn't done via z-index because of stacking contexts nor via other css because of messy selectors across dom subtrees although this might be worth revisiting later.
    toggleHideElements(
      [
        // wrap
        '#starlight-search-btn-container',
        'starlight-menu-button',
      ],
      opening,
    );

    if (opening) {
      // close Starlight mobile nav menu (if open) when opening the site mobile nav menu
      const buttonEl = document.querySelector('starlight-menu-button');

      if (buttonEl) {
        buttonEl.setAttribute('aria-expanded', 'false'); // Starlight origin state for menu expanded
        document.body.toggleAttribute('data-mobile-menu-expanded', false); // additional convenience state established by Starlight
      }
    }

    setIsMobileNavOpen(opening);
  };

  const closeMobileNav = () => {
    toggleHideElements(
      [
        // wrap
        '#starlight-search-btn-container',
        'starlight-menu-button',
      ],
      false,
    );

    setIsMobileNavOpen(false);
  };

  return (
    <nav
      aria-label="Main navigation"
      className={tw`
        flex
        justify-center
        items-center
        w-full
        min-h-20
        z-40
        ${
          mode === 'docs'
            ? 'fixed backdrop-blur-xl'
            : 'lg:fixed lg:backdrop-blur-xl'
        }
      `}
    >
      <div
        className={tw`
          flex
          justify-between
          items-center
          relative
          ${
            mode === 'docs'
              ? 'w-[calc(100%-48px)]'
              : 'w-11/12 xl:w-10/12 2xl:w-7xl'
          }
        `}
      >
        <motion.div
          initial={{ opacity: mode === 'docs' ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
        >
          <a
            href="/"
            aria-label="Home"
          >
            <div
              className="
                flex
                gap-3
                items-center
                text-primaryColor
              "
            >
              <Logo />
              <div
                className="
                  text-xl
                  font-bold
                "
              >
                <span className="text-white">Session </span>
                <span className="text-white">Buddy</span>
              </div>
            </div>
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: mode === 'docs' ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="
              absolute
              inset-0
              hidden
              lg:flex
              items-center
              justify-center
              gap-10
              2xl:gap-12
              pointer-events-none
            "
          >
            {centerLinks
              .filter(({ hidden }) => !hidden)
              .map(({ href, label, ariaLabel }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={ariaLabel}
                  className="
                    text-2xl
                    font-normal
                    lg:font-medium
                    lg:text-base
                  text-white
                    hover:scale-110
                    transition
                    pointer-events-auto
                  "
                >
                  {label}
                </a>
              ))}
          </div>
        </motion.div>
        {mode === 'default' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="
                hidden
                lg:flex
                gap-4
              "
            >
              {rightLinks
                .filter(({ hidden }) => !hidden)
                .map(({ href, label, ariaLabel, variant }) => (
                  <a
                    key={href}
                    href={href}
                    aria-label={ariaLabel}
                    target="_blank"
                    className={tw`
                      px-4
                      py-2
                      text-sm
                      leading-none
                      text-white
                      ${
                        variant === 'contained'
                          ? 'contained-button'
                          : variant === 'outlined'
                          ? 'outlined-button'
                          : ''
                      }
                    `}
                  >
                    {label}
                  </a>
                ))}
            </div>
          </motion.div>
        ) : null}
        <div
          className="
            fixed
            top-5
            right-5
            lg:hidden
            px-2
            py-3
            border
            border-gray-600
            rounded-md
            z-70
            bg-primaryBackgroundColor
            hover:bg-blockBackgroundColor
            transition
            cursor-pointer
          "
          onClick={() => toggleMobileNav()}
        >
          <div
            className="
              w-5
              h-0.5
              mb-1!
              bg-gray-500
            "
          ></div>
          <div
            className="
              w-5
              h-0.5
              mb-1!
              bg-gray-500
            "
          ></div>
          <div
            className="
              w-5
              h-0.5
              bg-gray-500
            "
          ></div>
        </div>
      </div>
      <MobileNav
        links={centerLinks}
        isOpen={isMobileNavOpen}
        onClose={() => closeMobileNav()}
      />
    </nav>
  );
};

const MobileNav = ({
  links,
  isOpen,
  onClose,
}: {
  links: Link[];
  isOpen: boolean;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {isOpen ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0 }}
      >
        <div
          className="
            fixed
            top-0
            left-0
            lg:hidden
            flex
            flex-col
            gap-8
            items-center
            w-full
            py-8
            z-60
            bg-secondaryBackgroundColor
            shadow-lg
            shadow-black/50
            select-none
          "
        >
          {links
            .filter(({ hidden }) => !hidden)
            .map(({ label, href, ariaLabel }) => (
              <a
                key={href}
                href={href}
                aria-label={ariaLabel}
                className="
                  p-2
                  text-2xl
                  lg:text-base
                  lg:font-medium
                  text-white
                  hover:scale-110
                  transition
                  cursor-pointer
                "
                onClick={() => onClose()}
              >
                {label}
              </a>
            ))}
        </div>
      </motion.div>
    ) : null}
  </AnimatePresence>
);

function toggleHideElements(selectors: string[], hide: boolean) {
  selectors.forEach((selector) => {
    const el = document.querySelector(selector) as HTMLElement | null;

    if (el) {
      el.style.display = hide ? 'none' : '';
    }
  });
}
