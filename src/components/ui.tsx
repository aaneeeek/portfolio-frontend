import type { ReactNode } from "react";
import type { Dict } from "@/lib/i18n";
import type { Project } from "@/lib/types";

export function Section({ id, title, sub, children }: { id?: string; title: string; sub?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2>
        {sub && <p className="mt-3 max-w-2xl text-muted">{sub}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export function PageHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-4 pt-12 md:pt-16">
      <h1 className="text-4xl font-semibold md:text-5xl">{title}</h1>
      {sub && <p className="mt-4 max-w-2xl text-muted">{sub}</p>}
    </div>
  );
}

export const btnPrimary = "inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-accent to-accent-2 px-5 py-2.5 font-medium text-accent-fg transition hover:brightness-110";
export const btnGhost = "inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-2.5 font-medium transition hover:border-accent-2";

const statusColor = { done: "text-ok", in_progress: "text-accent-2", paused: "text-warn" } as const;

export function StatusBadge({ status, t }: { status: Project["status"]; t: Dict }) {
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-xs font-medium ${statusColor[status]}`}>
      <span className="size-1.5 rounded-full bg-current" />{t[status]}
    </span>
  );
}

export function ProgressBar({ value, status, label }: { value: number; status: Project["status"]; label: string }) {
  const bar = status === "done" ? "bg-ok" : status === "paused" ? "bg-warn" : "bg-linear-to-r from-accent to-accent-2";
  return (
    <div role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} className="flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
        <div className={`h-full rounded-full ${bar}`} style={{ width: `${value}%` }} />
      </div>
      <span className="w-10 text-right text-sm tabular-nums text-muted">{value}%</span>
    </div>
  );
}
