import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, ChevronDown, Clock, Download, FileText, MapPin } from "lucide-react";
import { Prose } from "@/components/Prose";
import { btnPrimary } from "@/components/ui";
import { api, fmtDate, media } from "@/lib/api";
import { dict, getLang } from "@/lib/i18n";
import type { EventDetail } from "@/lib/types";

export const dynamic = "force-dynamic";
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "237690487415";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = await api<EventDetail>(`/events/${slug}/`, await getLang()).catch(() => null);
  return { title: e?.title ?? "Event" };
}

const H = ({ children }: { children: React.ReactNode }) => <h2 className="text-2xl font-semibold">{children}</h2>;

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getLang();
  const t = dict[lang];
  const e = await api<EventDetail>(`/events/${slug}/`, lang);
  if (!e) notFound();
  const total = e.pricing.reduce((s, l) => s + l.amount, 0);
  const cur = e.pricing[0]?.currency ?? "";
  const fmt = (n: number) => new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US").format(n);

  return (
    <article className="mx-auto max-w-6xl px-5 pb-20 pt-10">
      <Link href="/events" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg"><ArrowLeft size={14} /> {t.back_events}</Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-[360px_1fr]">
        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          {e.flyer ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={media(e.flyer)!} alt={e.title} className="w-full rounded-2xl border border-line" />
          ) : <div className="aspect-[3/4] rounded-2xl bg-linear-to-br from-accent to-accent-2" />}
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} w-full justify-center`}>{t.register_whatsapp}</a>
        </aside>

        <div className="space-y-12">
          <header>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-accent px-2.5 py-0.5 font-medium text-accent-fg">{t[e.status]}</span>
              <span className="rounded-full border border-line px-2.5 py-0.5 text-muted">{t[e.kind]}</span>
            </div>
            <h1 className="mt-3 text-4xl font-semibold md:text-5xl">{e.title}</h1>
            <p className="mt-4 text-lg text-muted">{e.summary}</p>
            <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
              {(e.start_date || e.end_date) && <div className="rounded-xl border border-line bg-surface p-3"><dt className="flex items-center gap-1.5 text-muted"><CalendarDays size={14} /> {t.when}</dt><dd className="mt-1">{fmtDate(e.start_date, lang)}{e.end_date ? ` → ${fmtDate(e.end_date, lang)}` : ""}</dd></div>}
              {e.schedule && <div className="rounded-xl border border-line bg-surface p-3"><dt className="flex items-center gap-1.5 text-muted"><Clock size={14} /> {t.schedule}</dt><dd className="mt-1">{e.schedule}</dd></div>}
              {e.location && <div className="rounded-xl border border-line bg-surface p-3"><dt className="flex items-center gap-1.5 text-muted"><MapPin size={14} /> {t.where}</dt><dd className="mt-1">{e.location}</dd></div>}
            </dl>
          </header>

          {e.description && <section><H>{t.about_event}</H><Prose text={e.description} className="mt-3 text-lg" /></section>}
          {e.objectives && <section><H>{t.objectives}</H><Prose text={e.objectives.split("\n").map((l) => `- ${l}`).join("\n")} className="mt-3" /></section>}
          {e.prerequisites && <section><H>{t.prerequisites}</H><Prose text={e.prerequisites.split("\n").map((l) => `- ${l}`).join("\n")} className="mt-3" /></section>}
          {e.tools.length > 0 && <section><H>{t.tools}</H><ul className="mt-3 flex flex-wrap gap-2">{e.tools.map((x) => <li key={x} className="rounded-xl border border-line bg-surface px-3 py-1.5 text-sm">{x}</li>)}</ul></section>}

          {e.plan_of_work.length > 0 && (
            <section>
              <H>{t.plan}</H>
              <div className="mt-4 space-y-3">
                {e.plan_of_work.map((m, i) => (
                  <details key={i} open={i === 0} className="rounded-2xl border border-line bg-surface">
                    <summary className="flex items-center justify-between gap-4 p-5">
                      <span className="font-display text-lg font-semibold">{m.title}</span>
                      <span className="flex shrink-0 items-center gap-3 text-sm text-muted">
                        {m.weeks && <span>{t.weeks} {m.weeks}</span>}
                        <ChevronDown size={18} className="chev transition" />
                      </span>
                    </summary>
                    <ol className="list-[lower-alpha] space-y-2 px-5 pb-5 pl-11 marker:font-medium marker:text-accent-2">
                      {m.items.map((it, j) => (
                        <li key={j}>{it.text}{it.is_project && <span className="ml-2 rounded-full bg-accent/15 px-2 py-0.5 text-xs text-accent-2">{t.mini_project}</span>}</li>
                      ))}
                    </ol>
                  </details>
                ))}
              </div>
            </section>
          )}

          {e.strategy && <section><H>{t.strategy}</H><Prose text={e.strategy} className="mt-3" /></section>}

          {e.pricing.length > 0 && (
            <section>
              <H>{t.fees}</H>
              <table className="mt-4 w-full text-left">
                <tbody className="divide-y divide-line">
                  {e.pricing.map((l, i) => (
                    <tr key={i}><td className="py-3">{l.label}{l.note && <span className="block text-sm text-muted">{l.note}</span>}</td><td className="py-3 text-right tabular-nums">{fmt(l.amount)} {l.currency}</td></tr>
                  ))}
                  <tr className="font-semibold"><td className="py-3">{t.total}</td><td className="py-3 text-right tabular-nums">{fmt(total)} {cur}</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-sm text-muted">{e.certificate ? t.certificate : t.no_certificate}</p>
            </section>
          )}

          {e.registration && <section><H>{t.register}</H><Prose text={e.registration} className="mt-3" /></section>}

          <section>
            <H>{t.files}</H>
            {e.files.length === 0 ? <p className="mt-3 text-muted">{t.no_files}</p> : (
              <ul className="mt-4 space-y-2">
                {e.files.map((f, i) => (
                  <li key={i}>
                    <a href={media(f.file)!} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3 transition hover:border-accent-2">
                      <FileText size={18} className="text-accent-2" /><span className="flex-1">{f.title}</span><span className="flex items-center gap-1 text-sm text-muted"><Download size={14} /> {t.download}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </article>
  );
}
