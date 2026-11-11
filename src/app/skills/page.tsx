import type { Metadata } from "next";
import { TechIcon } from "@/components/TechIcon";
import { PageHeader } from "@/components/ui";
import { api } from "@/lib/api";
import { dict, getLang } from "@/lib/i18n";
import type { Skill } from "@/lib/types";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Skills" };
const LEVEL = { beginner: 1, intermediate: 2, advanced: 3 } as const;

export default async function SkillsPage() {
  const lang = await getLang();
  const t = dict[lang];
  const skills = (await api<Skill[]>("/skills/", lang)) ?? [];
  return (
    <>
      <PageHeader title={t.skills_title} sub={t.skills_sub} />
      <div className="mx-auto max-w-6xl space-y-12 px-5 pb-20 pt-6">
        {(["language", "framework", "tool"] as const).map((cat) => {
          const items = skills.filter((s) => s.category === cat);
          if (!items.length) return null;
          return (
            <section key={cat}>
              <h2 className="text-2xl font-semibold">{t[cat]}</h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s) => (
                  <li key={s.name} className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4">
                    <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-surface-2"><TechIcon name={s.icon || s.name} size={26} /></div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-display font-semibold">{s.name}</span>
                        <span className="text-xs text-muted">{t[s.level]}</span>
                      </div>
                      <div className="mt-2 flex gap-1.5" role="img" aria-label={`${s.name}: ${t[s.level]}`}>
                        {[1, 2, 3].map((n) => <span key={n} className={`h-1.5 flex-1 rounded-full ${n <= LEVEL[s.level] ? "bg-linear-to-r from-accent to-accent-2" : "bg-surface-2"}`} />)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
