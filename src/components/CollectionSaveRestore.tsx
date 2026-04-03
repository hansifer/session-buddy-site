import { useEffect, useRef } from 'react';
import { sampleSites } from '@/sampleSites';
import { selectRandom } from '@/util/array';

// todo: don't start animation until in view, and pause when out of view. use IntersectionObserver. see example in LoopingVideo.tsx.
// todo: make front-most window content sessionbuddy.com
// todo: "Save" button similar to "Restore" with cursor and press before windows are dismissed. button sits near bottom, floating over windows.
// todo: allow height prop. requires height adjustment on each window, impacting page content draw. current canvas height is determined by number of windows.

const WAIT_SECONDS = 5.0;
const FINAL_HOLD_SECONDS = 1.4;
const FINALE_SECONDS = 5.0;
const DISMISS_TO_FINALE_OVERLAP_SECONDS = 0.42;
const CURSOR_ENTRY_SECONDS = 0.9;
const CURSOR_CLICK_START_SECONDS = 1.08;
const CURSOR_CLICK_SECONDS = 0.32;

const FONT_FAMILY = '"Segoe UI", "Helvetica Neue", Arial, sans-serif';

const WINDOW_BORDER_RADIUS = 8;
const WINDOW_OFFSET_X = 0;
const WINDOW_OFFSET_Y = 0;

const TAB_BORDER_RADIUS = 5;

const BUTTON_WIDTH = 132;
const BUTTON_HEIGHT = 38;

const CHECKMARK_RADIUS = 28;
const CHECKMARK_P1_COORDS = { x: -13, y: 1 };
const CHECKMARK_P2_COORDS = { x: -4, y: 10 };
const CHECKMARK_P3_COORDS = { x: 12, y: -8 };

const checkmarkLeg1X = CHECKMARK_P2_COORDS.x - CHECKMARK_P1_COORDS.x;
const checkmarkLeg1Y = CHECKMARK_P2_COORDS.y - CHECKMARK_P1_COORDS.y;
const checkmarkLeg2X = CHECKMARK_P3_COORDS.x - CHECKMARK_P2_COORDS.x;
const checkmarkLeg2Y = CHECKMARK_P2_COORDS.y - CHECKMARK_P3_COORDS.y;

const CHECKMARK_LEG1_LEN = Math.sqrt(
  checkmarkLeg1X * checkmarkLeg1X + checkmarkLeg1Y * checkmarkLeg1Y,
);

const CHECKMARK_LEG2_LEN = Math.sqrt(
  checkmarkLeg2X * checkmarkLeg2X + checkmarkLeg2Y * checkmarkLeg2Y,
);

const CHECKMARK_LEN = CHECKMARK_LEG1_LEN + CHECKMARK_LEG2_LEN;

type BrowserWindow = {
  offsetX: number;
  offsetY: number;
  scale: number;
  opacity: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
};

