"use client";

import { useCVStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GraduationCap } from "lucide-react";
import { Education } from "@/lib/types";

export function EducationStep() {
  const { currentCV, updateCurrentCV } = useCVStore();

  const addEducation = () => {
    const newEducation: Education = {
      id: Math.random().toString(36).substring(2, 9),
      degree: "",
      college: "",
      year: "",
      percentage: "",
    };
    updateCurrentCV({ education: [...currentCV.education, newEducation] });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    const updated = currentCV.education.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateCurrentCV({ education: updated });
  };

  const removeEducation = (id: string) => {
    updateCurrentCV({ education: currentCV.education.filter((edu) => edu.id !== id) });
  };

  const inputClass = "bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:ring-violet-500/20";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">Education</h2>
        <p className="text-sm text-zinc-500">Add your educational background</p>
      </div>

      {currentCV.education.map((edu, index) => (
        <div key={edu.id} className="p-5 rounded-xl bg-zinc-800/30 border border-zinc-800/50 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-violet-400" />
              <span className="text-sm font-medium text-zinc-300">Education {index + 1}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)} className="hover:bg-red-500/10 hover:text-red-400">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-zinc-400 text-xs">Degree / Certificate</Label>
              <Input placeholder="Bachelor of Technology" value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} className={inputClass} />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-400 text-xs">College / Institution</Label>
              <Input placeholder="MIT University" value={edu.college} onChange={(e) => updateEducation(edu.id, "college", e.target.value)} className={inputClass} />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-400 text-xs">Year</Label>
              <Input placeholder="2020 - 2024" value={edu.year} onChange={(e) => updateEducation(edu.id, "year", e.target.value)} className={inputClass} />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-400 text-xs">Percentage / CGPA</Label>
              <Input placeholder="8.5 CGPA" value={edu.percentage} onChange={(e) => updateEducation(edu.id, "percentage", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>
      ))}

      <Button variant="outline" onClick={addEducation} className="w-full border-dashed border-zinc-700 text-zinc-400 hover:text-white hover:bg-violet-500/10 hover:border-violet-500/40">
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
}
