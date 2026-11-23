import Image from "next/image";
import type { CSSProperties } from "react";
import type { Locale, Media } from "@/data/types";
import { tr } from "@/lib/localize";
import { cn } from "@/lib/cn";

/**
 * A desktop screenshot with the matching phone screen overlapping its lower
 * right corner, so one picture shows both layouts of the same site.
 *
 *   [ desktop .................. ]
 *   [                         [ph]
 *   [ ...................... ][on]
 *                            [ e]
 */
export default function DevicePair({
  desktop,
  mobile,
  locale,
  priority,
  className,
  style,
}: {
  desktop: Media;
  mobile: Media;
  locale: Locale;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div data-testid="device-pair" className={cn("relative pb-[16%] sm:pb-[7%]", className)} style={style}>
      <figure className="relative w-[86%] overflow-hidden rounded-tile bg-paper-deep after:pointer-events-none after:absolute after:inset-0 after:rounded-tile after:ring-1 after:ring-inset after:ring-ink/10">
        <Image
          src={desktop.src}
          alt={tr(desktop.alt, locale)}
          width={desktop.width}
          height={desktop.height}
          priority={priority}
          sizes="(min-width: 1248px) 1000px, 86vw"
          className="h-auto w-full"
        />
      </figure>
      <figure className="absolute bottom-0 right-0 w-[28%] sm:w-[22%] overflow-hidden rounded-[clamp(0.75rem,2vw,1.75rem)] border-[clamp(3px,0.45vw,5px)] border-device bg-device shadow-device-lg ring-1 ring-device-ring">
        <Image
          src={mobile.src}
          alt={tr(mobile.alt, locale)}
          width={mobile.width}
          height={mobile.height}
          priority={priority}
          sizes="(min-width: 1248px) 260px, 28vw"
          className="h-auto w-full"
        />
      </figure>
    </div>
  );
}
