import { ColorTheme, RadiusTheme } from "@/types";

export const curatedThemes: ColorTheme[] = [
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    primary: "#0284c7",
    dark: "#075985",
    accent: "#38bdf8",
    glow: "rgba(2, 132, 199, 0.4)",
  },
  {
    id: "royal-purple",
    name: "Royal Purple",
    primary: "#7e22ce",
    dark: "#5b21b6",
    accent: "#a855f7",
    glow: "rgba(126, 34, 206, 0.4)",
  },
  {
    id: "emerald-green",
    name: "Emerald Green",
    primary: "#059669",
    dark: "#065f46",
    accent: "#34d399",
    glow: "rgba(5, 150, 105, 0.4)",
  },
  {
    id: "sunset-orange",
    name: "Sunset Orange",
    primary: "#ea580c",
    dark: "#9a3412",
    accent: "#fb923c",
    glow: "rgba(234, 88, 12, 0.4)",
  },
  {
    id: "rose-pink",
    name: "Rose Pink",
    primary: "#e11d48",
    dark: "#9f1239",
    accent: "#fb7185",
    glow: "rgba(225, 29, 72, 0.4)",
  },
  {
    id: "midnight",
    name: "Midnight Indigo",
    primary: "#4f46e5",
    dark: "#3730a3",
    accent: "#818cf8",
    glow: "rgba(79, 70, 229, 0.4)",
  },
  {
    id: "monochrome",
    name: "Monochrome Slate",
    primary: "#475569",
    dark: "#1e293b",
    accent: "#94a3b8",
    glow: "rgba(71, 85, 105, 0.4)",
  },
  {
    id: "cyber-teal",
    name: "Cyber Neon",
    primary: "#0d9488",
    dark: "#115e59",
    accent: "#2dd4bf",
    glow: "rgba(13, 148, 136, 0.4)",
  },
];

export const radiusPresets: RadiusTheme[] = [
  {
    id: "sharp",
    name: "Sharp",
    values: {
      "--radius-pill": "0px",
      "--radius-lg": "0px",
      "--radius-md": "0px",
      "--radius-sm": "0px",
    },
  },
  {
    id: "soft",
    name: "Soft",
    values: {
      "--radius-pill": "8px",
      "--radius-lg": "8px",
      "--radius-md": "6px",
      "--radius-sm": "4px",
    },
  },
  {
    id: "rounded",
    name: "Rounded",
    values: {
      "--radius-pill": "9999px",
      "--radius-lg": "24px",
      "--radius-md": "16px",
      "--radius-sm": "8px",
    },
  },
  {
    id: "curved",
    name: "Curved",
    values: {
      "--radius-pill": "9999px",
      "--radius-lg": "40px",
      "--radius-md": "25px",
      "--radius-sm": "12px",
    },
  },
];

export const fullColorSwatches = [
  // Blues & Cyans
  { id: "blue-1", p: "#2563eb", d: "#1e40af", a: "#60a5fa" },
  { id: "blue-2", p: "#3b82f6", d: "#1d4ed8", a: "#93c5fd" },
  { id: "cyan-1", p: "#06b6d4", d: "#0e7490", a: "#67e8f9" },
  { id: "cyan-2", p: "#0891b2", d: "#155e75", a: "#22d3ee" },
  { id: "sky-1", p: "#0ea5e9", d: "#0369a1", a: "#7dd3fc" },
  { id: "indigo-1", p: "#4f46e5", d: "#3730a3", a: "#818cf8" },
  { id: "indigo-2", p: "#6366f1", d: "#4338ca", a: "#a5b4fc" },
  { id: "ocean", p: "#0284c7", d: "#075985", a: "#38bdf8" },
  { id: "azure", p: "#007fff", d: "#0059b3", a: "#4da6ff" },
  { id: "navy", p: "#1e3a8a", d: "#172554", a: "#60a5fa" },

  // Purples & Pinks
  { id: "purple-1", p: "#7e22ce", d: "#5b21b6", a: "#a855f7" },
  { id: "purple-2", p: "#9333ea", d: "#6b21a8", a: "#c084fc" },
  { id: "fuchsia-1", p: "#c026d3", d: "#86198f", a: "#e879f9" },
  { id: "fuchsia-2", p: "#d946ef", d: "#a21caf", a: "#f0abfc" },
  { id: "pink-1", p: "#db2777", d: "#9d174d", a: "#f472b6" },
  { id: "pink-2", p: "#ec4899", d: "#be185d", a: "#f9a8d4" },
  { id: "rose-1", p: "#e11d48", d: "#9f1239", a: "#fb7185" },
  { id: "plum", p: "#86198f", d: "#701a75", a: "#d946ef" },
  { id: "lavender", p: "#7c3aed", d: "#5b21b6", a: "#a78bfa" },

  // Reds & Oranges
  { id: "red-1", p: "#dc2626", d: "#991b1b", a: "#f87171" },
  { id: "red-2", p: "#ef4444", d: "#b91c1c", a: "#fca5a5" },
  { id: "orange-1", p: "#ea580c", d: "#9a3412", a: "#fb923c" },
  { id: "orange-2", p: "#f97316", d: "#c2410c", a: "#fdba74" },
  { id: "amber-1", p: "#d97706", d: "#92400e", a: "#fcd34d" },
  { id: "amber-2", p: "#f59e0b", d: "#b45309", a: "#fde68a" },
  { id: "crimson", p: "#b91c1c", d: "#7f1d1d", a: "#f87171" },
  { id: "firebrick", p: "#991b1b", d: "#450a0a", a: "#ef4444" },

  // Greens & Teals
  { id: "emerald-1", p: "#059669", d: "#065f46", a: "#34d399" },
  { id: "emerald-2", p: "#10b981", d: "#047857", a: "#6ee7b7" },
  { id: "teal-1", p: "#0d9488", d: "#115e59", a: "#2dd4bf" },
  { id: "teal-2", p: "#14b8a6", d: "#0f766e", a: "#5eead4" },
  { id: "green-1", p: "#16a34a", d: "#14532d", a: "#4ade80" },
  { id: "green-2", p: "#22c55e", d: "#166534", a: "#86efac" },
  { id: "lime-1", p: "#65a30d", d: "#3f6212", a: "#a3e635" },
  { id: "mint", p: "#059669", d: "#064e3b", a: "#6ee7b7" },
  { id: "forest", p: "#15803d", d: "#14532d", a: "#4ade80" },

  // Neutrals & Unique
  { id: "slate", p: "#475569", d: "#1e293b", a: "#94a3b8" },
  { id: "zinc", p: "#52525b", d: "#27272a", a: "#a1a1aa" },
  { id: "stone", p: "#57534e", d: "#292524", a: "#a8a29e" },
  { id: "gold", p: "#d97706", d: "#b45309", a: "#fef08a" },
  { id: "cyber", p: "#0d9488", d: "#042f2e", a: "#5eead4" },
];
