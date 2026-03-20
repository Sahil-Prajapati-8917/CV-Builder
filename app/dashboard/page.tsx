"use client";

import { useCVStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash2, Copy, ExternalLink, FileText, Sparkles, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTheme } from "@/lib/theme-provider";
import { CVTemplateRenderer } from "@/components/templates";

export default function DashboardPage() {
  const router = useRouter();
  const { cvs, loadCV, deleteCV, duplicateCV, resetCurrentCV } = useCVStore();
  const { isDark, toggle } = useTheme();

  const handleEdit = (id: string) => {
    loadCV(id);
    router.push("/builder");
  };

  const handleDelete = (id: string) => {
    deleteCV(id);
    toast.success("CV deleted successfully");
  };

  const handleDuplicate = (id: string) => {
    duplicateCV(id);
    toast.success("CV duplicated");
  };

  const handleNew = () => {
    resetCurrentCV();
    router.push("/builder");
  };

  const copyShareLink = (slug: string) => {
    const url = `${window.location.origin}/cv/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">CVForge</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              title={isDark ? "Light mode" : "Dark mode"}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button 
              onClick={handleNew}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/25 text-sm font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New CV
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-h2 font-bold text-gray-900 dark:text-white">Your CVs</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and edit your saved resumes</p>
          </div>
          {cvs.length > 0 && (
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
              <Sparkles className="h-4 w-4" />
              {cvs.length} CV{cvs.length !== 1 ? "s" : ""} saved
            </div>
          )}
        </div>

        {cvs.length === 0 ? (
          <Card className="p-16 text-center bg-white dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 rounded-2xl bg-violet-50 dark:bg-violet-950 flex items-center justify-center mx-auto mb-5">
              <FileText className="h-8 w-8 text-violet-500" />
            </div>
            <h2 className="text-h3 font-bold text-gray-900 dark:text-white mb-2">No CVs yet</h2>
            <p className="text-body text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Create your first CV and start building your professional portfolio. 
              It only takes a few minutes!
            </p>
            <Button onClick={handleNew} size="lg" className="bg-gradient-to-r from-violet-600 to-purple-600 text-sm font-medium">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First CV
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cvs.map((cv) => (
              <Card 
                key={cv.id} 
                className="group overflow-hidden hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                {/* Mini CV Preview */}
                <div className="h-48 overflow-hidden bg-white relative">
                  <div className="transform scale-[0.35] origin-top-left w-[285%] pointer-events-none">
                    <CVTemplateRenderer data={cv} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                  <h3 className="font-semibold text-base text-gray-900 dark:text-white truncate mb-1">
                    {cv.name || "Untitled CV"}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate mb-4">
                    {cv.email || "No email added"}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(cv.id!)}
                        className="flex-1 text-violet-600 border-violet-200 hover:bg-violet-50 hover:border-violet-300 dark:text-violet-400 dark:border-violet-800 dark:hover:bg-violet-950 text-xs font-medium"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyShareLink(cv.slug!)}
                        className="px-2"
                        title="Copy share link"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDuplicate(cv.id!)}
                        className="text-gray-500 hover:text-blue-600 h-8 w-8 p-0"
                        title="Duplicate"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(cv.id!)}
                        className="text-gray-400 hover:text-red-600 h-8 w-8 p-0"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                    Updated {cv.updatedAt ? new Date(cv.updatedAt).toLocaleDateString("en-US", { 
                      month: "short", 
                      day: "numeric", 
                      year: "numeric" 
                    }) : "N/A"}
                  </p>
                </div>
              </Card>
            ))}

            {/* Create New Card */}
            <button
              onClick={handleNew}
              className="min-h-[240px] bg-white dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-violet-300 dark:hover:border-violet-600 hover:bg-violet-50/50 dark:hover:bg-violet-950/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Plus className="h-6 w-6 text-gray-400" />
              </div>
              <span className="font-medium text-sm text-gray-500 dark:text-gray-400">Create New CV</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
