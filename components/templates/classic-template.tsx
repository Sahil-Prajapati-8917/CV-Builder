"use client";

import { CVData } from "@/lib/types";

interface ClassicTemplateProps {
  data: CVData;
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  const achievements = data.customSections.find((s) => s.type === "achievements")?.items || [];
  const certifications = data.customSections.find((s) => s.type === "certifications")?.items || [];
  const languages = data.customSections.find((s) => s.type === "languages")?.items || [];

  return (
    <div className="cv-template bg-white text-black p-8 max-w-[800px] mx-auto font-sans text-[11px] leading-relaxed">
      {/* Header */}
      <header className="text-center mb-4">
        <h1 className="text-xl font-bold uppercase tracking-wider">
          {data.name || "Your Name"}
        </h1>
        <div className="mt-1 text-[10px] text-gray-600">
          {[data.email, data.phone, data.address].filter(Boolean).join(" | ")}
        </div>
        <div className="mt-2 border-t-2 border-black" />
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-3">
          <h2 className="font-bold uppercase text-[10px] tracking-widest mb-1">
            Summary
          </h2>
          <p>{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-3">
          <h2 className="font-bold uppercase text-[10px] tracking-widest mb-1">
            Experience
          </h2>
          <div className="space-y-2">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <span className="font-bold">{exp.role}</span>
                  <span>{exp.duration}</span>
                </div>
                <div className="italic text-gray-700">{exp.company}</div>
                {exp.description && (
                  <div className="mt-1">
                    {exp.description.split("\n").filter(Boolean).map((line, i) => (
                      <div key={i} className="flex">
                        <span className="mr-1">•</span>
                        <span>{line.replace(/^[•\-\*]\s*/, "")}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-3">
          <h2 className="font-bold uppercase text-[10px] tracking-widest mb-1">
            Education
          </h2>
          <div className="space-y-1">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <span className="font-bold">{edu.degree}</span>
                  {edu.college && <span>, {edu.college}</span>}
                </div>
                <div>
                  {edu.year}{edu.percentage && ` — ${edu.percentage}`}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-3">
          <h2 className="font-bold uppercase text-[10px] tracking-widest mb-1">
            Skills
          </h2>
          <p>{data.skills.map((s) => s.name).join(", ")}</p>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-3">
          <h2 className="font-bold uppercase text-[10px] tracking-widest mb-1">
            Projects
          </h2>
          <div className="space-y-1">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <span className="font-bold">{proj.title}</span>
                {proj.description && <span> — {proj.description}</span>}
                {proj.link && <div className="text-gray-500">{proj.link}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Additional */}
      {(achievements.length > 0 || certifications.length > 0 || languages.length > 0) && (
        <section>
          <h2 className="font-bold uppercase text-[10px] tracking-widest mb-1">
            Additional
          </h2>
          <div className="space-y-1">
            {achievements.length > 0 && (
              <div><span className="font-bold">Achievements:</span> {achievements.join("; ")}</div>
            )}
            {certifications.length > 0 && (
              <div><span className="font-bold">Certifications:</span> {certifications.join("; ")}</div>
            )}
            {languages.length > 0 && (
              <div><span className="font-bold">Languages:</span> {languages.join(", ")}</div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
