import { useEffect, useRef } from 'react';

// renders a looping video that only plays when in viewport. includes workaround for videos that stall and stop looping.

export const LoopingVideo = ({ src, alt }: { src: string; alt: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let outOfView = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // console.log('playing video');
          outOfView = false;
          video.play();
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
      if (document.hidden || outOfView) return;

      if (video.ended || video.paused) {
        // console.log('video ended or paused. restarting...');
        video.play();
        stallCount = 0;
      } else if (video.currentTime === lastTime) {
        stallCount++;

        if (stallCount >= 2) {
          // currentTime hasn't moved for 2 consecutive checks
          // console.log('video stalled. restarting...');
          video.currentTime = 0;
          video.play();
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
