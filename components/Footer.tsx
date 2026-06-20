interface FooterProps {
  dict: {
    footer: {
      designed: string;
    };
  };
}

export default function Footer({ dict }: FooterProps) {
  return (
    <footer className="w-full border-t border-zinc-900 bg-zinc-950 py-10 text-zinc-600">
      <div className="mx-auto max-w-7xl px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono">
        <div>
          © 2026 Azizbek Tursunov.
        </div>
        <div className="uppercase tracking-widest text-zinc-500">
          {dict.footer.designed}
        </div>
      </div>
    </footer>
  );
}
