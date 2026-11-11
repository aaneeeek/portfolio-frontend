"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Languages, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import type { Dict } from "@/lib/i18n";
import type { Lang } from "@/lib/types";

export function Header({ t, lang }: { t: Dict; lang: Lang }) {
  const path = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const links = [["/", t.nav_home], ["/events", t.nav_events], ["/projects", t.nav_projects], ["/skills", t.nav_skills]] as const;

  function switchLang() {
    document.cookie = `lang=${lang === "en" ? "fr" : "en"}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3">
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          <span className="mr-1.5 inline-grid size-8 place-items-center rounded-lg bg-linear-to-br from-accent to-accent-2 text-sm text-accent-fg">OV</span>
          Onye
        </Link>
        <nav aria-label="Main" className="order-3 flex w-full gap-1 overflow-x-auto md:order-none md:w-auto md:flex-1">
          {links.map(([href, label]) => {
            const active = href === "/" ? path === "/" : path.startsWith(href);
            return (
              <Link key={href} href={href} aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-1.5 text-sm transition ${active ? "bg-surface-2 font-medium text-fg" : "text-muted hover:text-fg"}`}>
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <button onClick={switchLang} aria-label={t.toggle_lang} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-sm hover:border-accent-2">
            <Languages size={16} /> {lang === "en" ? "FR" : "EN"}
          </button>
          <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} aria-label={t.toggle_theme}
            className="grid size-9 place-items-center rounded-lg border border-line hover:border-accent-2">
            <Sun size={16} className="hidden dark:block" /><Moon size={16} className="dark:hidden" />
          </button>
        </div>
      </div>
    </header>
  );
}
