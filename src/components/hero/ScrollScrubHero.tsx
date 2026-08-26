"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { homeHero } from "../../../content/home";
import {
  HERO_FRAME_COUNT,
  HERO_POSTER,
  HERO_SCRUB_VIDEO,
  heroFramePath,
} from "@/lib/hero-sequence";

/** Viewport-heights of page scroll that play the full sequence. */
const SCRUB_VH = 2.5;
/** Viewport-heights of scroll before hero copy fully fades out. */
const HERO_COPY_FADE_VH = 0.4;
/** Longer scroll range for the left/right headline exit (slower than the fade). */
const HERO_COPY_SLIDE_VH = 1.05;
/** Remaining sequence played while scrolling through Why ProAct. */
const RESUME_SCRUB_VH = 0.9;
const PRACTICE_OVERVIEW_ID = "practice-overview";
const WHY_PROACT_ID = "why-proact";
const SECTION_TRIGGER_RATIO = 0.2;
const LERP = 0.2;
/** Minimum time delta (seconds) before issuing another video seek. */
const SEEK_EPS = 1 / 48;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function getSectionTriggerScrollY(element: HTMLElement, viewportHeight: number) {
  return Math.max(element.offsetTop - viewportHeight * SECTION_TRIGGER_RATIO, 0);
}

function getScrubProgress(
  scrollY: number,
  viewportHeight: number,
  frozenProgressRef: { current: number },
) {
  const scrubDistance = Math.max(viewportHeight * SCRUB_VH, 1);
  const heroProgress = clamp(scrollY / scrubDistance);

  const practiceEl = document.getElementById(PRACTICE_OVERVIEW_ID);
  const whyEl = document.getElementById(WHY_PROACT_ID);

  if (!practiceEl || !whyEl) {
    return heroProgress;
  }

  const pauseScrollY = getSectionTriggerScrollY(practiceEl, viewportHeight);
  const resumeScrollY = getSectionTriggerScrollY(whyEl, viewportHeight);
  const pauseProgress = clamp(pauseScrollY / scrubDistance);

  if (scrollY < pauseScrollY) {
    frozenProgressRef.current = pauseProgress;
    return heroProgress;
  }

  if (scrollY >= resumeScrollY) {
    const resumeDistance = Math.max(viewportHeight * RESUME_SCRUB_VH, 1);
    const localProgress = clamp((scrollY - resumeScrollY) / resumeDistance);
    const frozen = frozenProgressRef.current || pauseProgress;
    return frozen + (1 - frozen) * localProgress;
  }

  frozenProgressRef.current = pauseProgress;
  return pauseProgress;
}

