"use client";

import { useState } from "react";
import { useCVStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus } from "lucide-react";

const levels = [
  { value: 1, label: "Beginner" },
  { value: 2, label: "Elementary" },
  { value: 3, label: "Intermediate" },
  { value: 4, label: "Advanced" },
  { value: 5, label: "Expert" },
];

export function SkillsStep() {
  const { currentCV, updateCurrentCV } = useCVStore();
  const [inputValue, setInputValue] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(3);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    }
    if (e.key === "Backspace" && inputValue === "" && currentCV.skills.length > 0) {
      removeSkill(currentCV.skills[currentCV.skills.length - 1].name);
    }
  };

  const addSkill = () => {
    const skill = inputValue.trim().replace(/,/g, "");
    if (skill && !currentCV.skills.some((s) => s.name === skill)) {
      updateCurrentCV({ skills: [...currentCV.skills, { name: skill, level: selectedLevel }] });
    }
    setInputValue("");
  };

  const removeSkill = (skillName: string) => {
    updateCurrentCV({ skills: currentCV.skills.filter((s) => s.name !== skillName) });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <p className="text-sm text-muted-foreground">
          Add your technical and professional skills with proficiency levels
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Proficiency Level</Label>
          <div className="flex gap-2">
            {levels.map((l) => (
              <button
                key={l.value}
                type="button"
                onClick={() => setSelectedLevel(l.value)}
                className={`flex-1 py-2 text-xs font-medium rounded-md transition-all border ${
                  selectedLevel === l.value
                    ? "bg-violet-600 text-white border-violet-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-violet-300"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Type a skill and press Enter..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={addSkill}
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 min-h-[48px] p-4 border rounded-lg bg-muted/50">
          {currentCV.skills.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Start typing to add skills...
            </p>
          )}
          {currentCV.skills.map((skill) => (
            <Badge key={skill.name} variant="secondary" className="px-3 py-1 text-sm gap-1">
              {skill.name}
              <span className="text-xs text-muted-foreground ml-1">
                (Lv.{skill.level})
              </span>
              <button
                type="button"
                onClick={() => removeSkill(skill.name)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          Tip: Set proficiency level before adding each skill. Levels affect the progress bar in Modern template.
        </p>
      </div>
    </div>
  );
}
