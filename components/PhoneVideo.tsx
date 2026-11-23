"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { adsCopy as copy } from "@/data/sections";
import type { Locale, Media } from "@/data/types";
import { tr } from "@/lib/localize";
import { cn } from "@/lib/cn";

const QUERY = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getReduced = () => window.matchMedia(QUERY).matches;
// Server markup assumes no preference; the client value is read before effects run.
const getServerReduced = () => false;

interface PhoneVideoProps {
  media: Media;
  locale?: Locale;
  className?: string;
}

/**
 * A muted, looping ad clip in a phone-shaped frame. It plays only while at
 * least half of it is in view and pauses when it leaves. A play/pause toggle
 * (WCAG 2.2.2) is always present: shown on hover and keyboard focus, always on
 * touch devices, and always while the clip is stopped. Pausing it stops
 * autoplay-in-view until the visitor presses play again. Under
 * prefers-reduced-motion it never starts by itself: the poster stays until
 * the visitor presses play.
 */
export default function PhoneVideo({ media, locale = "en", className }: PhoneVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useSyncExternalStore(subscribe, getReduced, getServerReduced);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const label = tr(media.alt, locale);

  // Reduced motion switched on mid-play: stop the video.
  useEffect(() => {
    if (reduced) ref.current?.pause();
  }, [reduced]);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || userPaused || typeof IntersectionObserver === "undefined") return;
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
  }, [reduced, userPaused]);

  function toggle() {
    const el = ref.current;
    if (!el) return;
    if (playing) {
      setUserPaused(true);
      el.pause();
    } else {
      setUserPaused(false);
      el.play().catch(() => {});
    }
  }

  const verb = tr(playing ? copy.pause : copy.play, locale);

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden rounded-[1.75rem] border-[5px] border-ink bg-ink shadow-[0_18px_40px_-24px_rgba(21,21,21,0.55)]",
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
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={`${verb}: ${label}`}
        className={cn(
          "absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-full bg-paper text-ink shadow-sm transition-opacity duration-200 ease-out-quint focus-visible:opacity-100 group-hover:opacity-100 pointer-coarse:opacity-100",
          playing ? "opacity-0" : "opacity-100",
        )}
      >
        {playing ? (
          <Pause aria-hidden="true" className="h-4 w-4 fill-current" strokeWidth={1.5} />
        ) : (
          <Play aria-hidden="true" className="ml-0.5 h-4 w-4 fill-current" strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}
