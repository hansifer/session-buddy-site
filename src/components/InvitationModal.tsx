import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { CloseIcon } from '@/assets/icons/CloseIcon';
import { BulletList } from '@/components/BulletList';
import { Logo } from '@/components/Logo';

export const InvitationModal = ({ onClose }: { onClose: () => void }) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  // set up portal container

  useEffect(() => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    setContainer(el);

    return () => {
      document.body.removeChild(el);
    };
  }, []);

  // set app to inert when modal is open

  useEffect(() => {
    const appEl = document.getElementById('app');

    if (!appEl) return;

    appEl.setAttribute('inert', 'true');
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.scrollbarGutter = 'stable';

    return () => {
      appEl.removeAttribute('inert');
      document.documentElement.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('scrollbar-gutter');
    };
  }, []);

  // close on escape key

  useEffect(() => {
    const handleKeyDown = ({ code }: KeyboardEvent) => {
      if (code === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!container) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, zIndex: 70 }}
        animate={{ opacity: 1, zIndex: 70 }}
        transition={{ duration: 0.1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className="
            fixed
            inset-0
            flex
            justify-center
            items-center
            z-70
            bg-popupBackdropColor
          "
          onClick={() => onClose()}
        >
          <div
            className="
              relative
              w-full
              sm:w-3/4
              md:w-3/5
              lg:w-250
              xl:w-275
              h-dvh
              sm:h-auto
              px-8
              sm:px-16
              py-12
              sm:mb-8
              block-border
              sm:rounded-2xl
              backdrop-blur-xl
              bg-popupBackgroundColor
            "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex">
              <div
                className="
                  hidden
                  lg:inline
                  flex-1
                "
              >
                <h2
                  className="
                    mt-4
                    mb-2
                    text-5xl
                    font-bold
                    tracking-normal
                    text-primaryTextColor
                  "
                >
                  Subscribe Now
                </h2>
                <h2
                  className="
                    text-5xl
                    font-bold
                    tracking-normal
                    text-secondaryColor
                  "
                >
                  Winter is coming
                </h2>
                <BulletList
                  items={[
                    'Vestibulum viverra',
                    'Morbi mollis metus pretium',
                    'Etiam lectus nunc, commodo',
                  ]}
                  className="mt-12"
                />
              </div>
              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  flex-1
                  pt-24
                  sm:pt-0
                "
              >
                <div
                  className="
                    lg:hidden
                    flex
                    items-center
                    gap-4
                    mb-8
                    text-white
                  "
                >
                  <div>
                    <Logo size={25} />
                  </div>
                  <div
                    className="
                      text-3xl
                      font-bold
                    "
                  >
                    Session Buddy
                  </div>
                </div>
                <h3
                  className="
                    mb-5
                    text-2xl
                    font-bold
                    leading-snug
                    text-center
                    text-primaryTextColor
                  "
                >
                  Join 3,953 other tab hoarders
                </h3>
                <div
                  className="
                    w-full
                    max-w-100
                  "
                >
                  <div
                    className="
                      w-full
                      sm:w-4/5
                      p-2
                      mx-auto
                    "
                  >
                    <input
                      id="email"
                      type="text"
                      placeholder="Your email address"
                      className="
                        w-full
                        p-4
                        font-medium
                        text-center
                        border
                        border-gray-300
                        rounded-xl
                        text-gray-500
                        placeholder-gray-500
                        bg-gray-300
                        outline-none
                        focus:ring
                        focus:ring-indigo-300
                      "
                    />
                  </div>
                  <div
                    className="
                      w-full
                      sm:w-4/5
                      p-2
                      mx-auto
                      mt-4
                    "
                  >
                    <button
                      type="button"
                      aria-label="Join now"
                      className="
                        w-full
                        px-6
                        py-4
                        font-semibold
                        rounded-xl
                        text-primaryTextColor
                        bg-primaryColor
                        hover:opacity-80
                        outline-none
                        focus:ring
                        focus:ring-indigo-300
                        shadow-4xl
                        transition
                        ease-in-out
                        duration-200
                        cursor-pointer
                      "
                    >
                      Join Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="
                  absolute
                  top-4
                  right-6
                  w-5
                  text-ternaryColor
                  hover:text-white
                  transition
                  cursor-pointer
                "
              onClick={() => onClose()}
            >
              <CloseIcon />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    container,
  );
};
