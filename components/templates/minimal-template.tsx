"use client";

import { CVData } from "@/lib/types";
import Image from "next/image";

interface MinimalTemplateProps {
  data: CVData;
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  const achievements = data.customSections.find((s) => s.type === "achievements")?.items || [];
  const certifications = data.customSections.find((s) => s.type === "certifications")?.items || [];
  const languages = data.customSections.find((s) => s.type === "languages")?.items || [];

  return (
    <div className="cv-template bg-white text-black p-8 font-sans">
      <header className="mb-8 border-b border-gray-200 pb-6">
        <div className="flex items-start gap-6">
          {data.profileImage && (
            <Image
              src={data.profileImage}
              alt={data.name}
              width={96}
              height={96}
              unoptimized
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{data.name || "Your Name"}</h1>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
              {data.email && <span>{data.email}</span>}
              {data.phone && <span>{data.phone}</span>}
              {data.address && <span>{data.address}</span>}
            </div>
          </div>
        </div>
      </header>

      {data.summary && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 uppercase tracking-wide">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.college}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <div>{edu.year}</div>
                  {edu.percentage && <div>{edu.percentage}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{exp.role}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-600">{exp.duration}</span>
                </div>
                {exp.description && (
                  <div className="mt-2 text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-medium text-gray-900">{proj.title}</h3>
                <p className="text-gray-700 text-sm mt-1">{proj.description}</p>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                  >
                    {proj.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.name}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {(achievements.length > 0 || certifications.length > 0 || languages.length > 0) && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Additional
          </h2>
          <div className="space-y-3">
            {achievements.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 text-sm">Achievements</h3>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                  {achievements.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 text-sm">Certifications</h3>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                  {certifications.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 text-sm">Languages</h3>
                <p className="text-sm text-gray-700">{languages.join(", ")}</p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
