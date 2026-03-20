"use client";

import { useCVStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Trophy, Award, Languages, ChevronLeft, Save } from "lucide-react";

type CustomSectionType = "achievements" | "certifications" | "languages";

const sectionConfig: Record<CustomSectionType, { label: string; icon: typeof Trophy; placeholder: string }> = {
  achievements: { label: "Achievements", icon: Trophy, placeholder: "Won 1st prize in hackathon" },
  certifications: { label: "Certifications", icon: Award, placeholder: "AWS Certified Developer" },
  languages: { label: "Languages", icon: Languages, placeholder: "English (Native)" },
};

export function CustomStep() {
  const { currentCV, updateCurrentCV, prevStep, saveCV } = useCVStore();

  const addItem = (type: CustomSectionType, value: string) => {
    if (!value.trim()) return;
    const existing = currentCV.customSections.find((s) => s.type === type);
    if (existing) {
      updateCurrentCV({ customSections: [...currentCV.customSections.filter((s) => s.type !== type), { ...existing, items: [...existing.items, value.trim()] }] });
    } else {
      updateCurrentCV({ customSections: [...currentCV.customSections, { id: crypto.randomUUID(), type, items: [value.trim()] }] });
    }
  };

  const removeItem = (type: CustomSectionType, index: number) => {
    const section = currentCV.customSections.find((s) => s.type === type);
    if (!section) return;
    updateCurrentCV({ customSections: [...currentCV.customSections.filter((s) => s.type !== type), { ...section, items: section.items.filter((_, i) => i !== index) }] });
  };

  const handleFinish = () => {
    saveCV();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Additional Sections</h2>
        <p className="text-sm text-gray-500 dark:text-zinc-500">Add achievements, certifications, and languages</p>
      </div>

      {(Object.keys(sectionConfig) as CustomSectionType[]).map((type) => {
        const config = sectionConfig[type];
        const Icon = config.icon;
        const section = currentCV.customSections.find((s) => s.type === type);
        const items = section?.items || [];

        return (
          <div key={type} className="p-5 rounded-xl bg-gray-50 dark:bg-zinc-800/30 border border-gray-200 dark:border-zinc-800/50 space-y-4">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-violet-500 dark:text-violet-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">{config.label}</span>
            </div>

            <div className="flex gap-2">
              <Input id={`input-${type}`} placeholder={config.placeholder}
                className="bg-gray-50 dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600 focus:border-violet-500 dark:focus:border-violet-500/50 focus:ring-violet-500/20"
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addItem(type, e.currentTarget.value); e.currentTarget.value = ""; } }} />
              <Button variant="outline" size="sm"
                onClick={() => { const input = document.getElementById(`input-${type}`) as HTMLInputElement; if (input?.value.trim()) { addItem(type, input.value); input.value = ""; } }}
                className="border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-white hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:border-violet-400 dark:hover:border-violet-500/40 shrink-0">
                <Plus className="h-3 w-3 mr-1" /> Add
              </Button>
            </div>

            {items.length > 0 && (
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-zinc-800/50 rounded-lg border border-gray-200 dark:border-zinc-700/50">
                    <span className="text-sm text-gray-700 dark:text-zinc-300">{item}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeItem(type, index)} className="hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400 h-7 w-7 p-0">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" onClick={prevStep} className="gap-1.5 text-sm font-medium border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5">
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>
        <Button onClick={handleFinish} className="gap-1.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-sm font-semibold shadow-lg shadow-violet-600/25">
          <Save className="h-4 w-4" /> Finish & Save
        </Button>
      </div>
    </div>
  );
}
