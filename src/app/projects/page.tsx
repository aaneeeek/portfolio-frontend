import type { Metadata } from "next";
import { ProjectGrid } from "@/components/ProjectGrid";
import { PageHeader } from "@/components/ui";
import { api, media } from "@/lib/api";
import { dict, getLang } from "@/lib/i18n";
import type { Project } from "@/lib/types";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const lang = await getLang();
  const t = dict[lang];
  const projects = ((await api<Project[]>("/projects/", lang)) ?? []).map((p) => ({ ...p, cover: media(p.cover) }));
  return (
    <>
      <PageHeader title={t.projects_title} sub={t.projects_sub} />
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-6"><ProjectGrid projects={projects} t={t} /></div>
    </>
  );
}
