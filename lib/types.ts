export interface Education {
  id: string;
  degree: string;
  college: string;
  year: string;
  percentage: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
}

export interface CustomSection {
  id: string;
  type: "achievements" | "certifications" | "languages";
  items: string[];
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface CVData {
  id?: string;
  slug?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: SkillItem[];
  projects: Project[];
  customSections: CustomSection[];
  template: "minimal" | "modern" | "creative" | "professional" | "executive" | "classic";
  createdAt?: string;
  updatedAt?: string;
}

export const defaultCVData: CVData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  profileImage: "",
  summary: "",
  education: [],
  experience: [],
  skills: [],
  projects: [],
  customSections: [],
  template: "minimal",
};

export const STEPS = [
  { id: 1, name: "Basic Info" },
  { id: 2, name: "Summary" },
  { id: 3, name: "Education" },
  { id: 4, name: "Experience" },
  { id: 5, name: "Skills" },
  { id: 6, name: "Projects" },
  { id: 7, name: "Custom" },
] as const;

export type StepName = (typeof STEPS)[number]["name"];
