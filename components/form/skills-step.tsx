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
        <h2 className="text-2xl font-semibold text-white">Skills</h2>
        <p className="text-sm text-zinc-500">Add your technical and professional skills with proficiency levels</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-zinc-300">Proficiency Level</Label>
          <div className="flex gap-2">
            {levels.map((l) => (
              <button
                key={l.value}
                type="button"
                onClick={() => setSelectedLevel(l.value)}
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all border ${
                  selectedLevel === l.value
                    ? "bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-600/25"
                    : "bg-zinc-800/50 text-zinc-500 border-zinc-700 hover:border-violet-500/40 hover:text-zinc-300"
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
            className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:ring-violet-500/20"
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-600/25"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 min-h-[60px] p-4 rounded-xl bg-zinc-800/30 border border-zinc-800/50">
          {currentCV.skills.length === 0 && (
            <p className="text-sm text-zinc-600">Start typing to add skills...</p>
          )}
          {currentCV.skills.map((skill) => (
            <Badge key={skill.name} className="px-3 py-1.5 text-sm bg-violet-500/10 text-violet-300 border border-violet-500/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 cursor-pointer gap-1.5" onClick={() => removeSkill(skill.name)}>
              {skill.name}
              <span className="text-[10px] text-violet-500">Lv.{skill.level}</span>
              <X className="h-3 w-3" />
            </Badge>
          ))}
        </div>

        <p className="text-xs text-zinc-600">
          Tip: Set proficiency level before adding each skill. Levels affect the progress bar in Modern template.
        </p>
      </div>
    </div>
  );
}
