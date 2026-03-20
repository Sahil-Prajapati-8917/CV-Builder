"use client";

import { useRef } from "react";
import { useCVStore } from "@/lib/store";
import { CVTemplateRenderer } from "@/components/templates";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export function CVPreview() {
  const { currentCV } = useCVStore();
  const previewRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-full overflow-auto p-4">
      <div
        ref={previewRef}
        id="cv-preview"
        className="shadow-2xl rounded-lg overflow-hidden bg-white"
      >
        <CVTemplateRenderer data={currentCV} />
      </div>
      <div className="no-print mt-4 flex justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrint}
          className="text-xs border-zinc-700 text-zinc-400 hover:text-white hover:bg-white/5 hover:border-zinc-500"
        >
          <Printer className="h-3 w-3 mr-1" />
          Print
        </Button>
      </div>
    </div>
  );
}
