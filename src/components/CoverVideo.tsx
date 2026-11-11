"use client";
import { useEffect, useRef } from "react";

/** Muted looping cover. Plays only while visible, and not at all if the visitor prefers reduced motion. */
export function CoverVideo({ src, poster, className = "" }: { src: string; poster?: string | null; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} src={src} poster={poster ?? undefined} muted loop playsInline preload="metadata" aria-hidden className={className} />;
}
