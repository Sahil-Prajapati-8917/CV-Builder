"use client";

import { useCVStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { Experience } from "@/lib/types";

export function ExperienceStep() {
  const { currentCV, updateCurrentCV, nextStep, prevStep } = useCVStore();

  const addExperience = () => {
    updateCurrentCV({ experience: [...currentCV.experience, { id: Math.random().toString(36).substring(2, 9), company: "", role: "", duration: "", description: "" }] });
  };
  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    updateCurrentCV({ experience: currentCV.experience.map((exp) => exp.id === id ? { ...exp, [field]: value } : exp) });
  };
  const removeExperience = (id: string) => {
    updateCurrentCV({ experience: currentCV.experience.filter((exp) => exp.id !== id) });
  };

  const inputClass = "bg-gray-50 dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600 focus:border-violet-500 dark:focus:border-violet-500/50 focus:ring-violet-500/20";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Work Experience</h2>
        <p className="text-sm text-gray-500 dark:text-zinc-500">Add your professional experience</p>
      </div>

      {currentCV.experience.map((exp, index) => (
        <div key={exp.id} className="p-5 rounded-xl bg-gray-50 dark:bg-zinc-800/30 border border-gray-200 dark:border-zinc-800/50 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-violet-500 dark:text-violet-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">Experience {index + 1}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)} className="hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label className="text-gray-500 dark:text-zinc-400 text-xs">Company Name</Label><Input placeholder="Tech Corp Inc." value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} className={inputClass} /></div>
            <div className="space-y-2"><Label className="text-gray-500 dark:text-zinc-400 text-xs">Role / Position</Label><Input placeholder="Senior Developer" value={exp.role} onChange={(e) => updateExperience(exp.id, "role", e.target.value)} className={inputClass} /></div>
          </div>
          <div className="space-y-2"><Label className="text-gray-500 dark:text-zinc-400 text-xs">Duration</Label><Input placeholder="Jan 2022 - Present" value={exp.duration} onChange={(e) => updateExperience(exp.id, "duration", e.target.value)} className={inputClass} /></div>
          <div className="space-y-2">
            <Label className="text-gray-500 dark:text-zinc-400 text-xs">Description</Label>
            <Textarea placeholder={"• Led development of microservices\n• Managed team of 5 developers"}
              className="min-h-[100px] bg-gray-50 dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600 focus:border-violet-500 dark:focus:border-violet-500/50 focus:ring-violet-500/20 resize-none"
              value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} />
          </div>
        </div>
      ))}

      <Button variant="outline" onClick={addExperience} className="w-full border-dashed border-gray-300 dark:border-zinc-700 text-gray-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-white hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:border-violet-400 dark:hover:border-violet-500/40">
        <Plus className="h-4 w-4 mr-2" /> Add Experience
      </Button>

      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" onClick={prevStep} className="gap-1.5 text-sm font-medium border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5">
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>
        <Button onClick={nextStep} className="gap-1.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-sm font-semibold shadow-lg shadow-violet-600/25">
          Next: Skills <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
