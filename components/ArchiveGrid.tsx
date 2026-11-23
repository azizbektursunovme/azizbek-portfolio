"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { archive } from "@/data/projects";
import { adsCopy as copy } from "@/data/sections";
import type { Locale } from "@/data/types";
import { tr } from "@/lib/localize";

/** Earlier-work grid. Each tile opens its image in an accessible modal dialog. */
export default function ArchiveGrid({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const lastIndex = useRef<number | null>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (open === null || !d) return;
    lastIndex.current = open;
    if (!d.open) d.showModal();
  }, [open]);

  const onClosed = () => {
    const i = lastIndex.current;
    setOpen(null);
    if (i !== null) requestAnimationFrame(() => triggers.current[i]?.focus());
  };

  const item = open !== null ? archive[open] : null;

  return (
    <>
      <ul role="list" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
        {archive.map((a, i) => (
          <li key={a.src} data-testid="archive-item" className="min-w-0">
            <button
              ref={(el) => {
                triggers.current[i] = el;
              }}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`${tr(copy.openImage, locale)}: ${tr(a.alt, locale)}`}
              className="group/a block w-full text-left"
            >
              <span className="flex aspect-square items-center justify-center overflow-hidden rounded-tile border border-rule bg-paper-deep/60 p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.src}
                  alt=""
                  width={a.width}
                  height={a.height}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out-quint group-hover/a:scale-[1.03]"
                />
              </span>
              <span className="mt-2 flex items-baseline justify-between gap-2 font-mono text-label text-muted">
                <span className="truncate">{a.label}</span>
                <span>{a.year}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {item ? (
        <dialog
          ref={dialogRef}
          aria-label={tr(item.alt, locale)}
          onClose={onClosed}
          onClick={(e) => {
            if (e.target === dialogRef.current) dialogRef.current?.close();
          }}
          className="m-auto max-h-[92vh] max-w-[min(94vw,64rem)] overflow-visible bg-transparent p-0 backdrop:bg-ink/80"
        >
          <div className="relative flex flex-col items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={tr(item.alt, locale)}
              width={item.width}
              height={item.height}
              className="max-h-[80vh] w-auto max-w-full rounded-tile bg-paper object-contain"
            />
            <p className="font-mono text-label text-paper">
              {item.label} · {item.year}
            </p>
            <button
              type="button"
              autoFocus
              onClick={() => dialogRef.current?.close()}
              aria-label={tr(copy.close, locale)}
              className="absolute -top-3 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-paper text-ink sm:-right-3"
            >
              <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </div>
        </dialog>
      ) : null}
    </>
  );
}
