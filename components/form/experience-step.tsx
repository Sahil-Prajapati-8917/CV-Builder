"use client";

import { useCVStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Briefcase } from "lucide-react";
import { Experience } from "@/lib/types";

export function ExperienceStep() {
  const { currentCV, updateCurrentCV } = useCVStore();

  const addExperience = () => {
    const newExperience: Experience = {
      id: Math.random().toString(36).substring(2, 9),
      company: "",
      role: "",
      duration: "",
      description: "",
    };
    updateCurrentCV({ experience: [...currentCV.experience, newExperience] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    const updated = currentCV.experience.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateCurrentCV({ experience: updated });
  };

  const removeExperience = (id: string) => {
    updateCurrentCV({ experience: currentCV.experience.filter((exp) => exp.id !== id) });
  };

  const inputClass = "bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:ring-violet-500/20";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">Work Experience</h2>
        <p className="text-sm text-zinc-500">Add your professional experience</p>
      </div>

      {currentCV.experience.map((exp, index) => (
        <div key={exp.id} className="p-5 rounded-xl bg-zinc-800/30 border border-zinc-800/50 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-violet-400" />
              <span className="text-sm font-medium text-zinc-300">Experience {index + 1}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)} className="hover:bg-red-500/10 hover:text-red-400">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-zinc-400 text-xs">Company Name</Label>
              <Input placeholder="Tech Corp Inc." value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} className={inputClass} />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-400 text-xs">Role / Position</Label>
              <Input placeholder="Senior Developer" value={exp.role} onChange={(e) => updateExperience(exp.id, "role", e.target.value)} className={inputClass} />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs">Duration</Label>
            <Input placeholder="Jan 2022 - Present" value={exp.duration} onChange={(e) => updateExperience(exp.id, "duration", e.target.value)} className={inputClass} />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs">Description</Label>
            <Textarea
              placeholder={"• Led development of microservices architecture\n• Managed team of 5 developers\n• Improved system performance by 40%"}
              className="min-h-[100px] bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:ring-violet-500/20 resize-none"
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
            />
          </div>
        </div>
      ))}

      <Button variant="outline" onClick={addExperience} className="w-full border-dashed border-zinc-700 text-zinc-400 hover:text-white hover:bg-violet-500/10 hover:border-violet-500/40">
        <Plus className="h-4 w-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
}
