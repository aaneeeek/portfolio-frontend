import { cookies, headers } from "next/headers";
import type { Lang } from "./types";

export async function getLang(): Promise<Lang> {
  const c = (await cookies()).get("lang")?.value;
  if (c === "fr" || c === "en") return c;
  const accept = (await headers()).get("accept-language") ?? "";
  return accept.toLowerCase().startsWith("fr") ? "fr" : "en";
}

const en = {
  nav_home: "Home", nav_events: "Events", nav_projects: "Projects", nav_skills: "Skills",
  hero_hi: "Hi, I'm {name}.", hero_sub: "I build web platforms and real-time systems, and I'm teaching myself machine learning.",
  view_work: "View my projects", download_cv: "Download CV", next_up: "Coming up", see_event: "See the program",
  about: "About me", story_title: "How I got into tech", learning_title: "How I learn",
  education: "Education", experience: "Internships", influences: "Who shaped how I see computer science",
  influences_sub: "Creators and platforms I learned from, and what each one changed for me.", visit: "Visit",
  featured: "Projects I'm proud of", all_projects: "All projects", all_events: "All events",
  skills_title: "Skills", skills_sub: "Levels are my honest self-assessment: beginner means I'm still learning it, advanced means I use it comfortably on real projects.",
  language: "Languages", framework: "Frameworks", tool: "Tools",
  beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced",
  projects_title: "Projects", projects_sub: "Everything I've built, with its real status and progress.", filter_all: "All",
  website: "Websites & apps", game: "Games", ai: "AI", systems: "Systems & algorithms",
  done: "Done", in_progress: "In progress", paused: "Not continued", progress: "Progress",
  repo: "Source code", live: "Live site", technologies: "Technologies", algorithms: "How it works", gallery: "Gallery", back_projects: "All projects",
  events_title: "Events & training", events_sub: "Trainings, talks and other activities I run or take part in.",
  upcoming: "Upcoming", ongoing: "Ongoing", past: "Past", training: "Training", talk: "Talk", competition: "Competition", other: "Event",
  about_event: "About", objectives: "Objectives", prerequisites: "Prerequisites", tools: "Tools", plan: "Plan of work", weeks: "Weeks",
  mini_project: "Mini project", strategy: "How the program runs", fees: "Fees", total: "Total", register: "How to register", files: "Files",
  no_files: "No files yet. They will appear here during the program.", download: "Download", no_certificate: "No certificate is issued.",
  certificate: "A certificate is issued.", register_whatsapp: "Register on WhatsApp", schedule: "Schedule", where: "Where", when: "Dates", back_events: "All events",
  contact: "Get in touch", contact_sub: "Open to internships, collaborations and good conversations about code.",
  name: "Name", email: "Email", message: "Message", send: "Send message", sending: "Sending…",
  sent: "Message sent. Thank you, I'll reply soon.", send_error: "The message could not be sent. Try again in a minute or email me directly.",
  empty_projects: "No projects in this category yet.", empty_events: "No events yet.",
  not_found: "Page not found", not_found_text: "This page doesn't exist or was removed.", go_home: "Back to the home page",
  error_title: "The server is waking up", error_text: "The site runs on free hosting and sleeps when idle. Wait a few seconds and try again.", retry: "Try again",
  footer_note: "Technology names and logos are trademarks of their respective owners and only identify the tools I use. I am not affiliated with them. Joma Tech, Levi Okoye, Coding Ninjas and freeCodeCamp are mentioned as personal influences; no endorsement is implied.",
  toggle_theme: "Switch light/dark theme", toggle_lang: "Passer en français",
};

