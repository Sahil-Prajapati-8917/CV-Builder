"use client";

import { useCVStore } from "@/lib/store";
import { STEPS } from "@/lib/types";
import {
  ChevronLeft, ChevronRight, Save, Download, Share2, FileText, Eye,
  User, FileSignature, GraduationCap, Briefcase, Wrench, FolderOpen, Sparkles,
  Printer, ZoomIn, ZoomOut, PanelLeftClose, PanelLeft, Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BasicInfoStep, SummaryStep, EducationStep, ExperienceStep,
  SkillsStep, ProjectsStep, CustomStep,
} from "@/components/form";
import { CVTemplateRenderer } from "@/components/templates";
import { ThemeToggle } from "@/components/theme-toggle";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { validateStep } from "@/lib/validation";

const stepIcons = [User, FileSignature, GraduationCap, Briefcase, Wrench, FolderOpen, Sparkles] as const;

const stepDescriptions = [
  "Your name, contact details, and photo",
  "A brief overview of your professional background",
  "Your academic qualifications and certifications",
  "Your work history and key responsibilities",
  "Technical and professional abilities",
  "Notable projects you've contributed to",
  "Achievements, certifications, and languages",
];

const paperSizes: Record<string, { label: string; w: number; h: number; ratio: string }> = {
  a4: { label: "A4", w: 210, h: 297, ratio: "aspect-[210/297]" },
  letter: { label: "Letter", w: 215.9, h: 279.4, ratio: "aspect-[2159/2794]" },
  legal: { label: "Legal", w: 215.9, h: 355.6, ratio: "aspect-[2159/3556]" },
};

