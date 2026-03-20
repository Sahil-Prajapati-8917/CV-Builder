"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Check, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-[#09090b]">
      {/* Header */}
      <header className="glass-dark sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <FileText className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">CVForge</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors duration-300">
              Dashboard
            </Link>
            <Link href="/builder">
              <Button className="bg-white text-zinc-900 hover:bg-zinc-100 text-sm font-semibold px-5 h-9 rounded-lg shadow-lg shadow-white/10">
                Create CV
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Back Link */}
      <div className="border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>

      <main className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400 mb-4 block">Templates</span>
            <h1 className="text-h1 font-bold text-white mb-4">
              ATS-Optimized Templates
            </h1>
            <p className="text-body text-zinc-400 max-w-2xl mx-auto">
              Every template scores 100 on ATS compatibility. Single-column layouts,
              standard headings, clean formatting — guaranteed to pass any screening system.
            </p>
          </div>

          {/* ATS Badge */}
          <div className="flex justify-center mb-14">
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-green-500/10 border border-green-500/20 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-green-400">All Templates: ATS Score 100/100</div>
                <div className="text-xs text-green-500/70">Single-column • Standard headings • No tables or columns</div>
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="group rounded-2xl overflow-hidden border border-zinc-800/50 hover:border-violet-500/30 card-luxury bg-zinc-900/30"
              >
                {/* Preview Area */}
                <div className="relative aspect-[3/4] bg-zinc-950 p-4">
                  <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient} opacity-5`} />
                  <div className="relative h-full transform group-hover:scale-[1.03] transition-transform duration-500">
                    <div className="h-full bg-white rounded-xl shadow-2xl shadow-black/50 overflow-hidden">
                      <CVTemplateRenderer
                        data={{
                          name: "Alex Morgan",
                          email: "alex@email.com",
                          phone: "+1 234 567",
                          address: "New York, NY",
                          profileImage: "",
                          summary: "Experienced professional with expertise in building scalable solutions and leading cross-functional teams.",
                          education: [
                            { id: "1", degree: "Computer Science", college: "Stanford University", year: "2018-2022", percentage: "3.9 GPA" },
                          ],
                          experience: [
                            { id: "1", company: "Tech Corp", role: "Senior Engineer", duration: "2022-Present", description: "Led development of microservices\nImproved system performance by 40%" },
                          ],
                          skills: [
                            { name: "React", level: 5 },
                            { name: "TypeScript", level: 4 },
                            { name: "Node.js", level: 4 },
                          ],
                          projects: [
                            { id: "1", title: "E-commerce Platform", description: "Built a full-stack platform serving 10K+ users.", link: "" },
                          ],
                          customSections: [],
                          template: template.id,
                        }}
                      />
                    </div>
                  </div>

                  {/* ATS Badge */}
                  <div className="absolute top-3 right-3 bg-green-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10 backdrop-blur-sm">
                    ATS {template.ats}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-white">{template.name}</h3>
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                      {template.ats}/100
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 mb-4 leading-relaxed">
                    {template.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {template.features.map((feature, i) => (
                      <span key={i} className="px-2 py-0.5 text-xs bg-white/5 text-zinc-400 rounded-md font-medium border border-zinc-800/50">
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
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-500/10 rounded-full border border-violet-500/20">
              <span className="text-sm text-violet-400 font-medium">
                All templates are <strong className="text-white">100% free</strong> with full ATS optimization
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
