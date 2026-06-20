"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolioProjects, ProjectCategoryKey } from "@/data/projects";
import { Locale } from "@/i18n/dictionaries";

interface FeaturedWorksProps {
  lang: Locale;
  dict: {
    nav: {
      works: string;
    };
    worksSection?: {
      title: string;
      filters: {
        all: string;
        branding: string;
        productDesign: string;
        socialMedia: string;
        advertising: string;
        personalProjects: string;
      };
    };
    projects: Record<
      string,
      {
        title: string;
        category: string;
        description: string;
        cardLabel?: string;
      }
    >;
  };
}

export default function FeaturedWorks({ lang, dict }: FeaturedWorksProps) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<ProjectCategoryKey | "all">("all");

  const filterLabels = dict.worksSection?.filters ?? {
    all: "All",
    branding: "Branding",
    productDesign: "Product design",
    socialMedia: "Social Media",
    advertising: "Advertising",
    personalProjects: "Personal Projects",
  };

  const filters: Array<{ label: string; value: ProjectCategoryKey | "all" }> = [
    { label: filterLabels.all, value: "all" },
    { label: filterLabels.branding, value: "branding" },
    { label: filterLabels.productDesign, value: "product-design" },
    { label: filterLabels.socialMedia, value: "social-media" },
    { label: filterLabels.advertising, value: "advertising" },
    { label: filterLabels.personalProjects, value: "personal" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.categoryKey === activeFilter);

  return (
    <section id="works" className="relative w-full bg-zinc-950 px-6 py-24 md:px-10 md:py-32 border-t border-zinc-900">
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              {dict.nav.works}
            </span>
            <h2
              className="text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-100"
              style={{ fontFamily: "'Cabinet Grotesk', 'Inter', 'Arial', system-ui, sans-serif" }}
            >
              {dict.worksSection?.title ?? "Featured Case Studies"}
            </h2>
          </div>

          {/* Filters List */}
          <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-full border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-100/30 ${
                  activeFilter === filter.value
                    ? "bg-zinc-100 text-zinc-950 border-zinc-100 font-bold hover:bg-zinc-200 hover:text-zinc-950"
                    : "bg-zinc-950/40 text-zinc-300 border-zinc-800 hover:bg-zinc-900 hover:text-zinc-100 hover:border-zinc-600"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Equal-size project card grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const projectText = dict.projects[project.id] || project;
              const cardLabel = projectText.cardLabel ?? project.cardLabel;

              return (
                <motion.button
                  type="button"
                  key={project.id}
                  layout
                  initial={{ y: 40, scale: 0.98 }}
                  animate={{ y: 0, scale: 1 }}
                  exit={{ scale: 0.96 }}
                  transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                  onClick={() => router.push(`/${lang}/projects/${project.id}`)}
                  className="group relative isolate flex h-[420px] w-full cursor-pointer flex-col justify-between overflow-hidden rounded-xl border border-zinc-900 p-6 text-left transition-colors duration-300 hover:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-100/30 sm:p-8 md:h-[520px]"
                  style={{ background: project.palette.background }}
                >
                  {/* Abstract palette composition */}
                  <div className="absolute inset-0 z-0 opacity-90 transition-transform duration-700 ease-[0.25,1,0.5,1] group-hover:scale-[1.02]">
                    <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_22%_18%,rgba(244,244,245,0.10),transparent_30%),radial-gradient(circle_at_86%_16%,rgba(244,244,245,0.06),transparent_24%),linear-gradient(180deg,transparent_0%,rgba(9,9,11,0.88)_100%)]" />
                    <div className="absolute left-8 top-24 z-10 h-20 w-20 rounded-full border border-white/12" />
                    <div
                      className="absolute right-10 top-24 z-10 h-24 w-24 rounded-full blur-xl"
                      style={{ backgroundColor: project.palette.accent, opacity: 0.16 }}
                    />
                    <div
                      className="absolute bottom-24 left-10 z-10 h-1.5 w-24 rounded-full"
                      style={{ backgroundColor: project.palette.accent, opacity: 0.55 }}
                    />
                    <div className="absolute bottom-8 right-8 z-10 grid grid-cols-3 gap-2">
                      {[project.palette.accent, project.palette.muted, "rgba(255,255,255,0.86)"].map((color) => (
                        <span
                          key={color}
                          className="h-7 w-7 rounded-full border border-white/12 sm:h-8 sm:w-8"
                          style={{ backgroundColor: color, opacity: 0.74 }}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-x-8 top-1/2 z-10 h-px bg-white/10" />
                  </div>

                  {/* Top Card Info */}
                  <div className="relative z-30 flex w-full items-start justify-between gap-3">
                    <span className="max-w-[70%] rounded border border-white/10 bg-zinc-950/65 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-100 backdrop-blur sm:text-xs">
                      {cardLabel}
                    </span>
                    <span className="shrink-0 rounded border border-white/10 bg-zinc-950/65 px-3 py-1 font-mono text-[10px] text-zinc-100 backdrop-blur sm:text-xs">
                      {project.year}
                    </span>
                  </div>

                  {/* Bottom Card Info */}
                  <div className="relative z-30 flex items-end justify-between gap-4 mt-auto">
                    <div className="flex max-w-sm flex-col gap-2 overflow-hidden">
                      <h3
                        className="line-clamp-2 text-2xl font-black uppercase tracking-tight text-zinc-100 md:text-3xl"
                        style={{ fontFamily: "'Cabinet Grotesk', 'Inter', 'Arial', system-ui, sans-serif" }}
                      >
                        {projectText.title}
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-300">
                        {projectText.category}
                      </span>
                      <p className="line-clamp-3 text-sm font-light leading-relaxed text-zinc-300">
                        {projectText.description}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-zinc-950/80 p-4 text-zinc-100 backdrop-blur transition-all duration-300 group-hover:border-zinc-100 group-hover:bg-zinc-100 group-hover:text-zinc-950">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

