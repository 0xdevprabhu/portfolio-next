export interface Project {
  id: string;
  title: string;
  category: "company" | "personal" | "tool";
  company?: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface SkillItem {
  name: string;
  icon: string;
  badge?: string;
  level?: number;
}

export interface SkillCategory {
  title: string;
  description?: string;
  skills: SkillItem[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  certificateFile?: string;
  skills?: string[];
  type: "work" | "internship" | "education";
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  fileUrl: string;
  thumbnailUrl: string;
  category: "cloud" | "frontend" | "fullstack" | "ai" | "evaluation";
  verifiedUrl?: string;
}

export interface UtilityTool {
  id: string;
  name: string;
  description: string;
  iconName: string;
  link: string;
  tag: string;
}

export interface ColorTheme {
  id: string;
  name: string;
  primary: string;
  dark: string;
  accent: string;
  glow: string;
}

export interface RadiusTheme {
  id: string;
  name: string;
  values: {
    "--radius-pill": string;
    "--radius-lg": string;
    "--radius-md": string;
    "--radius-sm": string;
  };
}
