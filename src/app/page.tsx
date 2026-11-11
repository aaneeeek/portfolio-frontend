import Link from "next/link";
import { ArrowUpRight, CalendarDays, Download, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { ProjectCard } from "@/components/ProjectGrid";
import { Prose } from "@/components/Prose";
import { TechIcon } from "@/components/TechIcon";
import { Section, btnGhost, btnPrimary } from "@/components/ui";
import { api, fmtDate, media } from "@/lib/api";
import { dict, getLang } from "@/lib/i18n";
import type { EventSummary, HomeData, Skill } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const lang = await getLang();
  const t = dict[lang];
  const [home, events, skills] = await Promise.all([
    api<HomeData>("/home/", lang), api<EventSummary[]>("/events/", lang), api<Skill[]>("/skills/", lang),
  ]);
  if (!home) return <p className="mx-auto max-w-6xl px-5 py-24 text-muted">Portfolio content has not been created yet. Add your profile in /admin/.</p>;
  const { profile: p } = home;
  const next = events?.find((e) => e.status === "upcoming" || e.status === "ongoing");
  const cv = lang === "fr" ? p.cv_fr || p.cv_en : p.cv_en || p.cv_fr;
  const stack = (skills ?? []).filter((s) => s.category !== "tool").slice(0, 9);

  return (
    <>
      {/* Hero */}
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-10 pt-12 md:grid-cols-[1.2fr_1fr] md:pt-20">
        <div>
          <h1 className="text-5xl font-semibold md:text-7xl">{t.hero_hi.replace("{name}", p.display_name || p.full_name)}</h1>
          <p className="mt-3 font-display text-xl text-muted md:text-2xl">{p.full_name}</p>
          <p className="mt-6 max-w-xl text-lg">{t.hero_sub}</p>
          <p className="mt-2 text-sm text-muted">{p.headline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className={btnPrimary}>{t.view_work} <ArrowUpRight size={16} /></Link>
            {cv && <a href={media(cv)!} target="_blank" rel="noopener noreferrer" className={btnGhost}><Download size={16} /> {t.download_cv}</a>}
          </div>
          <ul className="mt-10 flex flex-wrap gap-3" aria-label="Technologies">
            {stack.map((s) => <li key={s.name} title={s.name} className="grid size-11 place-items-center rounded-xl border border-line bg-surface"><TechIcon name={s.icon || s.name} size={22} /></li>)}
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          <div className="disc-in absolute -right-10 top-16 aspect-square w-[95%] rounded-full bg-linear-to-br from-accent to-accent-2 opacity-90" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={media(p.photo) ?? "/photo.jpg"} alt={p.full_name} className="relative aspect-[4/5] w-full rounded-3xl object-cover object-top" />
          {next && (
            <Link href={`/events/${next.slug}`} className="absolute -bottom-6 -left-2 max-w-[17rem] rounded-2xl border border-line bg-surface/95 p-4 shadow-xl backdrop-blur transition hover:border-accent-2 md:-left-10">
              <p className="flex items-center gap-1.5 text-xs text-accent-2"><CalendarDays size={14} /> {t.next_up}{next.start_date ? ` · ${fmtDate(next.start_date, lang)}` : ""}</p>
              <p className="mt-1 font-display font-semibold">{next.title}</p>
              <p className="mt-1 text-sm text-muted">{t.see_event}</p>
            </Link>
          )}
        </div>
      </div>

      {/* About */}
      <Section id="about" title={t.about}>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-8">
            <Prose text={p.bio} className="text-lg" />
            <div>
              <h3 className="text-xl font-semibold">{t.story_title}</h3>
              <Prose text={p.story} className="mt-3 text-muted" />
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6">
            <h3 className="text-xl font-semibold">{t.learning_title}</h3>
            <Prose text={p.learning} className="mt-4 text-[15px] text-muted" />
          </div>
        </div>
        <div className="mt-14 grid gap-12 md:grid-cols-2">
          {[[t.experience, home.experience.map((x) => ({ k: x.organization + x.role, title: x.role, org: x.organization, period: x.period, text: x.description }))],
            [t.education, home.education.map((x) => ({ k: x.institution, title: x.degree, org: x.institution, period: x.period, text: x.description }))]].map(([label, items]) => (
            <div key={label as string}>
              <h3 className="text-2xl font-semibold">{label as string}</h3>
              <ol className="mt-6 space-y-8 border-l border-line pl-6">
                {(items as { k: string; title: string; org: string; period: string; text: string }[]).map((i) => (
                  <li key={i.k} className="relative">
                    <span className="absolute -left-[31px] top-1.5 size-2.5 rounded-full bg-accent-2 ring-4 ring-bg" />
                    <p className="text-sm text-muted">{i.period}</p>
                    <p className="font-display text-lg font-semibold">{i.title}</p>
                    <p className="text-accent-2">{i.org}</p>
                    <Prose text={i.text} className="mt-2 text-[15px] text-muted" />
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Section>

      {/* Influences */}
      <Section id="influences" title={t.influences} sub={t.influences_sub}>
        <div className="grid gap-5 md:grid-cols-2">
          {home.influences.map((i) => (
            <article key={i.name} className="flex gap-4 rounded-2xl border border-line bg-surface p-5">
              {i.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={media(i.image)!} alt="" className="size-14 shrink-0 rounded-xl object-cover" />
              ) : (
                <div aria-hidden className="grid size-14 shrink-0 place-items-center rounded-xl bg-linear-to-br from-accent to-accent-2 font-display text-lg font-bold text-accent-fg">{i.monogram || i.name.slice(0, 2)}</div>
              )}
              <div>
                <h3 className="font-display text-xl font-semibold">{i.name}</h3>
                <p className="text-sm text-muted">{i.role}</p>
                <p className="mt-3 text-[15px]">{i.effect}</p>
                {i.url && <a href={i.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm text-accent-2 hover:underline">{t.visit} {i.name} <ArrowUpRight size={14} /></a>}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Featured projects */}
      {home.featured_projects.length > 0 && (
        <Section id="featured" title={t.featured}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{home.featured_projects.map((x) => <ProjectCard key={x.slug} p={{ ...x, cover: media(x.cover) }} t={t} />)}</div>
          <Link href="/projects" className={`${btnGhost} mt-8`}>{t.all_projects} <ArrowUpRight size={16} /></Link>
        </Section>
      )}

      {/* Contact */}
      <Section id="contact" title={t.contact} sub={t.contact_sub}>
        <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
          <ul className="space-y-4">
            {p.address && <li className="flex items-center gap-3"><MapPin size={18} className="text-accent-2" /> {p.address}</li>}
            {p.phone && <li className="flex items-center gap-3"><Phone size={18} className="text-accent-2" /><a href={`tel:${p.phone.replace(/\s/g, "")}`} className="hover:underline">{p.phone}</a></li>}
            {p.email && <li className="flex items-center gap-3"><Mail size={18} className="text-accent-2" /><a href={`mailto:${p.email}`} className="hover:underline">{p.email}</a></li>}
            {p.github_url && <li className="flex items-center gap-3"><TechIcon name="github" size={18} /><a href={p.github_url} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a></li>}
            {p.linkedin_url && <li className="flex items-center gap-3"><span aria-hidden className="grid size-[18px] place-items-center rounded-sm bg-[#0A66C2] text-[11px] font-bold leading-none text-white">in</span><a href={p.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a></li>}
          </ul>
          <ContactForm t={t} />
        </div>
      </Section>
    </>
  );
}