export function ScrollScrubHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const heroUpperRef = useRef<HTMLSpanElement>(null);
  const heroLowerRef = useRef<HTMLSpanElement>(null);
  const targetTime = useRef(0);
  const currentTime = useRef(0);
  const seeking = useRef(false);
  const useFrames = useRef(false);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const drawnFrame = useRef(-1);
  const rafRef = useRef<number | null>(null);
  const frozenProgress = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [mode, setMode] = useState<"video" | "frames">("video");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const copy = heroCopyRef.current;
    const upper = heroUpperRef.current;
    const lower = heroLowerRef.current;
    if (!copy) return;

    const update = () => {
      if (reducedMotion) {
        copy.style.opacity = "1";
        copy.style.pointerEvents = "auto";
        if (upper) upper.style.transform = "none";
        if (lower) lower.style.transform = "none";
        return;
      }

      const fadeDistance = Math.max(window.innerHeight * HERO_COPY_FADE_VH, 1);
      const slideDistance = Math.max(window.innerHeight * HERO_COPY_SLIDE_VH, 1);
      const fadeProgress = Math.min(Math.max(window.scrollY / fadeDistance, 0), 1);
      const slideProgress = Math.min(Math.max(window.scrollY / slideDistance, 0), 1);
      // Mild ease so the fade is clear but not abrupt.
      const opacity = Math.pow(1 - fadeProgress, 1.25);
      const slide = slideProgress * window.innerWidth * 0.55;

      copy.style.opacity = String(opacity);
      copy.style.pointerEvents = opacity < 0.05 ? "none" : "auto";
      if (upper) upper.style.transform = `translateX(${-slide}px)`;
      if (lower) lower.style.transform = `translateX(${slide}px)`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    let running = true;
    const video = videoRef.current;

    const syncScrollTarget = () => {
      const duration =
        video && !useFrames.current && video.duration && !Number.isNaN(video.duration)
          ? video.duration
          : HERO_FRAME_COUNT / 24;
      const progress = getScrubProgress(
        window.scrollY,
        window.innerHeight,
        frozenProgress,
      );
      targetTime.current = progress * Math.max(duration - SEEK_EPS, 0);
      return targetTime.current;
    };

    const onScroll = () => {
      syncScrollTarget();
    };

    const drawFrameIndex = (index: number) => {
      const canvas = canvasRef.current;
      const frames = framesRef.current;
      const img = frames[index];
      if (!canvas || !img?.complete || !img.naturalWidth) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;

      const pw = Math.floor(w * dpr);
      const ph = Math.floor(h * dpr);
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
      drawnFrame.current = index;
    };

    const loadFrame = (index: number) =>
      new Promise<void>((resolve) => {
        if (framesRef.current[index]) {
          resolve();
          return;
        }
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          framesRef.current[index] = img;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = heroFramePath(index);
      });

    const startFrameFallback = async () => {
      useFrames.current = true;
      setMode("frames");
      framesRef.current = Array(HERO_FRAME_COUNT).fill(null);
      await loadFrame(0);
      if (!running) return;
      if (!framesRef.current[0]) {
        setFailed(true);
        return;
      }
      drawFrameIndex(0);
      currentTime.current = targetTime.current;
      setReady(true);
      const batch = 20;
      for (let start = 1; start < HERO_FRAME_COUNT && running; start += batch) {
        await Promise.all(
          Array.from({ length: Math.min(batch, HERO_FRAME_COUNT - start) }, (_, i) =>
            loadFrame(start + i),
          ),
        );
      }
    };

    const tick = () => {
      if (!running) return;

      currentTime.current += (targetTime.current - currentTime.current) * LERP;

      if (useFrames.current) {
        const duration = HERO_FRAME_COUNT / 24;
        const index = Math.round(
          (currentTime.current / Math.max(duration, 0.001)) * (HERO_FRAME_COUNT - 1),
        );
        const clamped = Math.min(Math.max(index, 0), HERO_FRAME_COUNT - 1);
        if (clamped !== drawnFrame.current) {
          if (framesRef.current[clamped]) drawFrameIndex(clamped);
          else void loadFrame(clamped).then(() => drawFrameIndex(clamped));
        }
      } else if (video && video.duration) {
        const next = Math.min(
          Math.max(currentTime.current, 0),
          video.duration - SEEK_EPS,
        );
        if (!seeking.current && Math.abs(video.currentTime - next) > SEEK_EPS) {
          seeking.current = true;
          try {
            video.currentTime = next;
          } catch {
            seeking.current = false;
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const onSeeked = () => {
      seeking.current = false;
    };

    const seekVideoTo = (time: number, onDone?: () => void) => {
      if (!video || !video.duration) {
        onDone?.();
        return;
      }
      const t = Math.min(Math.max(time, 0), video.duration - SEEK_EPS);
      currentTime.current = t;
      targetTime.current = t;

      if (Math.abs(video.currentTime - t) <= SEEK_EPS) {
        onDone?.();
        return;
      }

      seeking.current = true;
      const handleSeeked = () => {
        video.removeEventListener("seeked", handleSeeked);
        seeking.current = false;
        onDone?.();
      };
      video.addEventListener("seeked", handleSeeked);
      try {
        video.currentTime = t;
      } catch {
        video.removeEventListener("seeked", handleSeeked);
        seeking.current = false;
        onDone?.();
      }
    };

    const onVideoReady = () => {
      if (!video || useFrames.current) return;
      video.pause();
      const t = syncScrollTarget();
      seekVideoTo(t, () => {
        if (!running) return;
        setReady(true);
        setMode("video");
      });
    };

    const onVideoError = () => {
      void startFrameFallback();
    };

    if (video) {
      video.addEventListener("seeked", onSeeked);
      video.addEventListener("loadeddata", onVideoReady);
      video.addEventListener("error", onVideoError);
      video.preload = "auto";
      void video.load();
      if (video.readyState >= 2) onVideoReady();

      // If the scrub video never becomes ready, fall back to frames
      window.setTimeout(() => {
        if (running && !ready && !useFrames.current && video.readyState < 2) {
          void startFrameFallback();
        }
      }, 4000);
    } else {
      void startFrameFallback();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    syncScrollTarget();
    currentTime.current = targetTime.current;
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      video?.removeEventListener("seeked", onSeeked);
      video?.removeEventListener("loadeddata", onVideoReady);
      video?.removeEventListener("error", onVideoError);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ready used only as timeout guard
  }, [reducedMotion]);

  const staticMode = reducedMotion || failed;

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-ink">
          {!staticMode && (
            <>
              <video
                ref={videoRef}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  ready && mode === "video" ? "opacity-100" : "opacity-0"
                }`}
                src={HERO_SCRUB_VIDEO}
                poster={HERO_POSTER}
                muted
                playsInline
                preload="auto"
              />
              <canvas
                ref={canvasRef}
                className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
                  ready && mode === "frames" ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          )}
          {(staticMode || !ready) && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={HERO_POSTER}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/5 to-ink/45" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(7,9,14,0.45)_100%)]" />
        </div>
      </div>

      <section
        className="relative z-10 -mt-[var(--header-h)] flex min-h-[100svh] flex-col justify-between px-[var(--grid-gutter)] pt-[calc(var(--header-h)+2rem)] pb-8 md:pb-10"
        aria-label="Opening sequence"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="section-label">{homeHero.verticalLabel}</p>
          <p className="hidden text-right text-xs tracking-[0.18em] text-text-muted uppercase md:block">
            Ontario advocacy
          </p>
        </div>

        <div className="relative mx-auto flex w-full max-w-6xl flex-1 items-center justify-center">
          <p
            className="vertical-label absolute top-1/2 left-0 hidden -translate-y-1/2 lg:block"
            aria-hidden
          >
            Strategic solutions
          </p>

          <div
            ref={heroCopyRef}
            className="hero-copy-fade relative z-10 w-full text-center"
          >
            <h1 className="hero-headline text-[clamp(3.8rem,17vw,13rem)]">
              <span ref={heroUpperRef} className="hero-headline-upper">
                {homeHero.line1}
              </span>
              <span className="hero-headline-legal">{homeHero.accentLegal}</span>
              <span ref={heroLowerRef} className="hero-headline-lower">
                {homeHero.line2}
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-xl text-sm text-text-muted md:text-base">
              {homeHero.support}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={homeHero.ctaPrimary.href} className="btn btn-primary">
                {homeHero.ctaPrimary.label}
              </Link>
              <Link href={homeHero.ctaSecondary.href} className="btn btn-ghost">
                {homeHero.ctaSecondary.label}
              </Link>
            </div>
          </div>

          <p
            className="vertical-label absolute top-1/2 right-0 hidden -translate-y-1/2 lg:block"
            aria-hidden
          >
            Scroll to explore
          </p>
        </div>

        <div className="flex items-end justify-between gap-4 text-xs tracking-[0.16em] text-text-muted uppercase">
          <span>{staticMode ? "Featured" : "Scroll to continue"}</span>
          <span className="text-gold">01 / Intro</span>
        </div>
      </section>
    </>
  );
}
