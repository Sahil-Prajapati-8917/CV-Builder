"use client";

import { useCVStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: string
  ) => {
    const updated = currentCV.experience.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateCurrentCV({ experience: updated });
  };

  const removeExperience = (id: string) => {
    updateCurrentCV({
      experience: currentCV.experience.filter((exp) => exp.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Work Experience</h2>
        <p className="text-sm text-muted-foreground">
          Add your professional experience
        </p>
      </div>

      {currentCV.experience.map((exp, index) => (
        <Card key={exp.id} className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Experience {index + 1}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeExperience(exp.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input
                placeholder="Tech Corp Inc."
                value={exp.company}
                onChange={(e) =>
                  updateExperience(exp.id, "company", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Role / Position</Label>
              <Input
                placeholder="Senior Developer"
                value={exp.role}
                onChange={(e) =>
                  updateExperience(exp.id, "role", e.target.value)
                }
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Duration</Label>
              <Input
                placeholder="Jan 2022 - Present"
                value={exp.duration}
                onChange={(e) =>
                  updateExperience(exp.id, "duration", e.target.value)
                }
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Description</Label>
              <Textarea
                placeholder="• Led development of microservices architecture&#10;• Managed team of 5 developers&#10;• Improved system performance by 40%"
                className="min-h-[100px]"
                value={exp.description}
                onChange={(e) =>
                  updateExperience(exp.id, "description", e.target.value)
                }
              />
            </div>
          </div>
        </Card>
      ))}

      <Button variant="outline" onClick={addExperience} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
}
