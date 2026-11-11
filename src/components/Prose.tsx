/** Renders plain text: blank-line paragraphs, and lines starting with "- " as bullets. */
export function Prose({ text, className = "" }: { text: string; className?: string }) {
  if (!text) return null;
  const blocks: { type: "p" | "ul"; lines: string[] }[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const bullet = line.startsWith("- ");
    const last = blocks[blocks.length - 1];
    if (bullet) {
      if (last?.type === "ul") last.lines.push(line.slice(2));
      else blocks.push({ type: "ul", lines: [line.slice(2)] });
    } else blocks.push({ type: "p", lines: [line] });
  }
  return (
    <div className={`space-y-3 ${className}`}>
      {blocks.map((b, i) =>
        b.type === "p" ? <p key={i}>{b.lines[0]}</p> : (
          <ul key={i} className="space-y-2 pl-5 [&>li]:list-disc [&>li]:marker:text-accent-2">
            {b.lines.map((l, j) => <li key={j}>{l}</li>)}
          </ul>
        ),
      )}
    </div>
  );
}
