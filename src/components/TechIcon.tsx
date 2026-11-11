import {
  siCplusplus, siCss, siDjango, siDocker, siGithub, siHtml5, siJavascript, siJira, siNextdotjs,
  siOpenjdk, siPython, siReact, siRust, siTailwindcss, siTypescript, siPostgresql, siPytorch, siGooglecolab,
} from "simple-icons";

type SI = { title: string; hex: string; path: string };

// Open-licensed (CC0) icon paths from the simple-icons package. Names are matched loosely.
const ICONS: Record<string, SI> = {
  python: siPython, java: siOpenjdk, rust: siRust, cplusplus: siCplusplus, "c++": siCplusplus,
  html5: siHtml5, html: siHtml5, css3: siCss, css: siCss, javascript: siJavascript, typescript: siTypescript,
  django: siDjango, react: siReact, nextjs: siNextdotjs, "next.js": siNextdotjs, tailwindcss: siTailwindcss,
  "tailwind css": siTailwindcss, docker: siDocker, jira: siJira, github: siGithub, postgresql: siPostgresql,
  pytorch: siPytorch, "google colab": siGooglecolab,
};

export function hasIcon(name: string) { return !!ICONS[name.toLowerCase()]; }

function isDark(hex: string) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.28;
}

export function TechIcon({ name, size = 24 }: { name: string; size?: number }) {
  const icon = ICONS[name.toLowerCase()];
  if (!icon) {
    return (
      <span aria-hidden className="grid place-items-center rounded-md bg-surface-2 font-display text-[10px] font-bold text-accent-2"
        style={{ width: size, height: size }}>
        {name.slice(0, 2)}
      </span>
    );
  }
  return (
    <svg role="img" aria-label={icon.title} viewBox="0 0 24 24" width={size} height={size}
      className={isDark(icon.hex) ? "fill-fg" : ""} fill={isDark(icon.hex) ? undefined : `#${icon.hex}`}>
      <path d={icon.path} />
    </svg>
  );
}
