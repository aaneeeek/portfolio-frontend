"use client";
import Link from "next/link";
import { useState } from "react";
import { Brain, Cpu, Gamepad2, Globe } from "lucide-react";
import { media } from "@/lib/api";
import type { Dict } from "@/lib/i18n";
import type { Project } from "@/lib/types";
import { CoverVideo } from "./CoverVideo";
import { ProgressBar, StatusBadge } from "./ui";

const CAT_ICON = { website: Globe, game: Gamepad2, ai: Brain, systems: Cpu } as const;
const CATS = ["website", "game", "ai", "systems"] as const;

export function ProjectCard({ p, t }: { p: Project; t: Dict }) {
  const Icon = CAT_ICON[p.category];
  return (
    <Link href={`/projects/${p.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:border-accent-2">
      <div className="relative aspect-[16/9] bg-linear-to-br from-surface-2 to-bg">
        {p.cover_video ? (
          <CoverVideo src={media(p.cover_video)!} poster={media(p.cover)} className="size-full object-cover" />
        ) : p.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.cover} alt="" className="size-full object-cover" loading="lazy" />
        ) : (
          <div className="grid size-full place-items-center text-accent-2/70"><Icon size={44} strokeWidth={1.4} /></div>
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-bg/80 px-2.5 py-0.5 text-xs font-medium backdrop-blur">
          <Icon size={12} /> {t[p.category]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold group-hover:text-accent-2">{p.title}</h3>
          <StatusBadge status={p.status} t={t} />
        </div>
        <p className="text-sm text-muted">{p.summary}</p>
        <div className="mt-auto pt-2"><ProgressBar value={p.progress} status={p.status} label={t.progress} /></div>
        <div className="flex flex-wrap gap-1.5">
          {p.technologies.slice(0, 5).map((x) => <span key={x} className="rounded-md bg-surface-2 px-2 py-0.5 text-xs text-muted">{x}</span>)}
        </div>
      </div>
    </Link>
  );
}

export function ProjectGrid({ projects, t }: { projects: Project[]; t: Dict }) {
  const [cat, setCat] = useState<"all" | (typeof CATS)[number]>("all");
  const shown = cat === "all" ? projects : projects.filter((p) => p.category === cat);
  const present = CATS.filter((c) => projects.some((p) => p.category === c));
  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="group">
        {(["all", ...present] as const).map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${cat === c ? "border-accent bg-accent text-accent-fg" : "border-line bg-surface hover:border-accent-2"}`}>
            {c === "all" ? t.filter_all : t[c]}
          </button>
        ))}
      </div>
      {shown.length === 0 ? <p className="text-muted">{t.empty_projects}</p> : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{shown.map((p) => <ProjectCard key={p.slug} p={p} t={t} />)}</div>
      )}
    </>
  );
}
