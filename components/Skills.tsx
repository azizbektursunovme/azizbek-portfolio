"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Play,
  Grid3X3,
  PenTool,
  MousePointer2,
} from "lucide-react";

interface SkillItem {
  name: string;
  label: string;
  badge: string;
}

interface SkillsProps {
  dict: {
    skillsTools: {
      eyebrow: string;
      title: string;
      subtitle: string;
      items: SkillItem[];
    };
  };
}

const iconMap: Record<string, ReactNode> = {
  spark: <Sparkles className="h-4 w-4" strokeWidth={1.6} />,
  play: <Play className="h-4 w-4" strokeWidth={1.6} />,
  grid: <Grid3X3 className="h-4 w-4" strokeWidth={1.6} />,
  brand: <PenTool className="h-4 w-4" strokeWidth={1.6} />,
  layout: <MousePointer2 className="h-4 w-4" strokeWidth={1.6} />,
};

const easeOutQuart = [0.215, 0.61, 0.355, 1] as const;

const skillAccents: Record<string, { soft: string; border: string; glow: string }> = {
  Fi: {
    soft: "radial-gradient(circle at 18% 0%, rgba(168,85,247,0.16), transparent 34%), radial-gradient(circle at 100% 12%, rgba(251,146,60,0.10), transparent 32%)",
    border: "rgba(216,180,254,0.42)",
    glow: "0 0 22px rgba(168,85,247,0.16)",
  },
  Ps: {
    soft: "radial-gradient(circle at 20% 0%, rgba(59,130,246,0.17), transparent 34%)",
    border: "rgba(147,197,253,0.42)",
    glow: "0 0 22px rgba(59,130,246,0.16)",
  },
  Ai: {
    soft: "radial-gradient(circle at 20% 0%, rgba(251,146,60,0.16), transparent 34%)",
    border: "rgba(253,186,116,0.42)",
    glow: "0 0 22px rgba(251,146,60,0.15)",
  },
  Ca: {
    soft: "radial-gradient(circle at 18% 0%, rgba(34,211,238,0.14), transparent 34%), radial-gradient(circle at 100% 18%, rgba(168,85,247,0.11), transparent 30%)",
    border: "rgba(103,232,249,0.38)",
    glow: "0 0 22px rgba(34,211,238,0.14)",
  },
  Cc: {
    soft: "radial-gradient(circle at 20% 0%, rgba(244,244,245,0.12), transparent 34%)",
    border: "rgba(212,212,216,0.36)",
    glow: "0 0 20px rgba(244,244,245,0.12)",
  },
  spark: {
    soft: "radial-gradient(circle at 18% 0%, rgba(139,92,246,0.15), transparent 34%), radial-gradient(circle at 100% 20%, rgba(34,211,238,0.10), transparent 30%)",
    border: "rgba(196,181,253,0.40)",
    glow: "0 0 24px rgba(139,92,246,0.16)",
  },
  play: {
    soft: "radial-gradient(circle at 20% 0%, rgba(248,113,113,0.13), transparent 34%), radial-gradient(circle at 100% 16%, rgba(251,146,60,0.10), transparent 30%)",
    border: "rgba(252,165,165,0.38)",
    glow: "0 0 22px rgba(248,113,113,0.14)",
  },
  grid: {
    soft: "radial-gradient(circle at 18% 0%, rgba(96,165,250,0.14), transparent 34%), radial-gradient(circle at 100% 18%, rgba(244,114,182,0.10), transparent 30%)",
    border: "rgba(147,197,253,0.38)",
    glow: "0 0 22px rgba(96,165,250,0.14)",
  },
  brand: {
    soft: "radial-gradient(circle at 20% 0%, rgba(45,212,191,0.13), transparent 34%)",
    border: "rgba(94,234,212,0.36)",
    glow: "0 0 22px rgba(45,212,191,0.13)",
  },
  layout: {
    soft: "radial-gradient(circle at 18% 0%, rgba(59,130,246,0.14), transparent 34%), radial-gradient(circle at 100% 18%, rgba(168,85,247,0.10), transparent 30%)",
    border: "rgba(147,197,253,0.38)",
    glow: "0 0 22px rgba(59,130,246,0.14)",
  },
};

export default function Skills({ dict }: SkillsProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.055,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: easeOutQuart },
    },
  };

  return (
    <section className="relative w-full border-t border-zinc-900 bg-zinc-950 px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: easeOutQuart }}
          className="flex flex-col gap-3 md:max-w-2xl"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            {dict.skillsTools.eyebrow}
          </span>
          <h2
            className="text-3xl font-black uppercase tracking-tight text-zinc-100 md:text-4xl"
            style={{ fontFamily: "'Cabinet Grotesk', 'Inter', 'Arial', system-ui, sans-serif" }}
          >
            {dict.skillsTools.title}
          </h2>
          <p className="max-w-xl text-sm font-light leading-relaxed text-zinc-400 md:text-base">
            {dict.skillsTools.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5"
        >
          {dict.skillsTools.items.map((skill) => {
            const accent = skillAccents[skill.badge] ?? skillAccents.Cc;

            return (
              <motion.div
                key={skill.name}
                variants={item}
                whileHover={{
                  y: -3,
                  scale: 1.005,
                  borderColor: accent.border,
                  boxShadow: accent.glow,
                }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                data-hover="true"
                className="group relative overflow-hidden rounded-lg border border-zinc-900/80 bg-zinc-950/60 p-4 transition-colors duration-300 hover:bg-zinc-900/45 sm:p-5"
              >
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: accent.soft }}
                />
                <div className="relative z-10 flex flex-col gap-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-zinc-800 bg-zinc-950 font-mono text-[11px] font-semibold uppercase tracking-tight text-zinc-100 shadow-[0_0_18px_rgba(244,244,245,0.04)] transition-all duration-300 group-hover:border-zinc-500">
                      <span
                        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ background: accent.soft }}
                      />
                      <span className="relative z-10">
                        {iconMap[skill.badge] ?? skill.badge}
                      </span>
                    </div>
                    <span className="h-px flex-1 bg-zinc-900 transition-colors duration-300 group-hover:bg-zinc-700" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-sm font-semibold text-zinc-100">
                      {skill.name}
                    </h3>
                    <p className="text-xs leading-relaxed text-zinc-500 transition-colors duration-300 group-hover:text-zinc-300">
                      {skill.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
