"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrollSlideInProps = {
  children: ReactNode;
  className?: string;
  from: "left" | "right";
  /** Max horizontal offset in px before settling. */
  distance?: number;
  /** Viewport fraction where the slide begins. */
  startAt?: number;
  /** Viewport fraction where the slide finishes. */
  endAt?: number;
  /** Extra 0–1 delay before this side starts moving (for stagger). */
  delay?: number;
  as?: "div" | "p" | "section";
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

export function ScrollSlideIn({
  children,
  className = "",
  from,
  distance = 72,
  startAt = 0.92,
  endAt = 0.32,
  delay = 0,
  as: Tag = "div",
}: ScrollSlideInProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applySettled = () => {
      el.style.transform = "none";
      el.style.opacity = "1";
    };

    if (reduced.matches) {
      applySettled();
      return;
    }

    let ticking = false;
    const direction = from === "left" ? -1 : 1;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * startAt;
      const end = vh * endAt;
      const range = start - end || 1;
      let progress = clamp((start - rect.top) / range);

      const scrollRemaining =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);

      if (scrollRemaining < 48 && rect.top < start && rect.bottom > 0) {
        progress = 1;
      } else if (rect.top >= 0 && rect.bottom <= vh) {
        const visibleProgress = (start - Math.max(rect.top, end)) / range;
        progress = Math.max(progress, clamp(visibleProgress));
      }

      // Remap progress so `delay` stalls the start, then fills the rest.
      const delayed =
        delay >= 1 ? 1 : clamp((progress - delay) / Math.max(1 - delay, 0.001));
      const eased = 1 - Math.pow(1 - delayed, 2.1);
      const offset = (1 - eased) * distance * direction;
      const opacity = 0.2 + eased * 0.8;

      el.style.transform =
        Math.abs(offset) > 0.4 ? `translateX(${offset}px)` : "none";
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
      if (reduced.matches) applySettled();
      else update();
    };
    reduced.addEventListener("change", onReduced);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduced.removeEventListener("change", onReduced);
    };
  }, [from, distance, startAt, endAt, delay]);

  return (
    <Tag
      ref={ref as never}
      className={`will-change-[transform,opacity] ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