export const CollectionSaveRestore = ({
  width = 960,
  windowHorizontalOffsetBasis = 16,
  windowVerticalOffset = 42,
  minTabs = 6,
  maxTabs = 10,
  windowCount = 5,
  windowSpeed = 3.008,
  isLight = false,
  toolbarHeight = 34,
  tabHeight = 28,
}: {
  width?: number;
  windowHorizontalOffsetBasis?: number;
  windowVerticalOffset?: number;
  minTabs?: number;
  maxTabs?: number;
  windowCount?: number;
  windowSpeed?: number;
  isLight?: boolean;
  toolbarHeight?: number;
  tabHeight?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // cleanup
    let isDisposed = false;
    let animationFrameId = 0;

    const height = 446 + windowVerticalOffset * (windowCount - 1);

    canvasRef.current.style.width = `${width}px`;
    canvasRef.current.style.height = `${height}px`;

    const dpr = Math.max(1, window.devicePixelRatio || 1);

    canvasRef.current.width = Math.floor(width * dpr);
    canvasRef.current.height = Math.floor(height * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const windowWidth = width * 0.708;
    const windowHeight = 380; // height * 0.704;

    const colors = getColors(isLight);

    const centerX = width / 2;

    const savedCheckmarkCenterY = 140; // height / 2;

    const checkmarkP1 = {
      x: centerX + CHECKMARK_P1_COORDS.x,
      y: savedCheckmarkCenterY + CHECKMARK_P1_COORDS.y,
    };

    const checkmarkP2 = {
      x: centerX + CHECKMARK_P2_COORDS.x,
      y: savedCheckmarkCenterY + CHECKMARK_P2_COORDS.y,
    };

    const checkmarkP3 = {
      x: centerX + CHECKMARK_P3_COORDS.x,
      y: savedCheckmarkCenterY + CHECKMARK_P3_COORDS.y,
    };

    const restoreButtonY = 260; // height / 2 + 84;
    const restoreButtonCenterY = restoreButtonY + BUTTON_HEIGHT / 2;
    const tabAreaHeight = tabHeight + 4;
    const toolbarY = WINDOW_OFFSET_Y + tabAreaHeight + 4;
    const pageY = toolbarY + toolbarHeight;
    const pageH = windowHeight - tabAreaHeight - toolbarHeight;

    const windows: BrowserWindow[] = Array.from({ length: windowCount }).map(
      (_, i) => getBrowserWindow(ctx, i),
    );

    function getBrowserWindow(
      ctx: CanvasRenderingContext2D,
      idx: number,
      // isFront?: boolean,
    ): BrowserWindow {
      const offsetStep = idx % 4;

      const offsetUnits =
        offsetStep === 0 // wrap
          ? 0
          : Math.ceil(offsetStep / 2) * (idx % 2 === 1 ? 1 : -1);

      const baseX =
        (width - windowWidth) / 2 + offsetUnits * windowHorizontalOffsetBasis;

      const baseY = 30 + idx * windowVerticalOffset;

      const contentLineWidths = getRandomLineWidths();

      const tabs = selectRandom(
        sampleSites,
        minTabs +
          Math.floor(
            Math.random() *
              (Math.min(Math.max(maxTabs, minTabs), sampleSites.length) -
                minTabs +
                1),
          ),
      );

      const activeTab = Math.floor(Math.random() * tabs.length);

      const window: BrowserWindow = {
        offsetX: 0,
        offsetY: 0,
        scale: 1,
        opacity: 1,
        draw,
      };

      return window;

      function draw(ctx: CanvasRenderingContext2D) {
        ctx.save();

        ctx.translate(
          baseX + windowWidth / 2 + window.offsetX,
          baseY + windowHeight / 2 + window.offsetY,
        );

        ctx.scale(window.scale, window.scale);
        ctx.translate(-windowWidth / 2, -windowHeight / 2);
        ctx.globalAlpha = window.opacity;

        // shadow

        ctx.shadowColor = colors.windowShadow;
        ctx.shadowBlur = 40;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.beginPath();
        ctx.moveTo(WINDOW_OFFSET_X + WINDOW_BORDER_RADIUS, WINDOW_OFFSET_Y);
        ctx.lineTo(
          WINDOW_OFFSET_X + windowWidth - WINDOW_BORDER_RADIUS,
          WINDOW_OFFSET_Y,
        );
        ctx.arcTo(
          WINDOW_OFFSET_X + windowWidth,
          WINDOW_OFFSET_Y,
          WINDOW_OFFSET_X + windowWidth,
          WINDOW_OFFSET_Y + WINDOW_BORDER_RADIUS,
          WINDOW_BORDER_RADIUS,
        );
        ctx.lineTo(
          WINDOW_OFFSET_X + windowWidth,
          WINDOW_OFFSET_Y + windowHeight - WINDOW_BORDER_RADIUS,
        );
        ctx.arcTo(
          WINDOW_OFFSET_X + windowWidth,
          WINDOW_OFFSET_Y + windowHeight,
          WINDOW_OFFSET_X + windowWidth - WINDOW_BORDER_RADIUS,
          WINDOW_OFFSET_Y + windowHeight,
          WINDOW_BORDER_RADIUS,
        );
        ctx.lineTo(
          WINDOW_OFFSET_X + WINDOW_BORDER_RADIUS,
          WINDOW_OFFSET_Y + windowHeight,
        );
        ctx.arcTo(
          WINDOW_OFFSET_X,
          WINDOW_OFFSET_Y + windowHeight,
          WINDOW_OFFSET_X,
          WINDOW_OFFSET_Y + windowHeight - WINDOW_BORDER_RADIUS,
          WINDOW_BORDER_RADIUS,
        );
        ctx.lineTo(WINDOW_OFFSET_X, WINDOW_OFFSET_Y + WINDOW_BORDER_RADIUS);
        ctx.arcTo(
          WINDOW_OFFSET_X,
          WINDOW_OFFSET_Y,
          WINDOW_OFFSET_X + WINDOW_BORDER_RADIUS,
          WINDOW_OFFSET_Y,
          WINDOW_BORDER_RADIUS,
        );
        ctx.closePath();

        // window background

        ctx.fillStyle = colors.chromeTop;
        ctx.fill();

        // window border

        ctx.strokeStyle = colors.border;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // reset shadows so inner UI elements render crisp

        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        drawTabs();
        drawToolbar();

        // if (isFront) {
        //   drawGooglePage();
        // } else {
        drawPage();
        // }

        ctx.restore();
      }

      function drawTabs() {
        const tabWidth = Math.min(110, (windowWidth - 20) / tabs.length);
        const ty = WINDOW_OFFSET_Y + 6;

        for (let i = 0; i < tabs.length; i++) {
          const tx = WINDOW_OFFSET_X + 8 + i * tabWidth;
          const isActive = i === activeTab;

          // tab

          ctx.beginPath();
          ctx.moveTo(tx + TAB_BORDER_RADIUS, ty);
          ctx.lineTo(tx + tabWidth - TAB_BORDER_RADIUS - 2, ty);
          ctx.arcTo(
            tx + tabWidth - 2,
            ty,
            tx + tabWidth - 2,
            ty + TAB_BORDER_RADIUS,
            TAB_BORDER_RADIUS,
          );
          ctx.lineTo(tx + tabWidth - 2, ty + tabHeight - 2);
          ctx.lineTo(tx, ty + tabHeight - 2);
          ctx.lineTo(tx, ty + TAB_BORDER_RADIUS);
          ctx.arcTo(tx, ty, tx + TAB_BORDER_RADIUS, ty, TAB_BORDER_RADIUS);
          ctx.closePath();
          ctx.fillStyle = isActive ? colors.tabActive : colors.tabInactive;
          ctx.fill();

          // favicon

          ctx.beginPath();
          ctx.arc(tx + 13, ty + tabHeight / 2, 4, 0, Math.PI * 2);
          ctx.fillStyle = tabs[i].color;
          ctx.fill();

          // title

          if (tabWidth > 50) {
            ctx.fillStyle = isActive ? colors.tabTextActive : colors.tabText;
            ctx.font = `400 10px ${FONT_FAMILY}`;
            ctx.textBaseline = 'middle';
            ctx.save();
            ctx.beginPath();
            ctx.rect(tx + 22, ty, tabWidth - 32, tabHeight);
            ctx.clip();
            ctx.fillText(tabs[i].title, tx + 22, ty + tabHeight / 2 + 1);
            ctx.restore();
          }
        }
      }

      function drawToolbar() {
        ctx.fillStyle = colors.toolbarBg;
        ctx.fillRect(WINDOW_OFFSET_X, toolbarY, windowWidth, toolbarHeight);

        for (let i = 0; i < 3; i++) {
          drawBrowserButton(WINDOW_OFFSET_X + 14 + i * 18);
        }

        drawAddressBar();
      }

      function drawBrowserButton(x: number) {
        ctx.beginPath();
        ctx.arc(
          // wrap
          x,
          toolbarY + toolbarHeight / 2,
          5,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = colors.browserButton;
        ctx.fill();
      }

      function drawAddressBar() {
        const verticalSpacing = 6;
        const addrX = WINDOW_OFFSET_X + 64;
        const addrY = toolbarY + verticalSpacing;
        const addrW = windowWidth - (addrX + 16);
        const addrH = toolbarHeight - verticalSpacing * 2;

        ctx.beginPath();
        ctx.roundRect(addrX, addrY, addrW, addrH, 1_000);
        ctx.fillStyle = colors.addressBg;
        ctx.fill();

        ctx.fillStyle = colors.tabText;
        ctx.font = `400 9px ${FONT_FAMILY}`;
        ctx.textBaseline = 'middle';
        ctx.fillText(
          // wrap
          tabs[activeTab].url,
          addrX + 14,
          addrY + addrH / 2 + 1,
        );
      }

      // function drawGooglePage() {
      //   ctx.fillStyle = colors.pageContent;
      //   ctx.fillRect(WINDOW_OFFSET_X, pageY, windowWidth, pageH);

      //   const cx = WINDOW_OFFSET_X + windowWidth / 2;

      //   // logo

      //   const letters = ['G', 'o', 'o', 'g', 'l', 'e'];
      //   const logoY = pageY + pageH * 0.3;
      //   const logoW = letters.length * 17;

      //   ctx.font = `600 24px ${FONT_FAMILY}`;
      //   ctx.fillStyle = colors.google;
      //   ctx.textBaseline = 'middle';
      //   ctx.textAlign = 'center';

      //   letters.forEach((letter, i) => {
      //     ctx.fillText(letter, cx - logoW / 2 + i * 17, logoY);
      //   });

      //   // search bar

      //   const searchY = logoY + 32;
      //   const searchW = Math.min(300, windowWidth - 80);

      //   ctx.beginPath();
      //   ctx.roundRect(cx - searchW / 2, searchY, searchW, 24, 1_000);
      //   ctx.fillStyle = colors.inputBg;
      //   ctx.fill();

      //   ctx.strokeStyle = colors.border;
      //   ctx.lineWidth = 0.5;
      //   ctx.stroke();

      //   ctx.fillStyle = colors.tabText;
      //   ctx.font = `400 10px ${FONT_FAMILY}`;
      //   ctx.textAlign = 'center';
      //   ctx.textBaseline = 'middle';
      //   ctx.fillText('Search Google or type a URL', cx, searchY + 12);
      // }

      function drawPage() {
        ctx.fillStyle = colors.pageContent;
        ctx.fillRect(WINDOW_OFFSET_X, pageY, windowWidth, pageH);

        // top nav

        const topNavHeight = 34;

        ctx.fillStyle = colors.pageTopNav;
        ctx.fillRect(WINDOW_OFFSET_X, pageY, windowWidth, topNavHeight);

        // top nav line

        const topNavLineHeight = 10;

        ctx.fillStyle = colors.pageTopNavLine;
        ctx.fillRect(
          WINDOW_OFFSET_X + 14,
          pageY + topNavHeight / 2 - topNavLineHeight / 2,
          windowWidth * 0.62,
          topNavLineHeight,
        );

        // left nav

        const leftNavWidth = Math.max(110, windowWidth * 0.22);

        ctx.fillStyle = colors.pageLeftNav;
        ctx.fillRect(
          WINDOW_OFFSET_X,
          pageY + topNavHeight,
          leftNavWidth,
          pageH - topNavHeight,
        );

        // left nav lines

        const leftNavLineHeight = 8;

        ctx.fillStyle = colors.pageLeftNavLine;

        for (let i = 0; i < 6; i++) {
          ctx.fillRect(
            WINDOW_OFFSET_X + 14,
            pageY + topNavHeight + 16 + i * 20,
            leftNavWidth - 28,
            leftNavLineHeight,
          );
        }

        // main content

        const mainX = WINDOW_OFFSET_X + leftNavWidth + 16;
        const mainY = pageY + topNavHeight + 14;
        const mainW = windowWidth - leftNavWidth - 30;

        // header line

        ctx.fillStyle = colors.pageHeaderLine;
        ctx.fillRect(
          mainX,
          mainY,
          Math.min(Math.max(140, mainW * 0.56), mainW * 0.8),
          12,
        );

        // content lines

        ctx.fillStyle = colors.textMuted;

        for (let row = 0; row < contentLineWidths.length; row++) {
          const y = mainY + 28 + row * 16;
          const w = Math.min(contentLineWidths[row], mainW - 8);

          ctx.fillRect(mainX, y, w, 7);
        }

        // cards

        const cardY = mainY + 122;
        const cardH = pageH - (cardY - pageY) - 14;

        if (cardH > 60) {
          const cardCount = mainW < 200 ? 1 : 2;
          const cardSpacing = 12;
          const cardW = (mainW - cardSpacing * (cardCount - 1)) / cardCount;

          for (let i = 0; i < cardCount; i++) {
            const x = mainX + i * (cardW + cardSpacing);

            ctx.fillStyle = colors.pageCard;
            ctx.fillRect(x, cardY, cardW, cardH);

            ctx.fillStyle = colors.pageCardHeaderLine;
            ctx.fillRect(x + 10, cardY + 10, cardW * 0.64, 8);

            ctx.fillStyle = colors.textMuted;
            ctx.fillRect(x + 10, cardY + 25, cardW * 0.8, 6);
            ctx.fillRect(x + 10, cardY + 37, cardW * 0.58, 6);
          }
        }
      }
    }

    function drawSaved({
      ctx,
      alpha,
      checkmarkProgress,
      buttonPress = 0,
      buttonHovered = false,
    }: {
      ctx: CanvasRenderingContext2D;
      alpha: number;
      checkmarkProgress: number;
      buttonPress?: number;
      buttonHovered?: boolean;
    }) {
      if (checkmarkProgress > 0) {
        ctx.beginPath();
        ctx.save();

        drawCheckmark(ctx, checkmarkProgress, alpha);

        const secondaryItemsAlpha =
          alpha * Math.min(Math.max((checkmarkProgress - 0.6) / 0.4, 0), 1);

        drawSavedLabel(ctx, secondaryItemsAlpha);
        drawRestoreButton(ctx, buttonPress, buttonHovered, secondaryItemsAlpha);

        ctx.restore();
      }
    }

    function drawCheckmark(
      ctx: CanvasRenderingContext2D,
      progress: number,
      alpha: number,
    ) {
      ctx.save();

      ctx.globalAlpha = alpha;

      // ring scale pop

      const ringScale = easeOutBack(Math.min(progress * 1.4, 1));
      ctx.translate(centerX, savedCheckmarkCenterY);
      ctx.scale(ringScale, ringScale);
      ctx.translate(-centerX, -savedCheckmarkCenterY);

      // circle

      ctx.beginPath();
      ctx.arc(centerX, savedCheckmarkCenterY, CHECKMARK_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = colors.checkFill;
      ctx.fill();

      // checkmark stroke

      const checkProgress = Math.max(0, Math.min((progress - 0.25) / 0.75, 1));
      const easeProgress = easeOut(checkProgress);

      if (easeProgress > 0) {
        const drawn = easeProgress * CHECKMARK_LEN;

        ctx.beginPath();
        ctx.strokeStyle = colors.checkmark;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (drawn <= CHECKMARK_LEG1_LEN) {
          const t = drawn / CHECKMARK_LEG1_LEN;
          ctx.moveTo(checkmarkP1.x, checkmarkP1.y);
          ctx.lineTo(
            checkmarkP1.x + (checkmarkP2.x - checkmarkP1.x) * t,
            checkmarkP1.y + (checkmarkP2.y - checkmarkP1.y) * t,
          );
        } else {
          const t = (drawn - CHECKMARK_LEG1_LEN) / CHECKMARK_LEG2_LEN;
          ctx.moveTo(checkmarkP1.x, checkmarkP1.y);
          ctx.lineTo(checkmarkP2.x, checkmarkP2.y);
          ctx.lineTo(
            checkmarkP2.x + (checkmarkP3.x - checkmarkP2.x) * t,
            checkmarkP2.y + (checkmarkP3.y - checkmarkP2.y) * t,
          );
        }

        ctx.stroke();
      }

      ctx.restore();
    }

    function drawSavedLabel(ctx: CanvasRenderingContext2D, alpha: number) {
      ctx.save();

      ctx.globalAlpha = alpha;

      ctx.fillStyle = colors.savedText;
      ctx.font = `500 18px ${FONT_FAMILY}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Tabs saved', centerX, savedCheckmarkCenterY + 56);

      ctx.restore();
    }

    function drawRestoreButton(
      ctx: CanvasRenderingContext2D,
      press: number,
      hovered = false,
      alpha = 1,
    ) {
      const x = centerX - BUTTON_WIDTH / 2;
      const scale = 1 - press * 0.06;

      ctx.save();

      ctx.globalAlpha = alpha;
      ctx.translate(centerX, restoreButtonCenterY);
      ctx.scale(scale, scale);
      ctx.translate(-centerX, -restoreButtonCenterY);

      ctx.beginPath();
      ctx.roundRect(x, restoreButtonY, BUTTON_WIDTH, BUTTON_HEIGHT, 10);
      ctx.fillStyle = hovered ? colors.buttonHovered : colors.button;
      ctx.fill();

      ctx.fillStyle = colors.buttonLabel;
      ctx.font = `400 14px ${FONT_FAMILY}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Restore', centerX, restoreButtonCenterY + 1);

      ctx.restore();
    }

    function drawPointerCursor(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
    ) {
      ctx.save();

      ctx.globalAlpha = 1;
      ctx.translate(x, y);
      ctx.rotate(-0.14);
      ctx.scale(0.7, 0.7);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 24);
      ctx.lineTo(6, 18);
      ctx.lineTo(11, 30);
      ctx.lineTo(16, 28);
      ctx.lineTo(10, 16);
      ctx.lineTo(18, 16);
      ctx.closePath();

      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.strokeStyle = '#101010';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.restore();
    }

    let phase = 'wait';
    let phaseTime = 0;
    let dismissIdx = windowCount - 1;
    let restoreIdx = 0;
    let readLaterAlpha = 0;
    let checkT = 0;

    let lastTime = 0;
    let lastPhase: string | null = null; // logging

    function draw(ctx: CanvasRenderingContext2D) {
      if (isDisposed) return;

      const now = performance.now();

      const dt = Math.min((now - lastTime) / 1_000, 0.05) * 1.32;

      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      if (!lastPhase || lastPhase !== phase) {
        // console.log(`phase: ${phase}`);
        lastPhase = phase;
      }

      if (phase === 'wait') {
        phaseTime += dt;
        windows.forEach((w) => w.draw(ctx));
        if (phaseTime > WAIT_SECONDS) {
          phase = 'dismiss';
          phaseTime = 0;
        }
      } else if (phase === 'dismiss') {
        phaseTime += dt * windowSpeed;
        const progress = Math.min(phaseTime, 1);
        const ep = easeOut(progress);

        for (let i = 0; i < dismissIdx; i++) {
          windows[i].draw(ctx);
        }

        if (dismissIdx < windows.length) {
          const win = windows[dismissIdx];
          const side = dismissIdx % 2 === 0 ? -1 : 1;
          win.offsetX = ep * side * -70;
          win.offsetY = ep * 30;
          win.scale = 1 - ep * 0.62;
          win.opacity = 1 - ep;
          win.draw(ctx);
        }

        if (dismissIdx === 0) {
          const overlapT = progress * DISMISS_TO_FINALE_OVERLAP_SECONDS;
          const overlapAlpha = Math.min(
            easeInOut(Math.max(0, overlapT - 0.05) / 0.5),
            1,
          );
          drawSaved({
            ctx,
            alpha: overlapAlpha,
            checkmarkProgress: 0,
          });
        }

        if (progress >= 1) {
          dismissIdx--;
          phaseTime = 0;
          if (dismissIdx < 0) {
            phase = 'finale';
            phaseTime = DISMISS_TO_FINALE_OVERLAP_SECONDS;
          }
        }
      } else if (phase === 'finale') {
        phaseTime += dt;
        readLaterAlpha = Math.min(
          easeInOut(Math.max(0, phaseTime - 0.05) / 0.5),
          1,
        );
        checkT = Math.min(Math.max((phaseTime - 0.2) / 0.9, 0), 1);

        drawSaved({
          ctx,
          alpha: readLaterAlpha,
          checkmarkProgress: checkT,
        });
        if (phaseTime > FINALE_SECONDS) {
          phase = 'hold';
          phaseTime = 0;
        }
      } else if (phase === 'hold') {
        phaseTime += dt;

        const clickProgress = Math.min(
          Math.max(
            (phaseTime - CURSOR_CLICK_START_SECONDS) / CURSOR_CLICK_SECONDS,
            0,
          ),
          1,
        );

        const clickDown =
          clickProgress < 0.5
            ? easeInOut(clickProgress / 0.5)
            : easeInOut((1 - clickProgress) / 0.5);

        const hoverProgress = Math.min(
          Math.max(
            (phaseTime - CURSOR_ENTRY_SECONDS * 0.85) /
              (CURSOR_CLICK_START_SECONDS - CURSOR_ENTRY_SECONDS * 0.85),
            0,
          ),
          1,
        );

        drawSaved({
          ctx,
          alpha: 1,
          checkmarkProgress: 1,
          buttonPress: clickDown,
          buttonHovered: hoverProgress > 0.005,
        });

        const entryT = Math.min(phaseTime / CURSOR_ENTRY_SECONDS, 1);

        const cursorBaseX = lerp(
          width + 54,
          centerX + 38,
          easeOut(Math.max(0, entryT)),
        );

        const cursorBaseY = lerp(
          height + 52,
          restoreButtonY + BUTTON_HEIGHT / 2,
          easeOut(Math.max(0, entryT)),
        );

        drawPointerCursor(
          // wrap
          ctx,
          cursorBaseX,
          cursorBaseY + clickDown * 4,
        );

        if (phaseTime > FINAL_HOLD_SECONDS) {
          phase = 'reverseFinale';
          phaseTime = 0;
        }
      } else if (phase === 'reverseFinale') {
        phaseTime += dt;
        const progress = Math.min(phaseTime / 0.55, 1);
        const ep = easeInOut(progress);
        drawSaved({
          ctx,
          alpha: 1 - ep,
          checkmarkProgress: 1,
        });
        if (progress >= 1) {
          phase = 'restore';
          phaseTime = 0;
          restoreIdx = 0;
        }
      } else if (phase === 'restore') {
        phaseTime += dt * windowSpeed;
        const progress = Math.min(phaseTime, 1);
        const ep = easeOut(progress);

        for (let i = 0; i < restoreIdx; i++) {
          const win = windows[i];
          win.offsetX = 0;
          win.offsetY = 0;
          win.scale = 1;
          win.opacity = 1;
          win.draw(ctx);
        }

        if (restoreIdx < windows.length) {
          const win = windows[restoreIdx];
          const side = restoreIdx % 2 === 0 ? -1 : 1;
          const reverseEp = 1 - ep;
          win.offsetX = reverseEp * side * -70;
          win.offsetY = reverseEp * 30;
          win.scale = 1 - reverseEp * 0.62;
          win.opacity = ep;
          win.draw(ctx);
        }

        if (progress >= 1) {
          if (restoreIdx < windows.length) {
            const win = windows[restoreIdx];
            win.offsetX = 0;
            win.offsetY = 0;
            win.scale = 1;
            win.opacity = 1;
          }

          restoreIdx++;
          phaseTime = 0;

          if (restoreIdx >= windows.length) {
            phase = 'wait';
            phaseTime = 0;
            dismissIdx = windowCount - 1;
            restoreIdx = 0;
            readLaterAlpha = 0;
            checkT = 0;
          }
        }
      }

      animationFrameId = requestAnimationFrame(() => draw(ctx));

      // console.log(
      //   'frame time: ' + (performance.now() - now).toFixed(2) + 'ms',
      // );
    }

    draw(ctx);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    width,
    windowHorizontalOffsetBasis,
    windowVerticalOffset,
    minTabs,
    maxTabs,
    windowCount,
    windowSpeed,
    isLight,
    toolbarHeight,
    tabHeight,
  ]);

  return <canvas ref={canvasRef} />;
};

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeOutBack(t: number) {
  const c1 = 2.70158;

  return 1 + (c1 + 1) * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

function getRandomLineWidths() {
  return [220, 188, 250, 198, 238].map((w) => w + Math.random() * 54);
}

function getColors(isLight: boolean) {
  return isLight
    ? {
        addressBg: '#fff',
        border: '#bbb',
        browserButton: '#bbb',
        button: '#011a37',
        buttonHovered: '#005c9b',
        buttonLabel: '#ffffff',
        checkFill: '#1d9e75',
        checkmark: '#fff',
        chromeTop: '#e8e6e2',
        google: '#aaa',
        inputBg: '#f5f4f1',
        pageCard: '#f3f2ef',
        pageCardHeaderLine: '#d7d5d0',
        pageContent: '#fff',
        pageHeaderLine: '#d2d0cb',
        pageLeftNav: '#faf9f7',
        pageLeftNavLine: '#d8d6d2',
        pageTopNav: '#f4f3f1',
        pageTopNavLine: '#dddbd7',
        savedText: '#085041',
        tabActive: '#ffffff',
        tabInactive: '#ccc9c5',
        tabText: '#555',
        tabTextActive: '#222',
        textMuted: '#ccc',
        toolbarBg: '#dddbd7',
        windowShadow: 'rgba(0, 0, 0, 0.2)',
      }
    : {
        addressBg: '#1e1e22',
        border: '#444',
        browserButton: '#444',
        button: '#011a37',
        buttonHovered: '#005c9b',
        buttonLabel: '#fff',
        checkFill: '#1d9e75',
        checkmark: '#fff',
        chromeTop: '#3a3a3e',
        google: '#aaa',
        inputBg: '#252528',
        pageCard: '#292933',
        pageCardHeaderLine: '#3e3e47',
        pageContent: '#1e1e22',
        pageHeaderLine: '#4a4a56',
        pageLeftNav: '#212126',
        pageLeftNavLine: '#373740',
        pageTopNav: '#242428',
        pageTopNavLine: '#33333a',
        savedText: '#fff',
        tabActive: '#1e1e22',
        tabInactive: '#2a2a2e',
        tabText: '#aaa',
        tabTextActive: '#ddd',
        textMuted: '#555',
        toolbarBg: '#2e2e32',
        windowShadow: 'rgba(0, 0, 0, 0.95)',
      };
}
