"use client";

import { useCVStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera, ChevronRight } from "lucide-react";
import Image from "next/image";
import { compressImage } from "@/lib/image-utils";
import { toast } from "sonner";

export function BasicInfoStep() {
  const { currentCV, updateCurrentCV, nextStep } = useCVStore();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file"); return; }
    if (file.size > 10 * 1024 * 1024) { toast.error("Image must be under 10MB"); return; }
    try {
      const compressed = await compressImage(file, 400, 0.7);
      updateCurrentCV({ profileImage: compressed });
      toast.success("Image uploaded and compressed");
    } catch { toast.error("Failed to process image"); }
  };

  const inputClass = "bg-gray-50 dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600 focus:border-violet-500 dark:focus:border-violet-500/50 focus:ring-violet-500/20";

  const handleNext = () => {
    if (!currentCV.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Basic Information</h2>
        <p className="text-sm text-gray-500 dark:text-zinc-500">Enter your personal details</p>
      </div>

      <div className="flex justify-center">
        <div className="relative">
          <div className="h-32 w-32 rounded-full bg-gray-100 dark:bg-zinc-800/50 border-2 border-dashed border-gray-300 dark:border-zinc-700 flex items-center justify-center overflow-hidden hover:border-violet-400 dark:hover:border-violet-500/50 transition-colors duration-300">
            {currentCV.profileImage ? (
              <Image src={currentCV.profileImage} alt="Profile" fill unoptimized className="object-cover" />
            ) : (
              <Camera className="h-8 w-8 text-gray-400 dark:text-zinc-500" />
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
        </div>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700 dark:text-zinc-300">Full Name *</Label>
          <Input id="name" placeholder="John Doe" value={currentCV.name} onChange={(e) => updateCurrentCV({ name: e.target.value })} className={inputClass} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 dark:text-zinc-300">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" value={currentCV.email} onChange={(e) => updateCurrentCV({ email: e.target.value })} className={inputClass} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-700 dark:text-zinc-300">Phone</Label>
            <Input id="phone" placeholder="+1 234 567 8900" value={currentCV.phone} onChange={(e) => updateCurrentCV({ phone: e.target.value })} className={inputClass} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="address" className="text-gray-700 dark:text-zinc-300">Address</Label>
          <Input id="address" placeholder="New York, USA" value={currentCV.address} onChange={(e) => updateCurrentCV({ address: e.target.value })} className={inputClass} />
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end pt-4">
        <Button onClick={handleNext}
          className="gap-1.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-sm font-semibold shadow-lg shadow-violet-600/25">
          Next: Summary <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
