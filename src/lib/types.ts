export type Lang = "en" | "fr";

export interface Profile {
  full_name: string; display_name: string; headline: string; bio: string; story: string; learning: string;
  photo: string | null; address: string; phone: string; email: string; github_url: string; linkedin_url: string;
  cv_en: string | null; cv_fr: string | null;
}
export interface Education { institution: string; degree: string; period: string; description: string }
export interface Experience { organization: string; role: string; period: string; description: string }
export interface Influence { name: string; kind: string; monogram: string; url: string; role: string; effect: string; image: string | null }
export interface Skill { name: string; category: "language" | "framework" | "tool"; level: "beginner" | "intermediate" | "advanced"; icon: string }
export interface ProjectMedia { kind: "image" | "video" | "embed"; image: string | null; video: string | null; embed_url: string; caption: string }
export interface Project {
  slug: string; title: string; category: "website" | "game" | "ai" | "systems"; status: "done" | "in_progress" | "paused";
  progress: number; summary: string; description: string; algorithms: string; technologies: string[];
  repo_url: string; live_url: string; cover: string | null; cover_video: string | null; featured: boolean; media: ProjectMedia[];
}
export interface EventSummary {
  slug: string; kind: "training" | "talk" | "competition" | "other"; status: "upcoming" | "ongoing" | "past";
  title: string; summary: string; start_date: string | null; end_date: string | null; schedule: string; location: string; flyer: string | null;
}
export interface PlanModule { title: string; weeks?: string; items: { text: string; is_project?: boolean }[] }
export interface PricingLine { label: string; amount: number; currency: string; note?: string }
export interface EventDetail extends EventSummary {
  description: string; objectives: string; prerequisites: string; tools: string[]; plan_of_work: PlanModule[];
  strategy: string; pricing: PricingLine[]; registration: string; certificate: boolean;
  files: { title: string; file: string; uploaded_at: string }[];
}
export interface HomeData {
  profile: Profile; education: Education[]; experience: Experience[]; influences: Influence[]; featured_projects: Project[];
}
