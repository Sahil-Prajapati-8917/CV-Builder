"use client";

import { useCVStore } from "@/lib/store";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function SummaryStep() {
  const { currentCV, updateCurrentCV } = useCVStore();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Professional Summary</h2>
        <p className="text-sm text-muted-foreground">
          Write a brief summary about yourself
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">About Me</Label>
        <Textarea
          id="summary"
          placeholder="Experienced software developer with 5+ years of expertise in building scalable web applications. Passionate about clean code, user experience, and continuous learning..."
          className="min-h-[200px]"
          value={currentCV.summary}
          onChange={(e) => updateCurrentCV({ summary: e.target.value })}
        />
        <p className="text-xs text-muted-foreground">
          Tip: Keep it concise, 3-4 sentences highlighting your key strengths
          and experience.
        </p>
      </div>
    </div>
  );
}
