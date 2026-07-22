"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface WebsiteCopy {
  name: string;
  type: string;
  description: string;
  role: string;
}

interface SelectedWebsitesProps {
  dict: {
    selectedWebsites: {
      eyebrow: string;
      title: string;
      intro: string;
      roleLabel: string;
      visit: string;
      projects: {
        silkRoad: WebsiteCopy;
        motionForge: WebsiteCopy;
      };
    };
  };
}

const websites = [
  {
    key: "silkRoad" as const,
    url: "https://uzbek-travel-lilac.vercel.app/",
    domain: "uzbek-travel-lilac.vercel.app",
    stack: ["Next.js", "TypeScript", "Responsive"],
    background:
      "radial-gradient(circle at 78% 20%, rgba(217,166,91,0.32), transparent 34%), linear-gradient(135deg, #11100e 0%, #251d14 48%, #0d0d0c 100%)",
    mark: "SILK ROAD",
  },
  {
    key: "motionForge" as const,
    url: "https://motionforge-dun.vercel.app/",
    domain: "motionforge-dun.vercel.app",
    stack: ["React", "Motion", "Interactive UI"],
    background:
      "radial-gradient(circle at 20% 18%, rgba(124,92,255,0.34), transparent 36%), radial-gradient(circle at 86% 78%, rgba(43,206,255,0.18), transparent 32%), linear-gradient(135deg, #0d0c13 0%, #171126 52%, #09090b 100%)",
    mark: "MOTION FORGE",
  },
];

const easeOutQuart = [0.215, 0.61, 0.355, 1] as const;

export default function SelectedWebsites({ dict }: SelectedWebsitesProps) {
  const copy = dict.selectedWebsites;

  return (
    <section
      id="websites"
      className="relative w-full overflow-hidden border-t border-zinc-900 bg-zinc-950 px-6 py-24 md:px-10 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: easeOutQuart }}
          className="mb-14 grid grid-cols-1 gap-7 md:mb-16 lg:grid-cols-12 lg:items-end"
        >
          <div className="flex flex-col gap-3 lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              {copy.eyebrow}
            </span>
            <h2
              className="max-w-3xl text-4xl font-black uppercase tracking-tight text-zinc-100 md:text-5xl"
              style={{
                fontFamily:
                  "'Cabinet Grotesk', 'Inter', 'Arial', system-ui, sans-serif",
              }}
            >
              {copy.title}
            </h2>
          </div>
          <p className="max-w-xl text-sm font-light leading-relaxed text-zinc-400 md:text-base lg:col-span-5 lg:justify-self-end">
            {copy.intro}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {websites.map((website, index) => {
            const project = copy.projects[website.key];

            return (
              <motion.article
                key={website.key}
                initial={{ opacity: 0, y: 38 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: easeOutQuart,
                }}
                className="group overflow-hidden rounded-xl border border-zinc-900 bg-zinc-950 transition-colors duration-500 hover:border-zinc-700"
              >
                <a
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${copy.visit}: ${project.name}`}
                  className="block border-b border-zinc-900 bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zinc-100/40"
                >
                  <div className="flex h-11 items-center gap-3 border-b border-zinc-800/80 px-4">
                    <div className="flex gap-1.5" aria-hidden="true">
                      <span className="h-2 w-2 rounded-full bg-zinc-700" />
                      <span className="h-2 w-2 rounded-full bg-zinc-700" />
                      <span className="h-2 w-2 rounded-full bg-zinc-700" />
                    </div>
                    <span className="min-w-0 truncate font-mono text-[9px] uppercase tracking-wider text-zinc-600 sm:text-[10px]">
                      {website.domain}
                    </span>
                    <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-zinc-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-100" />
                  </div>

                  <div className="relative aspect-[16/10] overflow-hidden" style={{ background: website.background }}>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-6 bottom-5 z-0 select-none text-[clamp(2.2rem,7vw,5rem)] font-black leading-none tracking-[-0.06em] text-white/10"
                    >
                      {website.mark}
                    </span>
                    <iframe
                      src={website.url}
                      title={`${project.name} website preview`}
                      loading="lazy"
                      tabIndex={-1}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-0 h-[160%] w-[160%] origin-top-left scale-[0.625] border-0 bg-transparent transition-transform duration-1000 ease-out group-hover:scale-[0.64]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/20 via-transparent to-transparent" />
                  </div>
                </a>

                <div className="flex min-h-[310px] flex-col gap-7 p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex min-w-0 flex-col gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                        {project.type}
                      </span>
                      <h3
                        className="text-2xl font-black uppercase tracking-tight text-zinc-100 sm:text-3xl"
                        style={{
                          fontFamily:
                            "'Cabinet Grotesk', 'Inter', 'Arial', system-ui, sans-serif",
                        }}
                      >
                        {project.name}
                      </h3>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] text-zinc-600">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="text-sm font-light leading-relaxed text-zinc-400 sm:text-base">
                    {project.description}
                  </p>

                  <div className="mt-auto flex flex-col gap-5 border-t border-zinc-900 pt-5">
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
                        {copy.roleLabel}
                      </span>
                      <span className="text-sm text-zinc-300">{project.role}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {website.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-zinc-800 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-zinc-500"
                        >
                          {item}
                        </span>
                      ))}
                      <a
                        href={website.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-0 inline-flex items-center gap-2 rounded-full border border-zinc-700 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-zinc-300 transition-colors hover:border-zinc-100 hover:bg-zinc-100 hover:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-zinc-100/30 sm:ml-auto"
                      >
                        {copy.visit}
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
