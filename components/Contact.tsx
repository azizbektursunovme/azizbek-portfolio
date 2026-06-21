"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Instagram, Check, Copy } from "lucide-react";
import Magnetic from "./Magnetic";

interface ContactProps {
  dict: {
    nav: {
      contact: string;
    };
    contact: {
      title: string;
      email: string;
      telegram: string;
      instagram: string;
      copy: string;
    };
  };
}

export default function Contact({ dict }: ContactProps) {
  const emailAddress = "azizbektursunov.me@gmail.com";
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  const socialLinks = [
    {
      name: dict.contact.telegram,
      handle: "@azizbektursunovv",
      href: "https://t.me/azizbektursunovv",
      icon: Send,
    },
    {
      name: dict.contact.instagram,
      handle: "@azizbek___tursunov",
      href: "https://instagram.com/azizbek___tursunov",
      icon: Instagram,
    },
  ];

  return (
    <section id="contact" className="relative w-full bg-zinc-950 px-6 py-24 md:px-10 md:py-32 border-t border-zinc-900 overflow-hidden">
      {/* Background Radial Light Effect */}
      <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-zinc-900/10 blur-[120px] pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl relative z-10">
        <div className="flex flex-col gap-16">
          {/* Section Indicator */}
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 self-start">
            {dict.nav.contact}
          </span>

          {/* Huge Call to Action Heading */}
          <div className="max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-zinc-100 leading-[0.95]"
              style={{ fontFamily: "'Cabinet Grotesk', 'Inter', 'Arial', system-ui, sans-serif" }}
            >
              {dict.contact.title}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-zinc-900 pt-16 mt-6">
            {/* Left Column: Email Copy Widget */}
            <div className="flex flex-col gap-6 justify-between">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  {dict.contact.email}
                </span>
                <span className="text-xl md:text-2xl font-light text-zinc-300">
                  {emailAddress}
                </span>
              </div>

              {/* Copy Email Button */}
              <div className="flex items-start">
                <Magnetic range={40} strength={0.25}>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 px-6 py-4 rounded-full text-sm font-mono uppercase tracking-wider text-zinc-300 hover:text-zinc-100 transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 text-zinc-500" />
                        <span>{dict.contact.copy}</span>
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>
            </div>

            {/* Right Column: Telegram & Instagram Links */}
            <div className="flex flex-col gap-6 justify-between">
              <div className="flex flex-col gap-8">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-4 border-b border-zinc-900 hover:border-zinc-800 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center p-3 rounded-full border border-zinc-900 bg-zinc-950 text-zinc-500 group-hover:text-zinc-100 group-hover:border-zinc-800 transition-all duration-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-mono text-[10px] uppercase text-zinc-500 tracking-wider">
                            {social.name}
                          </span>
                          <span className="text-lg text-zinc-300 group-hover:text-zinc-100 transition-colors">
                            {social.handle}
                          </span>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

