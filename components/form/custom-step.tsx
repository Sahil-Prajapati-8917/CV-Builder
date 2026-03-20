"use client";

import { useCVStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Trophy, Award, Languages } from "lucide-react";
import { CustomSection } from "@/lib/types";

type CustomSectionType = "achievements" | "certifications" | "languages";

const sectionConfig: Record<
  CustomSectionType,
  { label: string; icon: typeof Trophy; placeholder: string }
> = {
  achievements: {
    label: "Achievements",
    icon: Trophy,
    placeholder: "Won 1st prize in hackathon",
  },
  certifications: {
    label: "Certifications",
    icon: Award,
    placeholder: "AWS Certified Developer",
  },
  languages: {
    label: "Languages",
    icon: Languages,
    placeholder: "English (Native)",
  },
};

export function CustomStep() {
  const { currentCV, updateCurrentCV } = useCVStore();

  const addItem = (type: CustomSectionType, value: string) => {
    if (!value.trim()) return;
    const existing = currentCV.customSections.find((s) => s.type === type);
    if (existing) {
      const updatedSection = { ...existing, items: [...existing.items, value.trim()] };
      const otherSections = currentCV.customSections.filter((s) => s.type !== type);
      updateCurrentCV({ customSections: [...otherSections, updatedSection] });
    } else {
      const newSection: CustomSection = {
        id: crypto.randomUUID(),
        type,
        items: [value.trim()],
      };
      updateCurrentCV({ customSections: [...currentCV.customSections, newSection] });
    }
  };

  const removeItem = (type: CustomSectionType, index: number) => {
    const section = currentCV.customSections.find((s) => s.type === type);
    if (!section) return;
    const updatedSection = {
      ...section,
      items: section.items.filter((_, i) => i !== index),
    };
    const otherSections = currentCV.customSections.filter((s) => s.type !== type);
    updateCurrentCV({ customSections: [...otherSections, updatedSection] });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Additional Sections</h2>
        <p className="text-sm text-muted-foreground">
          Add achievements, certifications, and languages
        </p>
      </div>

      {(Object.keys(sectionConfig) as CustomSectionType[]).map((type) => {
        const config = sectionConfig[type];
        const Icon = config.icon;
        const section = currentCV.customSections.find((s) => s.type === type);
        const items = section?.items || [];

        return (
          <Card key={type} className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{config.label}</span>
            </div>

            <div className="space-y-2">
              <Label className="sr-only">Add {config.label}</Label>
              <Input
                id={`input-${type}`}
                placeholder={config.placeholder}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = e.currentTarget;
                    addItem(type, input.value);
                    input.value = "";
                  }
                }}
              />
            </div>

            {items.length > 0 && (
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-muted rounded-md"
                  >
                    <span className="text-sm">{item}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(type, index)}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const input = document.getElementById(`input-${type}`) as HTMLInputElement;
                if (input && input.value.trim()) {
                  addItem(type, input.value);
                  input.value = "";
                }
              }}
            >
              <Plus className="h-3 w-3 mr-1" />
              Add
            </Button>
          </Card>
        );
      })}
    </div>
  );
}
