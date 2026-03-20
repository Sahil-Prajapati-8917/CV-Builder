import { z } from "zod";

export const basicInfoSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address").or(z.string().length(0)),
  phone: z.string().max(20, "Phone number is too long"),
  address: z.string().max(200, "Address is too long"),
});

export const summarySchema = z.object({
  summary: z.string().max(1000, "Summary is too long (max 1000 characters)"),
});

export const educationSchema = z.object({
  education: z.array(
    z.object({
      degree: z.string().min(1, "Degree is required"),
      college: z.string().min(1, "College is required"),
      year: z.string().min(1, "Year is required"),
      percentage: z.string(),
    })
  ),
});

export const experienceSchema = z.object({
  experience: z.array(
    z.object({
      company: z.string().min(1, "Company is required"),
      role: z.string().min(1, "Role is required"),
      duration: z.string().min(1, "Duration is required"),
      description: z.string(),
    })
  ),
});

export const projectsSchema = z.object({
  projects: z.array(
    z.object({
      title: z.string().min(1, "Project title is required"),
      description: z.string(),
      link: z.string().url("Invalid URL").or(z.string().length(0)),
    })
  ),
});

export const stepSchemas = {
  1: basicInfoSchema,
  2: summarySchema,
  3: educationSchema,
  4: experienceSchema,
  5: z.object({}),
  6: projectsSchema,
  7: z.object({}),
} as const;

export type StepNumber = keyof typeof stepSchemas;

export function validateStep(step: number, data: Record<string, unknown>): Record<string, string> {
  const schema = stepSchemas[step as StepNumber];
  if (!schema) return {};

  const result = schema.safeParse(data);
  if (result.success) return {};

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const path = issue.path.join(".");
    if (!errors[path]) {
      errors[path] = issue.message;
    }
  }
  return errors;
}
