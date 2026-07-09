import React, { useState } from "react";
import type { FormEvent } from "react";
import {
  Sun,
  Moon,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Terminal,
  FolderGit2,
  ChevronRight,
  Code2,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const AVATAR_SRC = "data:image/jpeg;base64,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";

// URL du backend PHP. En dev, le proxy Vite redirige /backend vers
// php -S localhost:8000 -t backend (voir vite.config.ts).
// En production, /backend doit pointer vers le dossier backend/ déployé
// sur le même domaine (ou fixe VITE_API_URL dans un fichier .env).
const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "/backend";

type Theme = "dark" | "light";

interface PaletteColors {
  bg: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  accent: string;
  accent2: string;
  border: string;
  danger: string;
}

const PALETTE: Record<Theme, PaletteColors> = {
  dark: {
    bg: "#12161A",
    surface: "#191E23",
    surfaceAlt: "#1E252B",
    text: "#E7E9EA",
    textMuted: "#8B949E",
    accent: "#2DD4BF",
    accent2: "#E0A458",
    border: "#2A3138",
    danger: "#E5787A",
  },
  light: {
    bg: "#F6F5F1",
    surface: "#FFFFFF",
    surfaceAlt: "#EFEDE7",
    text: "#1B1F23",
    textMuted: "#5B6168",
    accent: "#0E7C6B",
    accent2: "#B5651D",
    border: "#DEDBD3",
    danger: "#C24242",
  },
};

const FONTS = {
  display: "'Space Grotesk', 'Segoe UI', sans-serif",
  body: "'Inter', 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
};

interface NavItem {
  id: string;
  file: string;
  label: string;
}

const NAV: NavItem[] = [
  { id: "accueil", file: "Accueil", label: "Accueil" },
  { id: "apropos", file: "À propos", label: "À propos" },
  { id: "competences", file: "Compétences", label: "Compétences" },
  { id: "projets", file: "Projets", label: "Projets" },
  { id: "contact", file: "Contact", label: "Contact" },
];

interface SkillGroup {
  group: string;
  items: string[];
}

const SKILLS: SkillGroup[] = [
  { group: "Frontend", items: ["HTML", "CSS", "Bootstrap", "JavaScript", "React"] },
  { group: "Backend & Données", items: ["PHP", "MySQL"] },
  { group: "Outils", items: ["VS Code", "Git"] },
];

interface Project {
  name: string;
  title: string;
  stack: string[];
  desc: string;
}

const PROJECTS: Project[] = [
  {
    name: "gestion-scolaire/",
    title: "Système de gestion scolaire",
    stack: ["React", "PHP", "MySQL"],
    desc:
      "Application pour gérer élèves, notes et emplois du temps, avec une interface React et une API PHP connectée à MySQL.",
  },
  {
    name: "boutique-en-ligne/",
    title: "Site e-commerce responsive",
    stack: ["Bootstrap", "JavaScript"],
    desc:
      "Vitrine de produits avec panier dynamique, filtres et affichage adapté au mobile grâce à Bootstrap.",
  },
  {
    name: "site-vitrine-client/",
    title: "Site vitrine pour un client",
    stack: ["HTML", "CSS", "JavaScript"],
    desc:
      "Page de présentation pour une petite entreprise : sections claires, formulaire de contact et animations légères.",
  },
];

interface ChipProps {
  children: React.ReactNode;
  c: PaletteColors;
}

function Chip({ children, c }: ChipProps) {
  return (
    <span
      className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium mr-2 mb-2"
      style={{
        fontFamily: FONTS.mono,
        color: c.accent,
        backgroundColor: c.surfaceAlt,
        border: `1px solid ${c.border}`,
      }}
    >
      {children}
    </span>
  );
}

interface SectionLabelProps {
  number: string;
  filename: string;
  c: PaletteColors;
}

function SectionLabel({ number, filename, c }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <span
        className="text-xs px-1.5 py-0.5 rounded"
        style={{ fontFamily: FONTS.mono, color: c.bg, backgroundColor: c.accent }}
      >
        {number}
      </span>
      <span className="text-sm tracking-wide" style={{ fontFamily: FONTS.mono, color: c.textMuted }}>
        {filename}
      </span>
      <span className="flex-1 h-px" style={{ backgroundColor: c.border }} />
    </div>
  );
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

interface ContactFormProps {
  c: PaletteColors;
}

function ContactForm({ c }: ContactFormProps) {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch(`${API_URL}/contact.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data: { success: boolean; message?: string } = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.message ?? "Une erreur est survenue.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Impossible de contacter le serveur. Réessayez plus tard.");
    }
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: c.surfaceAlt,
    border: `1px solid ${c.border}`,
    color: c.text,
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <label className="block text-xs mb-1.5" style={{ fontFamily: FONTS.mono, color: c.textMuted }}>
          nom
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={handleChange("name")}
          placeholder="Votre nom"
          className="w-full px-3 py-2 rounded-md text-sm outline-none"
          style={inputStyle}
        />
      </div>
      <div>
        <label className="block text-xs mb-1.5" style={{ fontFamily: FONTS.mono, color: c.textMuted }}>
          email
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={handleChange("email")}
          placeholder="votre@email.com"
          className="w-full px-3 py-2 rounded-md text-sm outline-none"
          style={inputStyle}
        />
      </div>
      <div>
        <label className="block text-xs mb-1.5" style={{ fontFamily: FONTS.mono, color: c.textMuted }}>
          message
        </label>
        <textarea
          rows={4}
          required
          value={form.message}
          onChange={handleChange("message")}
          placeholder="Décrivez votre projet..."
          className="w-full px-3 py-2 rounded-md text-sm outline-none resize-none"
          style={inputStyle}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium disabled:opacity-60"
        style={{ backgroundColor: c.accent, color: c.bg }}
      >
        {status === "loading" && <Loader2 size={16} className="animate-spin" />}
        {status === "loading" ? "Envoi en cours..." : "Envoyer le message"}
      </button>

      {status === "success" && (
        <p className="flex items-center gap-2 text-sm" style={{ color: c.accent }}>
          <CheckCircle2 size={16} />
          Message envoyé avec succès. Merci, je reviens vers vous rapidement !
        </p>
      )}
      {status === "error" && (
        <p className="flex items-center gap-2 text-sm" style={{ color: c.danger }}>
          <XCircle size={16} />
          {errorMsg}
        </p>
      )}

      <p style={{ color: c.textMuted, fontSize: "0.7rem" }}>
        Ce formulaire envoie les données à <code>backend/contact.php</code>, qui enregistre le
        message en base MySQL et/ou envoie un e-mail de notification.
      </p>
    </form>
  );
}

export default function Portfolio() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [active, setActive] = useState<string>("accueil");
  const c = PALETTE[theme];

  const scrollTo = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="min-h-screen w-full transition-colors duration-300"
      style={{ backgroundColor: c.bg, color: c.text, fontFamily: FONTS.body }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
        * { scroll-behavior: smooth; }
        ::selection { background: ${c.accent}; color: ${c.bg}; }
      `}</style>

      {/* ===== Tab bar (nav) ===== */}
           <div className="sticky top-0 z-50 w-full border-b" style={{ backgroundColor: c.surface, borderColor: c.border }}>
        <div className="max-w-5xl mx-auto flex items-center">
          <div className="flex items-center gap-2 px-4 py-3 shrink-0" style={{ color: c.accent }}>
            <Terminal size={16} />
            <span className="text-sm font-semibold hidden sm:inline" style={{ fontFamily: FONTS.mono }}>
              Fitiavana.dev
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center overflow-x-auto">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="px-4 py-3 text-sm whitespace-nowrap border-r transition-colors"
                style={{
                  fontFamily: FONTS.mono,
                  borderColor: c.border,
                  color: active === n.id ? c.accent : c.textMuted,
                  backgroundColor: active === n.id ? c.surfaceAlt : "transparent",
                }}
              >
                {n.file}
              </button>
            ))}
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mx-3 my-2 shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-md text-xs"
            style={{ fontFamily: FONTS.mono, border: `1px solid ${c.border}`, color: c.text, backgroundColor: c.surfaceAlt }}
            aria-label="Changer de thème"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            {theme === "dark" ? "light" : "dark"}
          </button>
        </div>
      </div>

      {/* ===== Hero ===== */}
      <section id="accueil" className="max-w-5xl mx-auto px-4 sm:px-6 pt-14 pb-20">
        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: c.surface, border: `1px solid ${c.border}` }}>
          <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: c.border, backgroundColor: c.surfaceAlt }}>
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.danger }} />
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.accent2 }} />
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.accent }} />
            <span className="ml-3 text-xs" style={{ fontFamily: FONTS.mono, color: c.textMuted }}>
   Accueil
