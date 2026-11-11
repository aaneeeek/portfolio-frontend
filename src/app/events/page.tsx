import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { api, fmtDate, media } from "@/lib/api";
import { dict, getLang } from "@/lib/i18n";
import type { EventSummary } from "@/lib/types";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Events" };

export default async function EventsPage() {
  const lang = await getLang();
  const t = dict[lang];
  const events = (await api<EventSummary[]>("/events/", lang)) ?? [];
  return (
    <>
      <PageHeader title={t.events_title} sub={t.events_sub} />
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-6">
        {events.length === 0 ? <p className="text-muted">{t.empty_events}</p> : (
          <ul className="space-y-5">
            {events.map((e) => (
              <li key={e.slug}>
                <Link href={`/events/${e.slug}`} className="group grid overflow-hidden rounded-2xl border border-line bg-surface transition hover:border-accent-2 sm:grid-cols-[220px_1fr]">
                  <div className="aspect-[4/3] bg-linear-to-br from-accent to-accent-2 sm:aspect-auto">
                    {e.flyer && /* eslint-disable-next-line @next/next/no-img-element */ <img src={media(e.flyer)!} alt="" className="size-full object-cover" loading="lazy" />}
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-full bg-accent px-2.5 py-0.5 font-medium text-accent-fg">{t[e.status]}</span>
                      <span className="rounded-full border border-line px-2.5 py-0.5 text-muted">{t[e.kind]}</span>
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold group-hover:text-accent-2">{e.title}</h2>
                    <p className="mt-2 text-muted">{e.summary}</p>
                    <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
                      {e.start_date && <div className="flex items-center gap-1.5"><CalendarDays size={14} /><dt className="sr-only">{t.when}</dt><dd>{fmtDate(e.start_date, lang)}</dd></div>}
                      {e.schedule && <div className="flex items-center gap-1.5"><Clock size={14} /><dt className="sr-only">{t.schedule}</dt><dd>{e.schedule}</dd></div>}
                      {e.location && <div className="flex items-center gap-1.5"><MapPin size={14} /><dt className="sr-only">{t.where}</dt><dd>{e.location}</dd></div>}
                    </dl>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
