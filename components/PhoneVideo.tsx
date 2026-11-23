"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { adsCopy as copy } from "@/data/sections";
import type { Locale, Media } from "@/data/types";
import { tr } from "@/lib/localize";
import { cn } from "@/lib/cn";

interface PhoneVideoProps {
  media: Media;
  locale?: Locale;
  className?: string;
}

/**
 * A muted, looping ad clip in a phone-shaped frame. It plays only while at
 * least half of it is in view and pauses when it leaves. Under
 * prefers-reduced-motion it never starts by itself: the poster stays and a
 * visible Play button lets the visitor start it.
 */
export default function PhoneVideo({ media, locale = "en", className }: PhoneVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);
  const label = tr(media.alt, locale);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: [0, 0.5, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[1.75rem] border-[5px] border-ink bg-ink shadow-[0_18px_40px_-24px_rgba(21,21,21,0.55)]",
        className,
      )}
      style={{ aspectRatio: `${media.width} / ${media.height}` }}
    >
      <video
        ref={ref}
        src={media.src}
        poster={media.poster}
        width={media.width}
        height={media.height}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="h-full w-full object-cover"
      />
      {reduced && !playing ? (
        <button
          type="button"
          onClick={() => ref.current?.play().catch(() => {})}
          aria-label={`${tr(copy.play, locale)}: ${label}`}
          className="absolute inset-0 flex items-center justify-center bg-ink/20"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper text-ink">
            <Play aria-hidden="true" className="ml-0.5 h-6 w-6 fill-current" strokeWidth={1.5} />
          </span>
        </button>
      ) : null}
    </div>
  );
}
