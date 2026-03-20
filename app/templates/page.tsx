"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, FileText, Check } from "lucide-react";
import { useCVStore } from "@/lib/store";
import { CVTemplateRenderer } from "@/components/templates";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const templates = [
  {
    id: "minimal" as const,
    name: "Minimal",
    description: "Clean single-column layout. Perfect for any industry. Maximum ATS compatibility.",
    gradient: "from-gray-600 to-gray-800",
    ats: 100,
    features: ["Single column", "Clean typography", "ATS 100"],
  },
  {
    id: "professional" as const,
    name: "Professional",
    description: "Classic corporate style with serif headings. Ideal for finance, law, and consulting.",
    gradient: "from-gray-700 to-gray-900",
    ats: 100,
    features: ["Serif headings", "Corporate style", "ATS 100"],
  },
  {
    id: "executive" as const,
    name: "Executive",
    description: "Elegant minimal design for senior roles. Refined spacing and typography.",
    gradient: "from-slate-600 to-slate-800",
    ats: 100,
    features: ["Elegant layout", "Senior-level", "ATS 100"],
  },
  {
    id: "modern" as const,
    name: "Modern",
    description: "Contemporary single-column with blue accents. Great for tech and engineering.",
    gradient: "from-blue-600 to-blue-800",
    ats: 100,
    features: ["Blue accents", "Tech-focused", "ATS 100"],
  },
  {
    id: "creative" as const,
    name: "Creative",
    description: "Vibrant gradient header bar with clean layout. Stands out while staying ATS-safe.",
    gradient: "from-violet-600 via-purple-600 to-pink-600",
    ats: 100,
    features: ["Gradient header", "Eye-catching", "ATS 100"],
  },
  {
    id: "classic" as const,
    name: "Classic",
    description: "Traditional black and white. Dense, efficient, maximum content in minimum space.",
    gradient: "from-black to-gray-800",
    ats: 100,
    features: ["Dense layout", "Traditional", "ATS 100"],
  },
];

export default function TemplatesPage() {
  const router = useRouter();
  const { resetCurrentCV, updateCurrentCV } = useCVStore();

  const handleUseTemplate = (templateId: typeof templates[number]["id"]) => {
    resetCurrentCV();
    updateCurrentCV({ template: templateId });
    toast.success(`Selected ${templateId} template - Start building!`);
    router.push("/builder");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">CVForge</span>
          </Link>
          <Link href="/builder">
            <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-sm font-medium">
              Create CV
            </Button>
          </Link>
        </div>
      </header>

      {/* Back Link */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>

      <main className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-h1 font-bold text-gray-900 mb-3">
              ATS-Optimized Templates
            </h1>
            <p className="text-body text-gray-600 max-w-2xl mx-auto">
              Every template scores 100 on ATS compatibility. Single-column layouts, 
              standard headings, clean formatting — guaranteed to pass any screening system.
            </p>
          </div>

          {/* ATS Badge */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-green-50 border border-green-200 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-green-800">All Templates: ATS Score 100/100</div>
                <div className="text-xs text-green-600">Single-column • Standard headings • No tables or columns</div>
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="group overflow-hidden hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-500 border-gray-200"
              >
                {/* Preview Area */}
                <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-50 p-4">
                  {/* Template Preview */}
                  <div className="relative h-full transform group-hover:scale-105 transition-transform duration-500">
                    <div className="h-full bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
                      <CVTemplateRenderer
                        data={{
                          name: "Alex Morgan",
                          email: "alex@email.com",
                          phone: "+1 234 567",
                          address: "New York, NY",
                          profileImage: "",
                          summary: "Experienced professional with expertise in building scalable solutions and leading cross-functional teams.",
                          education: [
                            {
                              id: "1",
                              degree: "Computer Science",
                              college: "Stanford University",
                              year: "2018-2022",
                              percentage: "3.9 GPA",
                            },
                          ],
                          experience: [
                            {
                              id: "1",
                              company: "Tech Corp",
                              role: "Senior Engineer",
                              duration: "2022-Present",
                              description: "Led development of microservices\nImproved system performance by 40%",
                            },
                          ],
                          skills: [
                            { name: "React", level: 5 },
                            { name: "TypeScript", level: 4 },
                            { name: "Node.js", level: 4 },
                          ],
                          projects: [
                            {
                              id: "1",
                              title: "E-commerce Platform",
                              description: "Built a full-stack platform serving 10K+ users.",
                              link: "",
                            },
                          ],
                          customSections: [],
                          template: template.id,
                        }}
                      />
                    </div>
                  </div>

                  {/* ATS Score Badge */}
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">
                    ATS {template.ats}
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-gray-900">{template.name}</h3>
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full bg-gradient-to-r ${template.gradient} text-white`}>
                      {template.ats}/100
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {template.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {template.features.map((feature, i) => (
                      <span key={i} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-md font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Button
                    className={`w-full bg-gradient-to-r ${template.gradient} hover:opacity-90 text-white text-sm font-medium shadow-lg`}
                    onClick={() => handleUseTemplate(template.id)}
                  >
                    Use This Template
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-50 rounded-full border border-violet-200">
              <span className="text-sm text-violet-700 font-medium">
                All templates are <strong>100% free</strong> with full ATS optimization
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
