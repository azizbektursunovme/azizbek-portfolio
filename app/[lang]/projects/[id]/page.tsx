import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";
import { portfolioProjects } from "@/data/projects";
import Magnetic from "@/components/Magnetic";

export async function generateStaticParams() {
  const paths: Array<{ lang: string; id: string }> = [];
  const langs = ["en", "ru", "uz"];

  langs.forEach((lang) => {
    portfolioProjects.forEach((project) => {
      paths.push({ lang, id: project.id });
    });
  });

  return paths;
}

interface ProjectPageProps {
  params: Promise<{
    lang: string;
    id: string;
  }>;
}

export default async function ProjectPage(props: ProjectPageProps) {
  const { lang, id } = await props.params;
  const locale = resolveLocale(lang);
  const project = portfolioProjects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const t = dict.projectDetails;
  const projectText = dict.projects[id as keyof typeof dict.projects] || project;

  return (
    <div className="relative min-h-screen bg-zinc-950 px-6 py-24 md:px-10 md:py-32">
      {/* Structural visual grid lines */}
      <div className="absolute inset-0 grid grid-cols-4 gap-4 px-6 md:px-10 pointer-events-none opacity-5">
        <div className="border-r border-zinc-100 h-full"></div>
        <div className="border-r border-zinc-100 h-full"></div>
        <div className="border-r border-zinc-100 h-full"></div>
        <div></div>
      </div>

      <div className="mx-auto w-full max-w-5xl relative z-10">
        {/* Back navigation button */}
        <div className="mb-12">
          <Magnetic range={30} strength={0.3}>
            <Link
              href={`/${locale}#works`}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500 hover:text-zinc-100 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t.back}</span>
            </Link>
          </Magnetic>
        </div>

        {/* Project Header */}
        <div className="flex flex-col gap-6 mb-12">
          <h1
            className="text-4xl md:text-7xl font-black uppercase tracking-tight text-zinc-100"
            style={{ fontFamily: "'Cabinet Grotesk', 'Inter', 'Arial', system-ui, sans-serif" }}
          >
            {projectText.title}
          </h1>

          {/* Metadata Bar */}
          <div className="flex flex-wrap gap-8 border-y border-zinc-900 py-6 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-zinc-600" />
              <span className="uppercase text-zinc-600 mr-1">{t.year}:</span>
              <span>{project.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-zinc-600" />
              <span className="uppercase text-zinc-600 mr-1">{t.category}:</span>
              <span>{projectText.category}</span>
            </div>
          </div>
        </div>

        {/* Palette-based project intro */}
        <div
          className="relative mb-20 flex min-h-[280px] w-full overflow-hidden rounded-xl border border-zinc-900 p-8 md:min-h-[360px] md:p-10"
          style={{ background: project.palette.background }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.32),transparent_26%),linear-gradient(180deg,transparent_0%,rgba(9,9,11,0.82)_100%)]" />
          <div
            className="absolute right-10 top-10 h-28 w-28 rounded-full blur-2xl"
            style={{ backgroundColor: project.palette.accent, opacity: 0.18 }}
          />
          <div className="relative z-10 mt-auto flex w-full flex-col gap-5">
            <span className="w-fit rounded border border-white/10 bg-zinc-950/65 px-3 py-1 font-mono text-xs uppercase tracking-widest text-zinc-100 backdrop-blur">
              {projectText.category}
            </span>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <p className="max-w-xl text-lg font-light leading-relaxed text-zinc-200">
                {projectText.description}
              </p>
              <div className="flex gap-2">
                {[project.palette.accent, project.palette.muted, "rgba(255,255,255,0.86)"].map((color) => (
                  <span
                    key={color}
                    className="h-10 w-10 rounded-full border border-white/20"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Details Grid */}
        <div className="flex flex-col gap-16 md:gap-24">
          {/* Overview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-zinc-900 pb-12">
            <h2 className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-zinc-500">
              {t.overview}
            </h2>
            <p className="md:col-span-8 text-zinc-300 font-light leading-relaxed text-base md:text-lg">
              {projectText.overview}
            </p>
          </div>

          {/* Problem & Solution dual columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-zinc-900 pb-16">
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                {t.problem}
              </h3>
              <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
                {projectText.problem}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                {t.solution}
              </h3>
              <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
                {projectText.solution}
              </p>
            </div>
          </div>

          {/* Design Process */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-zinc-900 pb-12">
            <h2 className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-zinc-500">
              {t.process}
            </h2>
            <p className="md:col-span-8 text-zinc-400 font-light leading-relaxed text-sm md:text-base">
              {projectText.process}
            </p>
          </div>

          {/* Final Result */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-zinc-900 pb-12">
            <h2 className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-zinc-500">
              {t.result}
            </h2>
            <p className="md:col-span-8 text-zinc-300 font-medium leading-relaxed text-base md:text-lg">
              {projectText.result}
            </p>
          </div>

          {/* Image Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="flex flex-col gap-8">
              <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                {t.gallery}
              </h2>
              <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 md:gap-12">
                {project.gallery.map((asset, idx) => {
                  const isVector = asset.src.endsWith(".svg");

                  return (
                    <div
                      key={idx}
                      className="flex w-full items-center justify-center overflow-hidden rounded-xl border border-zinc-900 bg-zinc-900/20 p-3 md:p-5"
                    >
                      <Image
                        src={asset.src}
                        alt={asset.alt || `${projectText.title} gallery asset ${idx + 1}`}
                        width={asset.width}
                        height={asset.height}
                        quality={100}
                        unoptimized={isVector}
                        className="mx-auto block h-auto max-h-[80vh] w-auto max-w-full rounded-lg object-contain"
                        sizes="(max-width: 768px) 100vw, 1000px"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

