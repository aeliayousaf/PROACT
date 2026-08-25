"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrollBlurRevealProps = {
  children: ReactNode;
  className?: string;
  maxBlur?: number;
  /** Element reveal: viewport fraction where blur starts clearing */
  startAt?: number;
  /** Element reveal: viewport fraction where text is fully clear */
  endAt?: number;
  /** Use window scroll distance instead of element position (for fixed hero copy) */
  mode?: "element" | "scroll";
  /** Viewport heights of scroll that complete the reveal (scroll mode only) */
  scrollRange?: number;
  as?: "div" | "p" | "h1" | "h2" | "h3" | "ul" | "li" | "section";
};

export function ScrollBlurReveal({
  children,
  className = "",
  maxBlur = 12,
  startAt = 0.92,
  endAt = 0.28,
  mode = "element",
  scrollRange = 1.25,
  as: Tag = "div",
}: ScrollBlurRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyClear = () => {
      el.style.filter = "none";
      el.style.opacity = "1";
    };

    if (reduced.matches) {
      applyClear();
      return;
    }

    let ticking = false;

    const update = () => {
      ticking = false;
      let progress = 0;

      if (mode === "scroll") {
        const distance = Math.max(window.innerHeight * scrollRange, 1);
        progress = Math.min(Math.max(window.scrollY / distance, 0), 1);
      } else {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const start = vh * startAt;
        const end = vh * endAt;
        const range = start - end || 1;
        progress = Math.min(Math.max((start - rect.top) / range, 0), 1);

        const scrollRemaining =
          document.documentElement.scrollHeight -
          (window.scrollY + window.innerHeight);

        // Bottom-of-page sections may never reach endAt; finish once fully in view.
        if (scrollRemaining < 48 && rect.top < start && rect.bottom > 0) {
          progress = 1;
        } else if (rect.top >= 0 && rect.bottom <= vh) {
          const visibleProgress = (start - Math.max(rect.top, end)) / range;
          progress = Math.max(progress, Math.min(visibleProgress, 1));
        }
      }

      const blur = (1 - progress) * maxBlur;
      const opacity = 0.15 + progress * 0.85;

      el.style.filter = blur > 0.05 ? `blur(${blur}px)` : "none";
      el.style.opacity = String(opacity);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const onReduced = () => {
      if (reduced.matches) applyClear();
      else update();
    };
    reduced.addEventListener("change", onReduced);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduced.removeEventListener("change", onReduced);
    };
  }, [maxBlur, startAt, endAt, mode, scrollRange]);

  return (
    <Tag
      ref={ref as never}
      className={`will-change-[filter,opacity] ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
