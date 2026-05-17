import { useEffect, useRef } from 'react';

// renders a looping video that only plays when in viewport. includes workaround for videos that stall and stop looping.

export const LoopingVideo = ({ src, alt }: { src: string; alt: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let outOfView = false;
    let sourceUnsupported = false;

    // Astro's ClientRouter swaps in a newly parsed body during client-side navigation. Reset media selection after mount so videos that arrived via a route transition begin loading in the active document.
    video.load();

    const playVideo = () => {
      if (sourceUnsupported) return;

      // play() returns a promise and can reject while the source is still loading
      // or if the browser cannot use the source. Avoid surfacing that as an
      // unhandled rejection; the interval below will retry when appropriate.
      void video.play().catch((error: unknown) => {
        if (
          error instanceof DOMException &&
          error.name === 'NotSupportedError'
        ) {
          sourceUnsupported = true;
        }
      });
    };

    const handleError = () => {
      if (video.error?.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
        sourceUnsupported = true;
      }
    };

    video.addEventListener('error', handleError);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // console.log('playing video');
          outOfView = false;
          playVideo();
        } else {
          // console.log('pausing video');
          outOfView = true;
          video.pause();
          video.currentTime = 0;
        }
      },
      { threshold: 0.8 },
    );

    observer.observe(video);

    let lastTime = -1;
    let stallCount = 0;

    const interval = setInterval(() => {
      if (document.hidden || outOfView || sourceUnsupported) return;

      if (video.ended || video.paused) {
        // console.log('video ended or paused. restarting...');
        playVideo();
        stallCount = 0;
      } else if (video.currentTime === lastTime) {
        stallCount++;

        if (stallCount >= 2) {
          // currentTime hasn't moved for 2 consecutive checks
          // console.log('video stalled. restarting...');
          video.currentTime = 0;
          playVideo();
          stallCount = 0;
        }
      } else {
        stallCount = 0;
      }

      lastTime = video.currentTime;
    }, 500); // interval downscales to 1s when document is hidden

    return () => {
      observer.disconnect();
      clearInterval(interval);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      preload="auto"
      src={src}
      aria-label={alt}
      controls={false}
      autoPlay
      loop
      muted
      playsInline
      className="
        w-full
        rounded-xl
        shadow-2xl
        shadow-black/80
      "
    />
  );
};
