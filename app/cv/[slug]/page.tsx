"use client";

import { useCVStore } from "@/lib/store";
import { CVTemplateRenderer } from "@/components/templates";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";
import { useMemo, useState } from "react";

export default function PublicCVPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { getPublicCV } = useCVStore();
  const cv = useMemo(() => getPublicCV(slug), [slug, getPublicCV]);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    const element = document.getElementById("cv-preview");
    if (!element) {
      toast.error("Preview not found");
      setIsExporting(false);
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${cv?.name || "cv"}.pdf`);
      toast.success("PDF downloaded!");
    } catch {
      toast.error("Failed to export PDF");
    }
    setIsExporting(false);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied!");
  };

  if (!cv) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">CV Not Found</h1>
          <p className="text-muted-foreground mb-4">
            This CV doesn&apos;t exist or has been deleted.
          </p>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to CVForge
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button size="sm" onClick={handleExportPDF} disabled={isExporting}>
              <Download className="h-4 w-4 mr-1" />
              {isExporting ? "Exporting..." : "Download PDF"}
            </Button>
            <Link href="/builder">
              <Button size="sm">Create Your CV</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="py-8 px-4">
        <div className="max-w-[800px] mx-auto shadow-2xl rounded-lg overflow-hidden">
          <div id="cv-preview">
            <CVTemplateRenderer data={cv} />
          </div>
        </div>
      </main>
    </div>
  );
}
