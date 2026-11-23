"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyEmailProps {
  email: string;
  label: string;
  copiedLabel: string;
}

/**
 * Copies the address to the clipboard and says so ("Copied", announced via a
 * polite live region). Without the Clipboard API it falls back to opening the
 * mail client, so the button always does something useful.
 */
export default function CopyEmail({ email, label, copiedLabel }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2400);
  }

  return (
    <>
      <button
        type="button"
        data-testid="copy-email"
        onClick={copy}
        className="inline-flex h-12 min-w-[10.5rem] shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-6 text-[0.9375rem] font-medium whitespace-nowrap text-paper transition-colors duration-200 ease-out-quint hover:bg-accent-ink"
      >
        {copied ? (
          <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        ) : (
          <Copy aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
        )}
        <span>{copied ? copiedLabel : label}</span>
      </button>
      <span aria-live="polite" role="status" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </>
  );
}
