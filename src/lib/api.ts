import type { Lang } from "./types";

export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/$/, "");

/** GET from the Django API. Returns null on 404, throws on any other failure (shows error.tsx). */
export async function api<T>(path: string, lang: Lang): Promise<T | null> {
  const res = await fetch(`${API_URL}/api${path}?lang=${lang}`, { next: { revalidate: 300 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API ${res.status} for ${path}`);
  return res.json() as Promise<T>;
}

/** Make a media URL absolute (local dev serves /media/... from Django). */
export function media(url: string | null | undefined): string | null {
  if (!url) return null;
  return url.startsWith("http") ? url : `${API_URL}${url}`;
}

export function youtubeEmbed(url: string): string {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}` : url;
}

export function fmtDate(d: string | null, lang: Lang): string {
  if (!d) return "";
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(d));
}
