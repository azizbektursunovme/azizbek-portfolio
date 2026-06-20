"use client";

import { motion } from "framer-motion";

interface AboutProps {
  dict: {
    about: {
      title: string;
      bio: string;
      experience: string;
      skills: string;
      timeline: Array<{
        year: string;
        role: string;
        company: string;
        desc: string;
      }>;
      skillItems?: string[];
    };
  };
}

export default function About({ dict }: AboutProps) {
  const skillTitles = dict.about.skillItems ?? [
    "Graphic Design",
    "Product design",
    "Branding",
    "Social Media Design",
    "Product Design",
    "AI-assisted Creative Workflow",
  ];
  const skillsList = skillTitles.map((title, index) => ({
    title,
    level: String(index + 1).padStart(2, "0"),
  }));

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <section id="about" className="relative w-full bg-zinc-950 px-6 py-24 md:px-10 md:py-32 border-t border-zinc-900">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Left Side: Biography */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="font-sans text-xs uppercase tracking-widest text-zinc-500 font-mono"
            >
              {dict.about.title}
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="font-sans text-2xl md:text-3xl font-light leading-relaxed text-zinc-300"
              style={{ fontFamily: "'Satoshi', 'Inter', 'Arial', system-ui, sans-serif" }}
            >
              {dict.about.bio}
            </motion.p>
          </div>

          {/* Right Side: Timeline & Skills */}
          <div className="lg:col-span-7 flex flex-col gap-20">
            {/* Timeline Experience */}
            <div className="flex flex-col gap-8">
              <motion.h3
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                className="font-sans text-xs uppercase tracking-widest text-zinc-500 font-mono border-b border-zinc-900 pb-4"
              >
                {dict.about.experience}
              </motion.h3>

              <div className="flex flex-col gap-10">
                {dict.about.timeline.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.6, delay: idx * 0.1, ease: [0.215, 0.61, 0.355, 1] },
                      },
                    }}
                    className="relative pl-8 border-l border-zinc-800"
                  >
                    {/* Circle Indicator */}
                    <div className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full bg-zinc-700 border border-zinc-950" />

                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <div>
                        <h4 className="text-zinc-200 font-medium text-lg leading-snug">
                          {item.role}
                        </h4>
                        <span className="text-zinc-500 text-sm font-mono uppercase">
                          {item.company}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-zinc-400 bg-zinc-900 px-3 py-1 rounded border border-zinc-800 self-start md:self-auto uppercase tracking-wider">
                        {item.year}
                      </span>
                    </div>

                    <p className="mt-3 text-zinc-400 text-sm leading-relaxed max-w-xl">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills / Expertise */}
            <div className="flex flex-col gap-8">
              <motion.h3
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                className="font-sans text-xs uppercase tracking-widest text-zinc-500 font-mono border-b border-zinc-900 pb-4"
              >
                {dict.about.skills}
              </motion.h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skillsList.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, delay: idx * 0.05, ease: [0.215, 0.61, 0.355, 1] },
                      },
                    }}
                    className="flex justify-between items-center bg-zinc-900/30 border border-zinc-900/60 hover:border-zinc-800 hover:bg-zinc-900/50 transition-all p-5 rounded-lg group cursor-default"
                  >
                    <span className="text-zinc-300 font-medium group-hover:text-zinc-100 transition-colors text-sm">
                      {skill.title}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-600 group-hover:text-zinc-400 transition-colors">
                      {skill.level}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

