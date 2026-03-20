"use client";

import { CVData } from "@/lib/types";

interface ModernTemplateProps {
  data: CVData;
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const achievements = data.customSections.find((s) => s.type === "achievements")?.items || [];
  const certifications = data.customSections.find((s) => s.type === "certifications")?.items || [];
  const languages = data.customSections.find((s) => s.type === "languages")?.items || [];

  return (
    <div className="cv-template bg-white text-gray-800 p-8 font-sans">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">{data.name || "Your Name"}</h1>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.address && <span>{data.address}</span>}
        </div>
        <div className="mt-3 h-1 w-16 bg-blue-600 rounded" />
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">
            Experience
          </h2>
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                  <span className="text-xs text-gray-400">{exp.duration}</span>
                </div>
                <p className="text-sm text-blue-600">{exp.company}</p>
                {exp.description && (
                  <ul className="mt-2 space-y-1">
                    {exp.description.split("\n").filter(Boolean).map((line, i) => (
                      <li key={i} className="text-sm text-gray-600 leading-relaxed flex">
                        <span className="mr-2 text-blue-300">•</span>
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
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                  <p className="text-sm text-gray-500">{edu.college}</p>
                </div>
                <div className="text-right text-xs text-gray-400">
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
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.name}
                className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">
            Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-medium text-gray-900">{proj.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{proj.description}</p>
                {proj.link && (
                  <p className="text-xs text-blue-500 mt-1">{proj.link}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Additional */}
      {(achievements.length > 0 || certifications.length > 0 || languages.length > 0) && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">
            Additional
          </h2>
          <div className="space-y-2 text-sm text-gray-600">
            {achievements.length > 0 && (
              <div>
                <span className="font-medium text-gray-900">Achievements:</span> {achievements.join("; ")}
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <span className="font-medium text-gray-900">Certifications:</span> {certifications.join("; ")}
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <span className="font-medium text-gray-900">Languages:</span> {languages.join(", ")}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
