"use client";

import { useCVStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    updateCurrentCV({
      projects: currentCV.projects.filter((proj) => proj.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <p className="text-sm text-muted-foreground">
          Showcase your best work and projects
        </p>
      </div>

      {currentCV.projects.map((proj, index) => (
        <Card key={proj.id} className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Project {index + 1}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeProject(proj.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Project Title</Label>
              <Input
                placeholder="E-commerce Platform"
                value={proj.title}
                onChange={(e) => updateProject(proj.id, "title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration."
                className="min-h-[100px]"
                value={proj.description}
                onChange={(e) =>
                  updateProject(proj.id, "description", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Project Link</Label>
              <Input
                placeholder="https://github.com/username/project"
                value={proj.link}
                onChange={(e) => updateProject(proj.id, "link", e.target.value)}
              />
            </div>
          </div>
        </Card>
      ))}

      <Button variant="outline" onClick={addProject} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
}
