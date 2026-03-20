"use client";

import { useCVStore } from "@/lib/store";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function SummaryStep() {
  const { currentCV, updateCurrentCV, nextStep, prevStep } = useCVStore();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Professional Summary</h2>
        <p className="text-sm text-gray-500 dark:text-zinc-500">Write a brief summary about yourself</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="summary" className="text-gray-700 dark:text-zinc-300">About Me</Label>
        <Textarea
          id="summary"
          placeholder="Experienced software developer with 5+ years of expertise..."
          className="min-h-[200px] bg-gray-50 dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600 focus:border-violet-500 dark:focus:border-violet-500/50 focus:ring-violet-500/20 resize-none"
          value={currentCV.summary}
          onChange={(e) => updateCurrentCV({ summary: e.target.value })}
        />
        <p className="text-xs text-gray-400 dark:text-zinc-600">Tip: Keep it concise, 3-4 sentences highlighting your key strengths.</p>
      </div>

      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" onClick={prevStep}
          className="gap-1.5 text-sm font-medium border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5">
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>
        <Button onClick={nextStep}
          className="gap-1.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-sm font-semibold shadow-lg shadow-violet-600/25">
          Next: Education <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
