import Link from "next/link";
import { dict, getLang } from "@/lib/i18n";
import { btnPrimary } from "@/components/ui";

export default async function NotFound() {
  const t = dict[await getLang()];
  return (
    <div className="mx-auto max-w-xl px-5 py-24">
      <h1 className="text-4xl font-semibold">{t.not_found}</h1>
      <p className="mt-4 text-muted">{t.not_found_text}</p>
      <Link href="/" className={`${btnPrimary} mt-6`}>{t.go_home}</Link>
    </div>
  );
}
