"use client";

import { useCVStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, FolderOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "@/lib/types";

export function ProjectsStep() {
  const { currentCV, updateCurrentCV, nextStep, prevStep } = useCVStore();

  const addProject = () => {
    updateCurrentCV({ projects: [...currentCV.projects, { id: Math.random().toString(36).substring(2, 9), title: "", description: "", link: "" }] });
  };
  const updateProject = (id: string, field: keyof Project, value: string) => {
    updateCurrentCV({ projects: currentCV.projects.map((proj) => proj.id === id ? { ...proj, [field]: value } : proj) });
  };
  const removeProject = (id: string) => {
    updateCurrentCV({ projects: currentCV.projects.filter((proj) => proj.id !== id) });
  };

  const inputClass = "bg-gray-50 dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600 focus:border-violet-500 dark:focus:border-violet-500/50 focus:ring-violet-500/20";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Projects</h2>
        <p className="text-sm text-gray-500 dark:text-zinc-500">Showcase your best work and projects</p>
      </div>

      {currentCV.projects.map((proj, index) => (
        <div key={proj.id} className="p-5 rounded-xl bg-gray-50 dark:bg-zinc-800/30 border border-gray-200 dark:border-zinc-800/50 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-violet-500 dark:text-violet-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">Project {index + 1}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeProject(proj.id)} className="hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2"><Label className="text-gray-500 dark:text-zinc-400 text-xs">Project Title</Label><Input placeholder="E-commerce Platform" value={proj.title} onChange={(e) => updateProject(proj.id, "title", e.target.value)} className={inputClass} /></div>
            <div className="space-y-2">
              <Label className="text-gray-500 dark:text-zinc-400 text-xs">Description</Label>
              <Textarea placeholder="Built a full-stack e-commerce platform..."
                className="min-h-[100px] bg-gray-50 dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600 focus:border-violet-500 dark:focus:border-violet-500/50 focus:ring-violet-500/20 resize-none"
                value={proj.description} onChange={(e) => updateProject(proj.id, "description", e.target.value)} />
            </div>
            <div className="space-y-2"><Label className="text-gray-500 dark:text-zinc-400 text-xs">Project Link</Label><Input placeholder="https://github.com/username/project" value={proj.link} onChange={(e) => updateProject(proj.id, "link", e.target.value)} className={inputClass} /></div>
          </div>
        </div>
      ))}

      <Button variant="outline" onClick={addProject} className="w-full border-dashed border-gray-300 dark:border-zinc-700 text-gray-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-white hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:border-violet-400 dark:hover:border-violet-500/40">
        <Plus className="h-4 w-4 mr-2" /> Add Project
      </Button>

      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" onClick={prevStep} className="gap-1.5 text-sm font-medium border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5">
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>
        <Button onClick={nextStep} className="gap-1.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-sm font-semibold shadow-lg shadow-violet-600/25">
          Next: Custom <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
