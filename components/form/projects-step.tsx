"use client";

import { useCVStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, FolderOpen } from "lucide-react";
import { Project } from "@/lib/types";

export function ProjectsStep() {
  const { currentCV, updateCurrentCV } = useCVStore();

  const addProject = () => {
    const newProject: Project = {
      id: Math.random().toString(36).substring(2, 9),
      title: "",
      description: "",
      link: "",
    };
    updateCurrentCV({ projects: [...currentCV.projects, newProject] });
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    const updated = currentCV.projects.map((proj) =>
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    updateCurrentCV({ projects: updated });
  };

  const removeProject = (id: string) => {
    updateCurrentCV({ projects: currentCV.projects.filter((proj) => proj.id !== id) });
  };

  const inputClass = "bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:ring-violet-500/20";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">Projects</h2>
        <p className="text-sm text-zinc-500">Showcase your best work and projects</p>
      </div>

      {currentCV.projects.map((proj, index) => (
        <div key={proj.id} className="p-5 rounded-xl bg-zinc-800/30 border border-zinc-800/50 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-violet-400" />
              <span className="text-sm font-medium text-zinc-300">Project {index + 1}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeProject(proj.id)} className="hover:bg-red-500/10 hover:text-red-400">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-zinc-400 text-xs">Project Title</Label>
              <Input placeholder="E-commerce Platform" value={proj.title} onChange={(e) => updateProject(proj.id, "title", e.target.value)} className={inputClass} />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-400 text-xs">Description</Label>
              <Textarea
                placeholder="Built a full-stack e-commerce platform with React, Node.js, and MongoDB..."
                className="min-h-[100px] bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:ring-violet-500/20 resize-none"
                value={proj.description}
                onChange={(e) => updateProject(proj.id, "description", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-400 text-xs">Project Link</Label>
              <Input placeholder="https://github.com/username/project" value={proj.link} onChange={(e) => updateProject(proj.id, "link", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>
      ))}

      <Button variant="outline" onClick={addProject} className="w-full border-dashed border-zinc-700 text-zinc-400 hover:text-white hover:bg-violet-500/10 hover:border-violet-500/40">
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
}
