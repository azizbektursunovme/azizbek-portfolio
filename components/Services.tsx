"use client";

import { motion } from "framer-motion";

interface ServicesProps {
  dict: {
    nav: {
      services: string;
    };
    services: {
      title: string;
      subtitle: string;
      items: Array<{
        title: string;
        desc: string;
      }>;
    };
  };
}

export default function Services({ dict }: ServicesProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <section id="services" className="relative w-full bg-zinc-950 px-6 py-24 md:px-10 md:py-32 border-t border-zinc-900">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Left Side: Services Heading */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              {dict.nav.services}
            </span>
            <h2
              className="text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-100"
              style={{ fontFamily: "'Cabinet Grotesk', 'Inter', 'Arial', system-ui, sans-serif" }}
            >
              {dict.services.title}
            </h2>
            <p className="text-zinc-500 text-sm font-light mt-2 max-w-xs">
              {dict.services.subtitle}
            </p>
          </div>

          {/* Right Side: Services List Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-8 flex flex-col"
          >
            {dict.services.items.map((service, index) => (
              <motion.div
                key={index}
                variants={item}
                className="group relative flex flex-col md:flex-row md:items-start justify-between py-10 border-b border-zinc-900 hover:border-zinc-800 transition-colors duration-300"
              >
                {/* Number indicator */}
                <span className="font-mono text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors mb-4 md:mb-0">
                  (0{index + 1})
                </span>

                {/* Service Text details */}
                <div className="flex flex-col gap-3 md:w-3/4">
                  <h3
                    className="text-xl md:text-2xl font-bold uppercase tracking-tight text-zinc-300 group-hover:text-zinc-100 transition-colors"
                    style={{ fontFamily: "'Cabinet Grotesk', 'Inter', 'Arial', system-ui, sans-serif" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-zinc-500 group-hover:text-zinc-400 transition-colors font-light leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

