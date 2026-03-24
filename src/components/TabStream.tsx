import { useEffect, useRef } from 'react';
import { getRandomBrandIcons } from '@/brandIcons';
import { COLLECTION_COLORS_DARK } from '@/collectionColors';

// todo: avoid consecutive repeats of the same icon
// todo: use brand-specific tile colors? (from thesvg metadata)
// todo: generalize into a comp that accepts icons and colors

const DEFAULT_COUNT = 13; // number of tabs simultaneously on the strip
const DEFAULT_SPEED = 0.0036;
const DEFAULT_FADE_IN_SPEED = 0.013;

type TAB = {
  pos: number;
  iconIdx: number;
  color: string;
};

export const TabStream = ({
  width = 470,
  height = 360,
  count = DEFAULT_COUNT,
  speed = DEFAULT_SPEED,
  fadeInSpeed = DEFAULT_FADE_IN_SPEED,
}: {
  width?: number;
  height?: number;
  count?: number;
  speed?: number;
  fadeInSpeed?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    canvasRef.current.width = width;
    canvasRef.current.height = height;

    // Safari does not support CanvasRenderingContext2D.filter
    const filterFallback = !ctx.filter // wrap
      ? getFilterFallback(height)
      : null;

    // cleanup
    let animationFrameId = 0;
    let isDisposed = false;

    // logging
    let prevFrontmostTabIdx = 0;

    const icons = getRandomBrandIcons(100);

    const fallbackIcon =
      icons.find((icon) => icon.slug === 'youtube') || icons[0];

    // Each tab is an object with a fixed icon, spawned once, traveling from pos=1 (near) to pos=0 (far)
    // pos decrements by `speed` each frame; when pos<0 it wraps back to 1 and gets a new icon
    const tabs: TAB[] = Array.from({ length: count }).map((_, i) => ({
      pos: i / count, // evenly spaced along the strip at start
      iconIdx: i % icons.length,
      color: COLLECTION_COLORS_DARK[i % COLLECTION_COLORS_DARK.length],
    }));

    function getRailPos(t: number) {
      const nearX = width * 0.72;
      const farX = -width * 0.05;

      return {
        sx: farX + Math.pow(t, 0.72) * (nearX - farX),
        sy: height * 0.48 + Math.pow(t, 2.5) * height * 0.06,
      };
    }

    function getTabSize(t: number) {
      const size = 7 + Math.pow(t, 1.2) * height * 0.48;

      // use eg `size * 1.3` for rectangle
      return {
        w: size,
        h: size,
      };
    }

    function drawTab({
      ctx,
      sx,
      sy,
      w,
      h,
      color,
      iconIdx,
      alpha,
      t,
    }: {
      ctx: CanvasRenderingContext2D;
      sx: number;
      sy: number;
      w: number;
      h: number;
      color: string;
      iconIdx: number;
      alpha: number;
      t: number;
    }) {
      ctx.save();
      ctx.globalAlpha = alpha;

      if (t > 0.5) {
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = t * 22;
        ctx.shadowOffsetX = t * 5;
      }

      // ----- BACKGROUND -----

      const r = Math.max(2, w * 0.13);
      const x = sx - w * 0.5;
      const y = sy - h * 0.5;

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h - r);
      ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx.lineTo(x + r, y + h);
      ctx.arcTo(x, y + h, x, y + h - r, r);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath();
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;

      // ----- BORDER -----

      // ctx.strokeStyle = 'rgba(255,255,255,' + (0.08 + t * 0.18) + ')';
      // ctx.lineWidth = Math.max(0.5, t * 1.5);
      // ctx.stroke();

      // ----- ICON -----

      const iconSize = h * 0.45;

      if (iconSize > 5 && alpha > 0.15) {
        let icon = icons[iconIdx];

        if (!icon || !icon.ready) {
          icon = fallbackIcon;
        }

        ctx.globalAlpha = alpha * 0.95;

        const naturalWidth = icon.image.naturalWidth || 1;
        const naturalHeight = icon.image.naturalHeight || 1;
        const aspect = naturalWidth / naturalHeight;
        const drawW = aspect >= 1 ? iconSize : iconSize * aspect;
        const drawH = aspect >= 1 ? iconSize / aspect : iconSize;

        if (filterFallback) {
          const { bufferCanvas, bufferCtx } = filterFallback;

          bufferCtx.clearRect(0, 0, drawW + 1, drawH + 1);
          bufferCtx.globalCompositeOperation = 'source-over';
          bufferCtx.drawImage(icon.image, 0, 0, drawW, drawH);
          bufferCtx.globalCompositeOperation = 'source-in';
          bufferCtx.fillStyle = 'white';
          bufferCtx.fillRect(0, 0, drawW, drawH);

          ctx.drawImage(
            bufferCanvas,
            0,
            0,
            drawW,
            drawH,
            sx - drawW * 0.5,
            sy - drawH * 0.5,
            drawW,
            drawH,
          );
        } else {
          ctx.save();
          ctx.filter = 'brightness(0) invert(1)'; // make white

          ctx.drawImage(
            icon.image,
            sx - drawW * 0.5,
            sy - drawH * 0.5,
            drawW,
            drawH,
          );

          ctx.restore();
        }
      }

      ctx.restore();
    }

    function draw(ctx: CanvasRenderingContext2D) {
      if (isDisposed) return;

      // const start = performance.now();

      ctx.clearRect(0, 0, width, height);

      // advance each tab away from the viewer. recycle when it exits the far end.

      for (let i = 0; i < count; i++) {
        tabs[i].pos -= speed;

        if (tabs[i].pos < 0.0) {
          // wrap back to the near end and assign a new icon
          tabs[i].pos += 1.0;
          tabs[i].iconIdx = Math.floor(Math.random() * icons.length);
        }
      }

      let frontmostTabIdx = 0;
      for (let i = 1; i < count; i++) {
        if (tabs[i].pos > tabs[frontmostTabIdx].pos) {
          frontmostTabIdx = i;
        }
      }

      // build render list sorted far to near (smallest t first)

      const renderList = [];

      for (let i = 0; i < count; i++) {
        const t = Math.pow(tabs[i].pos, 2.4);

        const { sx, sy } = getRailPos(tabs[i].pos);
        const { w, h } = getTabSize(t);

        let alpha = Math.min(1, Math.pow(t, 0.35) * 1.1);
        let scale = 1;

        if (i === frontmostTabIdx) {
          // fade in
          const entryProgress = Math.min(1, (1 - tabs[i].pos) / fadeInSpeed);

          alpha *= entryProgress;
          scale = 0.72 + entryProgress * 0.28;

          if (
            localStorage.getItem('debug-tab-stream') === 'true' &&
            frontmostTabIdx !== prevFrontmostTabIdx
          ) {
            console.log(icons[tabs[i].iconIdx].slug);
            prevFrontmostTabIdx = frontmostTabIdx;
          }
        }

        renderList.push({
          sx,
          sy,
          w: w * scale,
          h: h * scale,
          t,
          alpha,
          iconIdx: tabs[i].iconIdx,
          color: tabs[i].color,
        });
      }

      renderList.sort((a, b) => a.t - b.t);

      for (let i = 0; i < renderList.length; i++) {
        if (renderList[i].alpha < 0.03) continue;

        drawTab({
          ctx,
          ...renderList[i],
        });
      }

      animationFrameId = requestAnimationFrame(() => draw(ctx));

      // console.log(
      //   'frame time: ' + (performance.now() - start).toFixed(2) + 'ms',
      // );
    }

    draw(ctx);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);

      icons.forEach(({ image }) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, [
    // wrap
    width,
    height,
    count,
    speed,
    fadeInSpeed,
  ]);

  return <canvas ref={canvasRef} />;
};

function getFilterFallback(height: number) {
  const bufferSize = Math.ceil(height * 0.6);

  const bufferCanvas = document.createElement('canvas');
  bufferCanvas.width = bufferSize;
  bufferCanvas.height = bufferSize;

  const bufferCtx = bufferCanvas.getContext('2d', {
    willReadFrequently: true,
  });

  if (!bufferCtx) return null;

  return {
    bufferCanvas,
    bufferCtx,
  };
}
