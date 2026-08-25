export const HERO_FRAME_COUNT = 240;
/** Must match scroll progress 0 / first video frame. */
export const HERO_POSTER = "/video/hero-poster.webp";
export const HERO_SCRUB_VIDEO = "/video/hero-scrub.mp4";

/** Zero-based frame index → high-quality WebP fallback URL */
export function heroFramePath(index: number): string {
  const frame = Math.min(Math.max(Math.round(index) + 1, 1), HERO_FRAME_COUNT);
  return `/image-sequence/frame-${String(frame).padStart(3, "0")}.webp`;
}
