"use client";
import { useState } from "react";
import { API_URL } from "@/lib/api";
import type { Dict } from "@/lib/i18n";
import { btnPrimary } from "./ui";

const field = "w-full rounded-xl border border-line bg-surface px-4 py-2.5 outline-none transition focus:border-accent-2";

export function ContactForm({ t }: { t: Dict }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    try {
      const res = await fetch(`${API_URL}/api/contact/`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState("ok");
    } catch { setState("error"); }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">{t.name}<input name="name" required maxLength={100} className={`${field} mt-1.5`} autoComplete="name" /></label>
        <label className="block text-sm">{t.email}<input name="email" type="email" required className={`${field} mt-1.5`} autoComplete="email" /></label>
      </div>
      <label className="block text-sm">{t.message}<textarea name="message" required rows={5} maxLength={3000} className={`${field} mt-1.5`} /></label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" /> {/* spam trap */}
      <button type="submit" disabled={state === "sending"} className={`${btnPrimary} disabled:opacity-60`}>{state === "sending" ? t.sending : t.send}</button>
      <p role="status" className={`text-sm ${state === "ok" ? "text-ok" : "text-warn"}`}>
        {state === "ok" ? t.sent : state === "error" ? t.send_error : ""}
      </p>
    </form>
  );
}
