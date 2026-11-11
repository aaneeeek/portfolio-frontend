import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/Header";
import { dict, getLang } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Iroegbu Onyedikachi Victor — Portfolio", template: "%s · Onye" },
  description: "Full-stack developer and software engineering student in Douala. Projects, skills and trainings.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  const t = dict[lang];
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <Header t={t} lang={lang} />
          <main>{children}</main>
          <footer className="border-t border-line py-10">
            <div className="mx-auto max-w-6xl space-y-3 px-5 text-sm text-muted">
              <p>© {new Date().getFullYear()} Iroegbu Onyedikachi Victor</p>
              <p className="max-w-3xl">{t.footer_note}</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
