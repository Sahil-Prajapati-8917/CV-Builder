"use client";

import { useCVStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, Trash2, Copy, ExternalLink, FileText, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CVTemplateRenderer } from "@/components/templates";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardPage() {
  const router = useRouter();
  const { cvs, loadCV, deleteCV, duplicateCV, resetCurrentCV } = useCVStore();

  const handleEdit = (id: string) => { loadCV(id); router.push("/builder"); };
  const handleDelete = (id: string) => { deleteCV(id); toast.success("CV deleted successfully"); };
  const handleDuplicate = (id: string) => { duplicateCV(id); toast.success("CV duplicated"); };
  const handleNew = () => { resetCurrentCV(); router.push("/builder"); };
  const copyShareLink = (slug: string) => { navigator.clipboard.writeText(`${window.location.origin}/cv/${slug}`); toast.success("Link copied!"); };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#09090b]">
      {/* Header */}
      <header className="bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-2xl border-b border-gray-200 dark:border-white/[0.06] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">CVForge</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/templates" className="text-sm text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors">Templates</Link>
            <Button onClick={handleNew} className="bg-violet-600 hover:bg-violet-700 dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 text-white text-sm font-semibold px-5 h-9 rounded-lg shadow-lg shadow-violet-600/25 dark:shadow-white/10">
              <Plus className="h-4 w-4 mr-1.5" /> Create New CV
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-500 dark:text-violet-400 mb-2 block">Your Portfolio</span>
            <h1 className="text-h2 font-bold text-gray-900 dark:text-white">Your CVs</h1>
            <p className="text-sm text-gray-500 dark:text-zinc-500 mt-1">Manage, edit, and share your resumes</p>
          </div>
          {cvs.length > 0 && (
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-500 font-medium">
              <Sparkles className="h-4 w-4 text-violet-500 dark:text-violet-400" />
              {cvs.length} CV{cvs.length !== 1 ? "s" : ""} saved
            </div>
          )}
        </div>

        {cvs.length === 0 ? (
          <Card className="border-dashed border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 ring-1 ring-gray-200 dark:ring-zinc-800/50">
            <CardContent className="text-center py-16">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl blur-xl opacity-20" />
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-600/10 dark:to-purple-600/10 border border-violet-200 dark:border-violet-500/20 flex items-center justify-center">
                  <FileText className="h-10 w-10 text-violet-500 dark:text-violet-400" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">No CVs yet</h2>
              <p className="text-gray-500 dark:text-zinc-500 mb-8 max-w-md mx-auto leading-relaxed">Create your first CV and start building your professional portfolio.</p>
              <Button onClick={handleNew} size="lg" className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-sm font-semibold shadow-2xl shadow-violet-600/30 rounded-xl px-8 h-12">
                <Plus className="h-4 w-4 mr-2" /> Create Your First CV
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cvs.map((cv) => (
              <Card key={cv.id} className="group overflow-hidden border-gray-200 dark:border-zinc-800/50 hover:border-violet-300 dark:hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500 bg-white dark:bg-zinc-900/30 ring-1 ring-gray-100 dark:ring-zinc-800/50">
                <div className="h-52 overflow-hidden bg-white relative">
                  <div className="transform scale-[0.35] origin-top-left w-[285%] pointer-events-none">
                    <CVTemplateRenderer data={cv} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#09090b] via-transparent to-transparent" />
                </div>
                <CardContent>
                  <h3 className="font-semibold text-base text-gray-900 dark:text-white truncate mb-1">{cv.name || "Untitled CV"}</h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-500 truncate mb-4">{cv.email || "No email added"}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(cv.id!)}
                        className="flex-1 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-500/20 hover:bg-violet-50 dark:hover:bg-violet-500/10 text-xs font-medium">
                        <Edit className="h-3 w-3 mr-1" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => copyShareLink(cv.slug!)}
                        className="px-2 border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5" title="Copy share link">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleDuplicate(cv.id!)}
                        className="text-gray-400 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 h-8 w-8 p-0" title="Duplicate">
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(cv.id!)}
                        className="text-gray-400 dark:text-zinc-600 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 h-8 w-8 p-0" title="Delete">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-zinc-600 mt-4 pt-3 border-t border-gray-100 dark:border-zinc-800/50">
                    Updated {cv.updatedAt ? new Date(cv.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
                  </p>
                </CardContent>
              </Card>
            ))}

            {/* Create New Card */}
            <Card onClick={handleNew}
              className="min-h-[300px] cursor-pointer border-dashed border-gray-300 dark:border-zinc-800 hover:border-violet-400 dark:hover:border-violet-500/40 bg-gray-50/50 dark:bg-zinc-900/20 hover:bg-violet-50 dark:hover:bg-violet-500/5 flex flex-col items-center justify-center gap-4 transition-all duration-500 group ring-1 ring-gray-200 dark:ring-zinc-800/50">
              <CardContent className="flex flex-col items-center justify-center gap-4 py-12">
                <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-zinc-800/50 group-hover:bg-violet-100 dark:group-hover:bg-violet-500/10 border border-gray-200 dark:border-zinc-700/50 group-hover:border-violet-300 dark:group-hover:border-violet-500/30 flex items-center justify-center transition-all duration-500">
                  <Plus className="h-6 w-6 text-gray-400 dark:text-zinc-500 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors duration-500" />
                </div>
                <span className="font-medium text-sm text-gray-500 dark:text-zinc-500 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors duration-500">Create New CV</span>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
