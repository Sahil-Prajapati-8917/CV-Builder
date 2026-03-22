"use client";

import { useCVStore } from "@/lib/store";
import { CVTemplateRenderer } from "@/components/templates";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FileText, Download, Share2, ArrowRight } from "lucide-react";
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
    if (!element) { toast.error("Preview not found"); setIsExporting(false); return; }
    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false });
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const ratio = pdfWidth / canvas.width;
      const totalHeightMm = canvas.height * ratio;
      let renderedMm = 0;
      let page = 0;
      while (renderedMm < totalHeightMm) {
        if (page > 0) pdf.addPage("a4", "p");
        const remainingMm = totalHeightMm - renderedMm;
        const pageHeightMm = Math.min(pdfHeight, remainingMm);
        const sourceY = Math.round(renderedMm / ratio);
        const sourceHeight = Math.round(pageHeightMm / ratio);
        const sourceHeightClamped = Math.min(sourceHeight, canvas.height - sourceY);
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = sourceHeightClamped;
        const pageCtx = pageCanvas.getContext("2d")!;
        pageCtx.drawImage(canvas, 0, sourceY, canvas.width, sourceHeightClamped, 0, 0, canvas.width, sourceHeightClamped);
        pdf.addImage(pageCanvas.toDataURL("image/png"), "PNG", 0, 0, pdfWidth, pageHeightMm);
        renderedMm += pageHeightMm;
        page++;
      }
      pdf.save(`${cv?.name || "cv"}.pdf`);
      toast.success(`PDF downloaded! (${page} ${page === 1 ? "page" : "pages"})`);
    } catch { toast.error("Failed to export PDF"); }
    setIsExporting(false);
  };

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied!");
  };

  if (!cv) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-6">
        <Card className="bg-zinc-900/50 border-zinc-800/50 ring-1 ring-zinc-800/50 max-w-md w-full">
          <CardContent className="text-center py-12">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl blur-xl opacity-20" />
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600/10 to-purple-600/10 border border-violet-500/20 flex items-center justify-center">
                <FileText className="h-10 w-10 text-violet-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">CV Not Found</h1>
            <p className="text-zinc-500 mb-8 max-w-md mx-auto">This CV doesn&apos;t exist or has been deleted.</p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-sm font-medium shadow-lg shadow-violet-600/25">
                Go Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b]">
      <header className="bg-[#09090b]/80 backdrop-blur-2xl border-b border-white/[0.06] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">CVForge</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}
              className="border-zinc-700 text-zinc-400 hover:text-white hover:bg-white/5 hover:border-zinc-500">
              <Share2 className="h-4 w-4 mr-1" /> Share
            </Button>
            <Button size="sm" onClick={handleExportPDF} disabled={isExporting}
              className="bg-white text-zinc-900 hover:bg-zinc-100 text-sm font-semibold shadow-lg shadow-white/10">
              <Download className="h-4 w-4 mr-1" /> {isExporting ? "Exporting..." : "Download PDF"}
            </Button>
            <Link href="/builder">
              <Button size="sm" className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-sm font-medium shadow-lg shadow-violet-600/25">
                Create Your CV <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="py-12 px-6">
        <div className="max-w-[800px] mx-auto">
          <Card className="overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/5 bg-white p-0">
            <CardContent className="p-0">
              <div id="cv-preview">
                <CVTemplateRenderer data={cv} />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
