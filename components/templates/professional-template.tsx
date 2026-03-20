"use client";

import { CVData } from "@/lib/types";

interface ProfessionalTemplateProps {
  data: CVData;
}

export function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  const achievements = data.customSections.find((s) => s.type === "achievements")?.items || [];
  const certifications = data.customSections.find((s) => s.type === "certifications")?.items || [];
  const languages = data.customSections.find((s) => s.type === "languages")?.items || [];

  return (
    <div className="cv-template bg-white text-gray-900 p-10 max-w-[800px] mx-auto font-serif">
      {/* Header */}
      <header className="text-center mb-8 pb-6 border-b-2 border-gray-800">
        <h1 className="text-3xl font-bold tracking-wide uppercase text-gray-900">
          {data.name || "Your Name"}
        </h1>
        <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-gray-600">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.address && <span>{data.address}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-3">
            Experience
          </h2>
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{exp.role}</h3>
                  <span className="text-sm text-gray-500">{exp.duration}</span>
                </div>
                <p className="text-sm text-gray-600 italic">{exp.company}</p>
                {exp.description && (
                  <ul className="mt-2 space-y-1">
                    {exp.description.split("\n").filter(Boolean).map((line, i) => (
                      <li key={i} className="text-sm text-gray-700 leading-relaxed flex">
                        <span className="mr-2">•</span>
                        <span>{line.replace(/^[•\-\*]\s*/, "")}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-sm text-gray-600">{edu.college}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div>{edu.year}</div>
                  {edu.percentage && <div>{edu.percentage}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-3">
            Skills
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {data.skills.map((s) => s.name).join(" • ")}
          </p>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-3">
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-bold text-gray-900">{proj.title}</h3>
                <p className="text-sm text-gray-700 mt-1">{proj.description}</p>
                {proj.link && (
                  <p className="text-sm text-gray-500 mt-1">{proj.link}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Additional */}
      {(achievements.length > 0 || certifications.length > 0 || languages.length > 0) && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-3">
            Additional Information
          </h2>
          <div className="space-y-2 text-sm text-gray-700">
            {achievements.length > 0 && (
              <div>
                <span className="font-bold">Achievements:</span> {achievements.join("; ")}
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <span className="font-bold">Certifications:</span> {certifications.join("; ")}
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <span className="font-bold">Languages:</span> {languages.join(", ")}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