export default function BuilderPage() {
  const router = useRouter();
  const { currentCV, currentStep, setCurrentStep, nextStep, prevStep, updateCurrentCV, saveCV } = useCVStore();
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [zoom, setZoom] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [paperSize, setPaperSize] = useState("a4");
  const [showSizeMenu, setShowSizeMenu] = useState(false);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const validateCurrentStep = (): boolean => {
    const stepErrors = validateStep(currentStep, currentCV as unknown as Record<string, unknown>);
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => { if (validateCurrentStep()) nextStep(); else toast.error("Please fix the errors before continuing"); };
  const handleSave = () => {
    if (!validateCurrentStep()) { toast.error("Please fix the errors before saving"); return; }
    setIsSaving(true); saveCV(); toast.success("CV saved successfully!"); setIsSaving(false); router.push("/dashboard");
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    const element = document.getElementById("cv-preview");
    if (!element) { toast.error("Preview not found"); setIsExporting(false); return; }
    try {
      const size = paperSizes[paperSize];
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", [size.w, size.h]);
      pdf.addImage(imgData, "PNG", 0, 0, size.w, size.h);
      pdf.save(`${currentCV.name || "cv"}.pdf`);
      toast.success(`PDF downloaded (${size.label})!`);
    } catch { toast.error("Failed to export PDF"); }
    setIsExporting(false);
  };

  const handleShare = async () => {
    if (!currentCV.name) { toast.error("Please enter your name first"); return; }
    saveCV(); const shareUrl = `${window.location.origin}/cv/${currentCV.slug}`;
    await navigator.clipboard.writeText(shareUrl); toast.success("Share link copied!"); router.push("/dashboard");
  };

  const handlePrint = () => window.print();

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <BasicInfoStep />;
      case 2: return <SummaryStep />;
      case 3: return <EducationStep />;
      case 4: return <ExperienceStep />;
      case 5: return <SkillsStep />;
      case 6: return <ProjectsStep />;
      case 7: return <CustomStep />;
      default: return <BasicInfoStep />;
    }
  };

  const templates = [
    { id: "minimal", name: "Minimal", color: "bg-gray-600" },
    { id: "modern", name: "Modern", color: "bg-blue-600" },
    { id: "creative", name: "Creative", color: "bg-gradient-to-r from-violet-600 to-pink-600" },
    { id: "professional", name: "Professional", color: "bg-gray-700" },
    { id: "executive", name: "Executive", color: "bg-slate-600" },
    { id: "classic", name: "Classic", color: "bg-zinc-800" },
  ] as const;

  const progressPercent = Math.round((currentStep / STEPS.length) * 100);
  const currentPaper = paperSizes[paperSize];

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-[#09090b]">
      {/* Header */}
      <header className="bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-2xl border-b border-gray-200 dark:border-white/[0.06] px-4 py-2.5 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] items-center justify-center text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/5 transition-all">
            {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
          </button>
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-sm text-gray-900 dark:text-white hidden sm:block">CVForge</span>
          </Link>
          <div className="w-px h-6 bg-gray-200 dark:bg-zinc-800 hidden md:block" />
          <div className="hidden md:flex items-center gap-0.5 bg-gray-100 dark:bg-white/[0.03] p-1 rounded-lg border border-gray-200 dark:border-white/[0.06]">
            {templates.map((t) => (
              <button key={t.id} onClick={() => updateCurrentCV({ template: t.id })}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all duration-300 ${
                  currentCV.template === t.id ? `text-white shadow-sm ${t.color}` : "text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-300 hover:bg-gray-200 dark:hover:bg-white/5"
                }`}>
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button variant="ghost" size="sm" onClick={handleShare} disabled={isSaving}
            className="hidden sm:flex text-[11px] text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 h-8 px-3">
            <Share2 className="h-3.5 w-3.5 mr-1" /> Share
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPDF} disabled={isExporting}
            className="text-[11px] h-8 px-3 border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 hover:border-gray-300 dark:hover:border-zinc-600">
            <Download className="h-3.5 w-3.5 mr-1" /> {isExporting ? "..." : `PDF (${currentPaper.label})`}
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isSaving}
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-[11px] font-semibold h-8 px-4 shadow-lg shadow-violet-600/25">
            <Save className="h-3.5 w-3.5 mr-1" /> {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className={`hidden lg:flex flex-col border-r border-gray-200 dark:border-zinc-800/50 bg-white dark:bg-[#09090b] shrink-0 transition-all duration-300 overflow-hidden ${sidebarOpen ? "w-56" : "w-0 border-r-0"}`}>
          <div className="p-4 flex-1 overflow-y-auto min-w-[224px]">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-violet-500 dark:text-violet-400 tracking-wider uppercase">Progress</span>
                <span className="text-[10px] font-semibold text-gray-400 dark:text-zinc-500">{progressPercent}%</span>
              </div>
              <div className="h-1 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-600 to-purple-500 rounded-full transition-all duration-700 shadow-lg shadow-violet-600/50" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              {STEPS.map((step) => {
                const Icon = stepIcons[step.id - 1];
                const isActive = step.id === currentStep;
                const isDone = step.id < currentStep;
                return (
                  <button key={step.id} onClick={() => setCurrentStep(step.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-300 group ${
                      isActive ? "bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20" : "hover:bg-gray-50 dark:hover:bg-white/[0.03] border border-transparent"
                    }`}>
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                        : isDone ? "bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400"
                        : "bg-gray-100 dark:bg-zinc-800/80 text-gray-400 dark:text-zinc-600 group-hover:text-gray-600 dark:group-hover:text-zinc-400"
                    }`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className={`text-xs font-medium truncate ${isActive ? "text-gray-900 dark:text-white" : isDone ? "text-violet-700 dark:text-violet-300" : "text-gray-500 dark:text-zinc-500 group-hover:text-gray-700 dark:group-hover:text-zinc-300"}`}>
                        {step.name}
                      </div>
                      <div className={`text-[10px] truncate mt-0.5 ${isActive ? "text-gray-500 dark:text-zinc-400" : "text-gray-400 dark:text-zinc-700"}`}>
                        {stepDescriptions[step.id - 1]}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-zinc-800/50 space-y-2 min-w-[224px]">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}
              className="w-full gap-1.5 text-[11px] font-medium border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 hover:border-gray-300 dark:hover:border-zinc-600 h-9">
              <ChevronLeft className="h-3.5 w-3.5" /> Previous
            </Button>
            {currentStep < 7 ? (
              <Button onClick={handleNext} className="w-full gap-1.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-[11px] font-semibold h-9 shadow-lg shadow-violet-600/25">
                Next Step <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            ) : (
              <Button onClick={handleSave} className="w-full gap-1.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-[11px] font-semibold h-9 shadow-lg shadow-violet-600/25">
                <Save className="h-3.5 w-3.5" /> Finish & Save
              </Button>
            )}
          </div>
        </aside>

        {/* Form Panel */}
        <div className={`${showMobilePreview ? "hidden lg:flex" : "flex"} flex-1 flex-col overflow-hidden lg:w-auto w-full`}>
          <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#09090b]">
            <div className="max-w-2xl mx-auto px-6 py-8">
              <div className="lg:hidden mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-violet-500">Step {currentStep}</span>
                    <span className="text-gray-300 dark:text-zinc-700">•</span>
                    <span className="text-xs text-gray-500 dark:text-zinc-500">{STEPS[currentStep - 1].name}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 dark:text-zinc-600">{progressPercent}%</span>
                </div>
                <div className="flex gap-1">
                  {STEPS.map((s) => (
                    <button key={s.id} onClick={() => setCurrentStep(s.id)}
                      className={`flex-1 h-1 rounded-full transition-all duration-500 ${s.id < currentStep ? "bg-violet-500" : s.id === currentStep ? "bg-violet-600" : "bg-gray-200 dark:bg-zinc-800"}`} />
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-200 dark:border-violet-500/20 flex items-center justify-center">
                    {(() => { const Icon = stepIcons[currentStep - 1]; return <Icon className="h-5 w-5 text-violet-500 dark:text-violet-400" />; })()}
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-gray-900 dark:text-white">{STEPS[currentStep - 1].name}</h1>
                    <p className="text-xs text-gray-500 dark:text-zinc-500">{stepDescriptions[currentStep - 1]}</p>
                  </div>
                </div>
              </div>

              {Object.keys(errors).length > 0 && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-red-500 dark:text-red-400 text-xs font-bold">!</span>
                  </div>
                  <div className="space-y-1">
                    {Object.entries(errors).map(([key, msg]) => (
                      <p key={key} className="text-xs text-red-600 dark:text-red-400">{msg}</p>
                    ))}
                  </div>
                </div>
              )}

              <div className="animate-in">{renderStep()}</div>

              <div className="lg:hidden flex justify-between items-center mt-10 pt-6 border-t border-gray-200 dark:border-zinc-800/50">
                <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}
                  className="gap-1.5 text-sm font-medium border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5">
                  <ChevronLeft className="h-4 w-4" /> Previous
                </Button>
                {currentStep < 7 ? (
                  <Button onClick={handleNext} className="gap-1.5 bg-gradient-to-r from-violet-600 to-purple-600 text-sm font-semibold shadow-lg shadow-violet-600/25">
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSave} className="gap-1.5 bg-gradient-to-r from-violet-600 to-purple-600 text-sm font-semibold shadow-lg shadow-violet-600/25">
                    <Save className="h-4 w-4" /> Finish
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className={`${showMobilePreview ? "flex" : "hidden"} lg:flex flex-col w-full lg:w-[55%] bg-gray-100 dark:bg-zinc-950 border-l border-gray-200 dark:border-zinc-800/50`}>
          <div className="px-4 py-2.5 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-2xl border-b border-gray-200 dark:border-zinc-800/50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-gray-600 dark:text-zinc-400">Live Preview</span>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setZoom(z => Math.max(0.4, z - 0.1))} className="w-7 h-7 rounded-md bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-all">
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="text-[10px] text-gray-500 dark:text-zinc-500 w-10 text-center font-mono">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(z => Math.min(1.5, z + 0.1))} className="w-7 h-7 rounded-md bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-all">
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => setZoom(1)} className="w-7 h-7 rounded-md bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-all">
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
              <div className="w-px h-4 bg-gray-200 dark:bg-zinc-800 mx-1" />
              <div className="relative">
                <button onClick={() => setShowSizeMenu(!showSizeMenu)}
                  className="h-7 px-2 rounded-md bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 flex items-center gap-1 text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-all text-[10px] font-medium">
                  {currentPaper.label} <ChevronRight className="h-3 w-3 rotate-90" />
                </button>
                {showSizeMenu && (
                  <div className="absolute top-full right-0 mt-1 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-2xl overflow-hidden z-50 min-w-[100px]">
                    {Object.entries(paperSizes).map(([key, size]) => (
                      <button key={key} onClick={() => { setPaperSize(key); setShowSizeMenu(false); }}
                        className={`w-full px-3 py-2 text-left text-[11px] hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-all flex items-center justify-between ${paperSize === key ? "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/5" : "text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white"}`}>
                        <span>{size.label}</span>
                        <span className="text-[9px] text-gray-400 dark:text-zinc-600">{size.w}x{size.h}mm</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-px h-4 bg-gray-200 dark:bg-zinc-800 mx-1" />
              <button onClick={handlePrint} className="w-7 h-7 rounded-md bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-all">
                <Printer className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => setShowMobilePreview(false)} className="lg:hidden w-7 h-7 rounded-md bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-all ml-1">
                <Eye className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div ref={previewContainerRef} className="flex-1 overflow-auto p-6 flex justify-center" onClick={() => setShowSizeMenu(false)}>
            <div style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
              className={`shadow-2xl rounded-lg overflow-hidden bg-white shadow-black/20 dark:shadow-black/50 ring-1 ring-gray-200 dark:ring-white/5 transition-all duration-300 w-[500px] ${currentPaper.ratio}`}>
              <div id="cv-preview" className="w-full h-full overflow-hidden">
                <CVTemplateRenderer data={currentCV} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Preview Toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button onClick={() => setShowMobilePreview(!showMobilePreview)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 flex items-center justify-center shadow-2xl shadow-violet-600/40 text-white transition-all duration-300 hover:scale-110">
          <Eye className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
