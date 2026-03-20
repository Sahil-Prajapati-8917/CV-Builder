"use client";

import { useCVStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    updateCurrentCV({
      education: currentCV.education.filter((edu) => edu.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Education</h2>
        <p className="text-sm text-muted-foreground">
          Add your educational background
        </p>
      </div>

      {currentCV.education.map((edu, index) => (
        <Card key={edu.id} className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Education {index + 1}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(edu.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Degree / Certificate</Label>
              <Input
                placeholder="Bachelor of Technology"
                value={edu.degree}
                onChange={(e) =>
                  updateEducation(edu.id, "degree", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label>College / Institution</Label>
              <Input
                placeholder="MIT University"
                value={edu.college}
                onChange={(e) =>
                  updateEducation(edu.id, "college", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Year</Label>
              <Input
                placeholder="2020 - 2024"
                value={edu.year}
                onChange={(e) =>
                  updateEducation(edu.id, "year", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Percentage / CGPA</Label>
              <Input
                placeholder="8.5 CGPA"
                value={edu.percentage}
                onChange={(e) =>
                  updateEducation(edu.id, "percentage", e.target.value)
                }
              />
            </div>
          </div>
        </Card>
      ))}

      <Button variant="outline" onClick={addEducation} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
}