const fr: typeof en = {
  nav_home: "Accueil", nav_events: "Événements", nav_projects: "Projets", nav_skills: "Compétences",
  hero_hi: "Salut, je suis {name}.", hero_sub: "Je construis des plateformes web et des systèmes temps réel, et j'apprends le machine learning par moi-même.",
  view_work: "Voir mes projets", download_cv: "Télécharger le CV", next_up: "À venir", see_event: "Voir le programme",
  about: "À propos", story_title: "Comment je suis venu à la tech", learning_title: "Comment j'apprends",
  education: "Formation", experience: "Stages", influences: "Ceux qui ont façonné ma vision de l'informatique",
  influences_sub: "Les créateurs et plateformes dont j'ai appris, et ce que chacun a changé pour moi.", visit: "Visiter",
  featured: "Projets dont je suis fier", all_projects: "Tous les projets", all_events: "Tous les événements",
  skills_title: "Compétences", skills_sub: "Les niveaux sont ma propre évaluation, honnête : débutant signifie que j'apprends encore, avancé que je l'utilise avec aisance sur de vrais projets.",
  language: "Langages", framework: "Frameworks", tool: "Outils",
  beginner: "Débutant", intermediate: "Intermédiaire", advanced: "Avancé",
  projects_title: "Projets", projects_sub: "Tout ce que j'ai construit, avec son vrai statut et sa vraie progression.", filter_all: "Tous",
  website: "Sites & applications", game: "Jeux", ai: "IA", systems: "Systèmes & algorithmes",
  done: "Terminé", in_progress: "En cours", paused: "Non poursuivi", progress: "Progression",
  repo: "Code source", live: "Site en ligne", technologies: "Technologies", algorithms: "Comment ça marche", gallery: "Galerie", back_projects: "Tous les projets",
  events_title: "Événements & formations", events_sub: "Formations, conférences et autres activités que j'organise ou auxquelles je participe.",
  upcoming: "À venir", ongoing: "En cours", past: "Passé", training: "Formation", talk: "Conférence", competition: "Compétition", other: "Événement",
  about_event: "Présentation", objectives: "Objectifs", prerequisites: "Prérequis", tools: "Outils", plan: "Plan de travail", weeks: "Semaines",
  mini_project: "Mini-projet", strategy: "Déroulement du programme", fees: "Tarifs", total: "Total", register: "Comment s'inscrire", files: "Fichiers",
  no_files: "Aucun fichier pour l'instant. Ils apparaîtront ici pendant le programme.", download: "Télécharger", no_certificate: "Aucun certificat n'est délivré.",
  certificate: "Un certificat est délivré.", register_whatsapp: "S'inscrire sur WhatsApp", schedule: "Horaires", where: "Lieu", when: "Dates", back_events: "Tous les événements",
  contact: "Me contacter", contact_sub: "Ouvert aux stages, collaborations et bonnes conversations sur le code.",
  name: "Nom", email: "E-mail", message: "Message", send: "Envoyer le message", sending: "Envoi…",
  sent: "Message envoyé. Merci, je réponds bientôt.", send_error: "Le message n'a pas pu être envoyé. Réessayez dans une minute ou écrivez-moi directement.",
  empty_projects: "Aucun projet dans cette catégorie pour l'instant.", empty_events: "Aucun événement pour l'instant.",
  not_found: "Page introuvable", not_found_text: "Cette page n'existe pas ou a été supprimée.", go_home: "Retour à l'accueil",
  error_title: "Le serveur se réveille", error_text: "Le site tourne sur un hébergement gratuit qui s'endort quand il est inactif. Patientez quelques secondes puis réessayez.", retry: "Réessayer",
  footer_note: "Les noms et logos de technologies sont des marques de leurs propriétaires et servent uniquement à identifier les outils que j'utilise. Je ne suis affilié à aucun d'eux. Joma Tech, Levi Okoye, Coding Ninjas et freeCodeCamp sont cités comme influences personnelles ; aucune approbation n'est sous-entendue.",
  toggle_theme: "Basculer entre thème clair et sombre", toggle_lang: "Switch to English",
};

export const dict: Record<Lang, typeof en> = { en, fr };
export type Dict = typeof en;
