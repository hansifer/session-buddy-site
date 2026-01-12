import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

import { InvitationModal } from '@/components/InvitationModal';
import heroImage from '@/assets/images/screenshot.png';

type ImageTransform = {
  translateY: number; // scroll-based effect
  translateZ: number; // mouseover-based effect
  rotateX: number; // mouseover-based effect
  rotateY: number; // mouseover-based effect
};

const IMG_SCROLL_FLOAT_SPEED = 0.1;
const IMG_SCROLL_FLOAT_MAX = 40; // px
const IMG_MOUSEOVER_POPOUT = 30;
const IMG_MOUSEOVER_TILT = 10;

export const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number>(null);

  const transformRef = useRef<ImageTransform>({
    translateY: 0,
    translateZ: 0,
    rotateX: 0,
    rotateY: 0,
  });

  const transformImage = (
    callback: (img: HTMLImageElement) => Partial<ImageTransform>,
  ) => {
    const img = imgRef.current;

    if (!img) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      transformRef.current = {
        ...transformRef.current,
        ...callback(img),
      };

      img.style.transform = `translateY(${transformRef.current.translateY}px) translateZ(${transformRef.current.translateZ}px) rotateX(${transformRef.current.rotateX}deg) rotateY(${transformRef.current.rotateY}deg)`;
    });
  };

  useEffect(() => {
    const onScroll = () => {
      transformImage(() => ({
        translateY: -Math.min(
          window.scrollY * IMG_SCROLL_FLOAT_SPEED,
          IMG_SCROLL_FLOAT_MAX,
        ),
      }));
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // initial positioning
    onScroll();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    transformImage((img) => {
      // measure relative to the image element itself so positioning is accurate
      const rect = img.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 -> 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const dist = Math.min(1, Math.hypot(px, py) * 1.2);

      return {
        translateZ: (1 - dist) * IMG_MOUSEOVER_POPOUT,
        rotateX: py * IMG_MOUSEOVER_TILT,
        rotateY: px * IMG_MOUSEOVER_TILT * -1,
      };
    });
  };

  const handleLeave = () => {
    transformImage(() => ({
      translateZ: 0,
      rotateX: 0,
      rotateY: 0,
    }));
  };

  return (
    // to clip screenshot: step 1 of 2: add class `overflow-hidden`
    <section
      className="
        flex
        justify-center
        w-full
        pb-24
        sm:pb-32
        md:pb-44
        lg:pb-0
        mb-[34vw]
        lg:mb-[14vw]
        xl:mb-60
        from-primaryBackgroundColor
        to-ternaryBackgroundColor
        bg-linear-to-b
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          w-full
          md:w-200
          xl:w-225
          text-center
        "
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.05,
          }}
        >
          <h1
            className="
              px-8
              md:px-20
              lg:px-4
              mt-16
              sm:mt-32
              text-5xl
              sm:text-6xl
              lg:text-7xl
              xl:text-7xl
              font-bold
              tracking-wide
              text-primaryTextColor
            "
          >
            Tame Your Tabs.
          </h1>
          <h1
            className="
              px-8
              sm:px-20
              md:px-24
              mt-2
              text-4xl
              sm:text-6xl
              lg:text-7xl
              xl:text-7xl
              font-bold
              tracking-wide
              text-primaryColor
            "
          >
            Master Your Workflow.
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
          }}
        >
          <h2
            className="
              px-12
              sm:px-48
              mt-10
              text-sm
              sm:text-base
              xl:text-lg
              text-secondaryTextColor
            "
          >
            Experience seamless business integrations and powerful insights with
            our cutting-edge analytic tools.
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
        >
          <button
            aria-label="Get started for free"
            className="
              w-52
              h-12
              mt-14
              mb-26
              sm:mb-40
              contained-button
            "
            onClick={() => setIsModalOpen(true)}
          >
            Get started for free
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10, zIndex: 20 }}
          animate={{ opacity: 1, y: 0, zIndex: 20 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
        >
          <div
            className="
              flex
              justify-center
              w-screen
              relative
              perspective-distant
              transform-3d
            "
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            <img
              ref={imgRef}
              src={heroImage.src}
              alt="Hero image"
              className="
                absolute
                lg:top-6
                xl:top-0
                w-4/5
                2xl:w-300
                max-w-245
                rounded-xl
                shadow-[0_50px_90px_rgba(0,0,0,0.6)]
                transform-gpu
                transition-transform
                duration-700
                ease-[cubic-bezier(.2,.8,.2,1)]
                will-change-transform
              "
            />
          </div>
        </motion.div>
        {/* to clip screenshot: step 2 of 2: add class `z-20` */}
        <div
          className="
            w-screen
            pointer-events-none
          "
        >
          <div
            className="
              hidden
              lg:block
              mt-4
              sm:mt-16
              md:mt-52
              overflow-hidden
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 114"
              preserveAspectRatio="none"
              className="
                w-full
                h-50
                bg-transparent
                fill-primaryBackgroundColor
              "
            >
              <path d="M0 0 L598.97 114.72 0 114 Z" />
              <path d="M598.97 114 L1200 0 L1200 114 Z" />
            </svg>
          </div>
        </div>
      </div>
      {isModalOpen ? (
        <InvitationModal onClose={() => setIsModalOpen(false)} />
      ) : null}
    </section>
  );
};
