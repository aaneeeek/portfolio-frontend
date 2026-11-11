export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-4 px-5 py-20" aria-busy="true">
      <div className="h-10 w-2/3 animate-pulse rounded-xl bg-surface-2" />
      <div className="h-5 w-1/2 animate-pulse rounded-lg bg-surface-2" />
      <div className="h-64 animate-pulse rounded-2xl bg-surface-2" />
    </div>
  );
}
