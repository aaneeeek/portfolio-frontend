"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-5 py-24">
      <h1 className="text-3xl font-semibold">The server is waking up · Le serveur se réveille</h1>
      <p className="mt-4 text-muted">The site runs on free hosting and sleeps when idle. Wait a few seconds and try again.</p>
      <p className="mt-2 text-muted">Le site tourne sur un hébergement gratuit qui s&apos;endort quand il est inactif. Patientez quelques secondes puis réessayez.</p>
      <button onClick={reset} className="mt-6 rounded-xl bg-linear-to-r from-accent to-accent-2 px-5 py-2.5 font-medium text-accent-fg">Try again · Réessayer</button>
    </div>
  );
}
