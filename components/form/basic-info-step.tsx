"use client";

import { useCVStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import Image from "next/image";
import { compressImage } from "@/lib/image-utils";
import { toast } from "sonner";

export function BasicInfoStep() {
  const { currentCV, updateCurrentCV } = useCVStore();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10MB");
      return;
    }

    try {
      const compressed = await compressImage(file, 400, 0.7);
      updateCurrentCV({ profileImage: compressed });
      toast.success("Image uploaded and compressed");
    } catch {
      toast.error("Failed to process image");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">Basic Information</h2>
        <p className="text-sm text-zinc-500">Enter your personal details</p>
      </div>

      <div className="flex justify-center">
        <div className="relative">
          <div className="h-32 w-32 rounded-full bg-zinc-800/50 border-2 border-dashed border-zinc-700 flex items-center justify-center overflow-hidden hover:border-violet-500/50 transition-colors duration-300">
            {currentCV.profileImage ? (
              <Image
                src={currentCV.profileImage}
                alt="Profile"
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <Camera className="h-8 w-8 text-zinc-500" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-zinc-300">Full Name *</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={currentCV.name}
            onChange={(e) => updateCurrentCV({ name: e.target.value })}
            className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:ring-violet-500/20"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-300">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={currentCV.email}
              onChange={(e) => updateCurrentCV({ email: e.target.value })}
              className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:ring-violet-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-zinc-300">Phone</Label>
            <Input
              id="phone"
              placeholder="+1 234 567 8900"
              value={currentCV.phone}
              onChange={(e) => updateCurrentCV({ phone: e.target.value })}
              className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:ring-violet-500/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-zinc-300">Address</Label>
          <Input
            id="address"
            placeholder="New York, USA"
            value={currentCV.address}
            onChange={(e) => updateCurrentCV({ address: e.target.value })}
            className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:ring-violet-500/20"
          />
        </div>
      </div>
    </div>
  );
}
