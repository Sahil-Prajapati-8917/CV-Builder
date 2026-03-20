import { MinimalTemplate } from "./minimal-template";
import { ModernTemplate } from "./modern-template";
import { CreativeTemplate } from "./creative-template";
import { ProfessionalTemplate } from "./professional-template";
import { ExecutiveTemplate } from "./executive-template";
import { ClassicTemplate } from "./classic-template";
import { CVData } from "@/lib/types";

interface CVTemplateRendererProps {
  data: CVData;
}

export function CVTemplateRenderer({ data }: CVTemplateRendererProps) {
  switch (data.template) {
    case "modern":
      return <ModernTemplate data={data} />;
    case "creative":
      return <CreativeTemplate data={data} />;
    case "professional":
      return <ProfessionalTemplate data={data} />;
    case "executive":
      return <ExecutiveTemplate data={data} />;
    case "classic":
      return <ClassicTemplate data={data} />;
    case "minimal":
    default:
      return <MinimalTemplate data={data} />;
  }
}

export {
  MinimalTemplate,
  ModernTemplate,
  CreativeTemplate,
  ProfessionalTemplate,
  ExecutiveTemplate,
  ClassicTemplate,
};
