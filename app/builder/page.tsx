"use client";

import { useCVStore } from "@/lib/store";
import { STEPS } from "@/lib/types";
import { ChevronLeft, ChevronRight, Save, Download, Share2, FileText, Eye, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BasicInfoStep,
  SummaryStep,
  EducationStep,
  ExperienceStep,
  SkillsStep,
  ProjectsStep,
  CustomStep,
} from "@/components/form";
import { CVPreview } from "@/components/preview/cv-preview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useTheme } from "@/lib/theme-provider";
import { validateStep } from "@/lib/validation";

export default function BuilderPage() {
  const router = useRouter();
  const { currentCV, currentStep, setCurrentStep, nextStep, prevStep, updateCurrentCV, saveCV } =
    useCVStore();
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { isDark, toggle } = useTheme();

  const validateCurrentStep = (): boolean => {
    const stepErrors = validateStep(currentStep, currentCV as unknown as Record<string, unknown>);
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      nextStep();
    } else {
      toast.error("Please fix the errors before continuing");
    }
  };

  const handleSave = async () => {
    if (!validateCurrentStep()) {
      toast.error("Please fix the errors before saving");
      return;
    }
    setIsSaving(true);
    saveCV();
    toast.success("CV saved successfully!");
    setIsSaving(false);
    router.push("/dashboard");
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    const element = document.getElementById("cv-preview");
    if (!element) {
      toast.error("Preview not found");
      setIsExporting(false);
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${currentCV.name || "cv"}.pdf`);
      toast.success("PDF downloaded successfully!");
    } catch {
      toast.error("Failed to export PDF");
    }
    setIsExporting(false);
  };

  const handleShare = async () => {
    if (!currentCV.name) {
      toast.error("Please enter your name first");
      return;
    }
    saveCV();
    const shareUrl = `${window.location.origin}/cv/${currentCV.slug}`;
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Share link copied to clipboard!");
    router.push("/dashboard");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep />;
      case 2:
        return <SummaryStep />;
      case 3:
        return <EducationStep />;
      case 4:
        return <ExperienceStep />;
      case 5:
        return <SkillsStep />;
      case 6:
        return <ProjectsStep />;
      case 7:
        return <CustomStep />;
      default:
        return <BasicInfoStep />;
    }
  };

  const templates = [
    { id: "minimal", name: "Minimal", color: "bg-gray-800" },
    { id: "modern", name: "Modern", color: "bg-blue-600" },
    { id: "creative", name: "Creative", color: "bg-gradient-to-r from-violet-600 to-pink-600" },
    { id: "professional", name: "Professional", color: "bg-gray-700" },
    { id: "executive", name: "Executive", color: "bg-slate-700" },
    { id: "classic", name: "Classic", color: "bg-black" },
  ] as const;

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-5">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-base hidden sm:block text-gray-900 dark:text-white">CVForge</span>
          </Link>
          
          {/* Template Selector */}
          <div className="hidden md:flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => updateCurrentCV({ template: t.id })}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  currentCV.template === t.id
                    ? `text-white shadow-sm ${t.color}`
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="hidden sm:flex"
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleShare} 
            disabled={isSaving}
            className="hidden sm:flex text-sm font-medium"
          >
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportPDF} 
            disabled={isExporting}
            className="text-sm font-medium"
          >
            <Download className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">{isExporting ? "Exporting..." : "PDF"}</span>
            <span className="sm:hidden">{isExporting ? "..." : "PDF"}</span>
          </Button>
          <Button 
            size="sm" 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-sm font-medium"
          >
            <Save className="h-4 w-4 mr-1" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Form Panel */}
        <div className={`${showMobilePreview ? "hidden lg:block" : "w-full"} lg:w-1/2 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-y-auto`}>
          <div className="p-6 lg:p-8">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-violet-600">
                    Step {currentStep}
                  </span>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <span className="text-xs font-medium text-gray-500">{STEPS[currentStep - 1].name}</span>
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  {Math.round((currentStep / STEPS.length) * 100)}% complete
                </span>
              </div>
              <div className="flex gap-1">
                {STEPS.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                      step.id < currentStep 
                        ? "bg-violet-500" 
                        : step.id === currentStep 
                        ? "bg-violet-600" 
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Validation Errors */}
            {Object.keys(errors).length > 0 && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                {Object.entries(errors).map(([key, msg]) => (
                  <p key={key} className="text-xs text-red-600 dark:text-red-400">{msg}</p>
                ))}
              </div>
            )}

            {/* Step Content */}
            <Card className="p-0 border-0 shadow-none min-h-[350px] dark:bg-transparent">
              {renderStep()}
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-5 border-t border-gray-100 dark:border-gray-800">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="gap-1.5 text-sm font-medium"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              {currentStep < 7 ? (
                <Button onClick={handleNext} className="gap-1.5 bg-violet-600 hover:bg-violet-700 text-sm font-medium">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSave} className="gap-1.5 bg-violet-600 hover:bg-violet-700 text-sm font-medium">
                  <Save className="h-4 w-4" />
                  Finish
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className={`${showMobilePreview ? "w-full lg:w-1/2" : "hidden lg:block lg:w-1/2"} bg-gray-100 dark:bg-gray-950`}>
          <div className="h-full flex flex-col">
            <div className="px-4 py-2.5 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Live Preview</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Updates in real-time</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobilePreview(false)}
                  className="lg:hidden text-xs"
                >
                  Back to Form
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <div className="shadow-2xl rounded-lg overflow-hidden bg-white">
                <CVPreview />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Preview Toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          onClick={() => setShowMobilePreview(!showMobilePreview)}
          className="rounded-full shadow-2xl bg-violet-600 hover:bg-violet-700 h-14 w-14 p-0"
        >
          <Eye className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