</span>
          </div>

          <div className="grid md:grid-cols-[auto_1fr] gap-8 p-6 sm:p-10 items-center">
            <div className="flex justify-center md:justify-start">
              <img
                src={AVATAR_SRC}
                alt="Rakotomihaja Eric Fitiavana"
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-xl object-cover"
                style={{ border: `2px solid ${c.accent}` }}
              />
            </div>
            <div>
              <p className="text-sm mb-2" style={{ fontFamily: FONTS.mono, color: c.accent }}>
                <span style={{ color: c.textMuted }}>const</span> développeur ={" "}
                <span style={{ color: c.accent2 }}>"disponible en freelance"</span>;
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-2" style={{ fontFamily: FONTS.display }}>
                Rakotomihaja Eric Fitiavana
              </h1>
              <p className="text-base sm:text-lg mb-5" style={{ color: c.textMuted }}>
                Étudiant en informatique &amp; développeur web — je conçois des sites et applications
                propres, rapides et responsives.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo("projets")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium"
                  style={{ backgroundColor: c.accent, color: c.bg }}
                >
                  <FolderGit2 size={16} />
                  Voir mes projets
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium"
                  style={{ border: `1px solid ${c.border}`, color: c.text }}
                >
                  <Mail size={16} />
                  Me contacter
                </button>
              </div>
            </div>
          </div>

          <div
            className="flex items-center justify-between px-4 py-2 text-xs border-t"
            style={{ borderColor: c.border, backgroundColor: c.accent, color: c.bg, fontFamily: FONTS.mono }}
          >
            <span>● prêt pour de nouveaux projets</span>
            <span className="hidden sm:inline">UTF-8 · React · TypeScript · Tailwind</span>
          </div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section id="apropos" className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <SectionLabel number="01" filename="À propos" c={c} />
        <div className="grid md:grid-cols-[1fr_1fr] gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: FONTS.display }}>
              À propos de moi
            </h2>
            <p className="mb-4 leading-relaxed" style={{ color: c.textMuted }}>
              Je m'appelle Eric Fitiavana Rakotomihaja, étudiant en informatique passionné par le
              développement web. J'aime transformer une idée en interface claire et fonctionnelle,
              du premier croquis jusqu'à la mise en ligne.
            </p>
            <p className="leading-relaxed" style={{ color: c.textMuted }}>
              Je travaille aussi bien sur la partie visible d'un site (frontend) que sur la logique
              côté serveur et les bases de données (backend), ce qui me permet de suivre un projet du
              début à la fin.
            </p>
          </div>
          <div
            className="rounded-lg p-5"
            style={{ backgroundColor: c.surface, border: `1px solid ${c.border}`, fontFamily: FONTS.mono, fontSize: "0.85rem" }}
          >
            <p style={{ color: c.textMuted }}>$ whoami</p>
            <p className="mt-1" style={{ color: c.accent }}>
              Eric Fitiavana Rakotomihaja
            </p>
            <p className="mt-3" style={{ color: c.textMuted }}>
              $ status
            </p>
            <p className="mt-1" style={{ color: c.accent2 }}>
              étudiant · développeur freelance
            </p>
            <p className="mt-3" style={{ color: c.textMuted }}>
              $ focus
            </p>
            <p className="mt-1" style={{ color: c.accent }}>
              sites web · applications React · PHP/MySQL
            </p>
          </div>
        </div>
      </section>

      {/* ===== Skills ===== */}
      <section id="competences" className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
       <SectionLabel number="02" filename="Compétences" c={c} />
        <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: FONTS.display }}>
          Compétences
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {SKILLS.map((s) => (
            <div key={s.group} className="rounded-lg p-5" style={{ backgroundColor: c.surface, border: `1px solid ${c.border}` }}>
              <div className="flex items-center gap-2 mb-4 text-sm font-semibold" style={{ color: c.accent }}>
                <Code2 size={15} />
                {s.group}
              </div>
              <div>
                {s.items.map((item) => (
                  <Chip key={item} c={c}>
                    {item}
                  </Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Projects ===== */}
      <section id="projets" className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <SectionLabel number="03" filename="Projets" c={c} />
        <div className="flex items-center justify-between mb-8 flex-wrap gap-2">
          <h2 className="text-2xl font-bold" style={{ fontFamily: FONTS.display }}>
            Projets
          </h2>
          <span
            className="text-xs px-2.5 py-1 rounded-md"
            style={{ fontFamily: FONTS.mono, color: c.accent2, border: `1px solid ${c.border}` }}
          >
            exemples à remplacer par vos vrais projets
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <div key={p.name} className="rounded-lg p-5 flex flex-col" style={{ backgroundColor: c.surface, border: `1px solid ${c.border}` }}>
              <div className="flex items-center gap-2 text-xs mb-3" style={{ fontFamily: FONTS.mono, color: c.textMuted }}>
                <ChevronRight size={14} />
                {p.name}
              </div>
              <h3 className="font-semibold mb-2">{p.title}</h3>
              <p className="text-sm mb-4 leading-relaxed flex-1" style={{ color: c.textMuted }}>
                {p.desc}
              </p>
              <div className="mb-1">
                {p.stack.map((t) => (
                  <Chip key={t} c={c}>
                    {t}
                  </Chip>
                ))}
              </div>
              <button className="mt-2 flex items-center gap-1.5 text-sm" style={{ color: c.accent }}>
                Voir le projet <ExternalLink size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section id="contact" className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
       <SectionLabel number="04" filename="Contact" c={c} />
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: FONTS.display }}>
              Travaillons ensemble
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: c.textMuted }}>
              Disponible pour des missions freelance : sites vitrines, applications web, ou
              intégration front-end. Ecrivez-moi ou retrouvez-moi sur les liens ci-dessous.
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a href="mailto:fitiavanaeric29@gmail.com" className="flex items-center gap-3" style={{ color: c.text }}>
                <Mail size={16} style={{ color: c.accent }} />
                fitiavanaeric29@gmail.com
              </a>
              <a href="tel:+261388217211" className="flex items-center gap-3" style={{ color: c.text }}>
                <Phone size={16} style={{ color: c.accent }} />
                +261 82 172 11
              </a>
              <div className="flex items-center gap-3">
                <MapPin size={16} style={{ color: c.accent }} />
                Madagascar
              </div>
              <a href="https://github.com/fitiavanaeric29-" className="flex items-center gap-3" style={{ color: c.text }}>
                <Github size={16} style={{ color: c.accent }} />
                github.com/fitiavanaeric29-ui
              </a>
              <a href="https://linkedin.com/in/votre-profil" className="flex items-center gap-3" style={{ color: c.text }}>
                <Linkedin size={16} style={{ color: c.accent }} />
                linkedin.com/in/votre-profil
              </a>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: c.surface, border: `1px solid ${c.border}` }}>
            <ContactForm c={c} />
          </div>
        </div>
      </section>

      <footer
        className="border-t py-6 text-center text-xs"
        style={{ borderColor: c.border, color: c.textMuted, fontFamily: FONTS.mono }}
      >
        © {new Date().getFullYear()} Rakotomihaja Eric Fitiavana — construit avec React, TypeScript &amp; PHP
      </footer>
    </div>
  );
}
