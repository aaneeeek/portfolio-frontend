import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Prose } from "@/components/Prose";
import { TechIcon, hasIcon } from "@/components/TechIcon";
import { ProgressBar, StatusBadge, btnGhost, btnPrimary } from "@/components/ui";
import { api, media, youtubeEmbed } from "@/lib/api";
import { dict, getLang } from "@/lib/i18n";
import type { Project } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await api<Project>(`/projects/${slug}/`, await getLang()).catch(() => null);
  return { title: p?.title ?? "Project" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getLang();
  const t = dict[lang];
  const p = await api<Project>(`/projects/${slug}/`, lang);
  if (!p) notFound();
  return (
    <article className="mx-auto max-w-4xl px-5 pb-20 pt-10">
      <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg"><ArrowLeft size={14} /> {t.back_projects}</Link>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <h1 className="text-4xl font-semibold md:text-5xl">{p.title}</h1>
        <StatusBadge status={p.status} t={t} />
      </div>
      <p className="mt-2 text-muted">{t[p.category]}</p>
      <p className="mt-5 text-lg">{p.summary}</p>
      <div className="mt-6 max-w-md"><ProgressBar value={p.progress} status={p.status} label={t.progress} /></div>
      <div className="mt-6 flex flex-wrap gap-3">
        {p.repo_url && <a href={p.repo_url} target="_blank" rel="noopener noreferrer" className={btnPrimary}><TechIcon name="github" size={16} /> {t.repo}</a>}
        {p.live_url && <a href={p.live_url} target="_blank" rel="noopener noreferrer" className={btnGhost}><ExternalLink size={16} /> {t.live}</a>}
      </div>

      {p.cover_video ? (
        <video src={media(p.cover_video)!} poster={media(p.cover) ?? undefined} controls playsInline preload="metadata" className="mt-10 w-full rounded-2xl border border-line" />
      ) : p.cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={media(p.cover)!} alt="" className="mt-10 w-full rounded-2xl border border-line" />
      )}
      <Prose text={p.description} className="mt-10 text-lg" />
      {p.algorithms && (
        <section className="mt-10 rounded-2xl border border-line bg-surface p-6">
          <h2 className="text-2xl font-semibold">{t.algorithms}</h2>
          <Prose text={p.algorithms} className="mt-3 text-muted" />
        </section>
      )}
      {p.technologies.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">{t.technologies}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.technologies.map((x) => (
              <li key={x} className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-1.5 text-sm">
                {hasIcon(x) && <TechIcon name={x} size={16} />}{x}
              </li>
            ))}
          </ul>
        </section>
      )}
      {p.media.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">{t.gallery}</h2>
          <div className="mt-4 space-y-6">
            {p.media.map((m, i) => (
              <figure key={i}>
                {m.kind === "image" && m.image && /* eslint-disable-next-line @next/next/no-img-element */ <img src={media(m.image)!} alt={m.caption} className="w-full rounded-2xl border border-line" loading="lazy" />}
                {m.kind === "video" && m.video && <video src={media(m.video)!} controls preload="metadata" className="w-full rounded-2xl border border-line" />}
                {m.kind === "embed" && m.embed_url && <iframe src={youtubeEmbed(m.embed_url)} title={m.caption || p.title} loading="lazy" allowFullScreen className="aspect-video w-full rounded-2xl border border-line" />}
                {m.caption && <figcaption className="mt-2 text-sm text-muted">{m.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
