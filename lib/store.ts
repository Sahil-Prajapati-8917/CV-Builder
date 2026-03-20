import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CVData, defaultCVData } from "./types";

interface CVStore {
  cvs: CVData[];
  currentCV: CVData;
  currentStep: number;
  
  setCurrentCV: (cv: CVData) => void;
  updateCurrentCV: (data: Partial<CVData>) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  saveCV: () => void;
  loadCV: (id: string) => void;
  deleteCV: (id: string) => void;
  duplicateCV: (id: string) => void;
  getPublicCV: (slug: string) => CVData | undefined;
  
  resetCurrentCV: () => void;
}

const generateSlug = (name: string): string => {
  const base = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const random = Math.random().toString(36).substring(2, 8);
  return `${base}-${random}`;
};

const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

export const useCVStore = create<CVStore>()(
  persist(
    (set, get) => ({
      cvs: [],
      currentCV: { ...defaultCVData },
      currentStep: 1,

      setCurrentCV: (cv) => set({ currentCV: cv }),

      updateCurrentCV: (data) =>
        set((state) => ({
          currentCV: { ...state.currentCV, ...data },
        })),

      setCurrentStep: (step) => set({ currentStep: step }),

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 7),
        })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),

      saveCV: () => {
        const { currentCV, cvs } = get();
        const now = new Date().toISOString();
        
        if (currentCV.id) {
          const updatedCVs = cvs.map((cv) =>
            cv.id === currentCV.id
              ? { ...currentCV, updatedAt: now }
              : cv
          );
          set({ cvs: updatedCVs, currentCV: { ...currentCV, updatedAt: now } });
        } else {
          const newCV: CVData = {
            ...currentCV,
            id: generateId(),
            slug: generateSlug(currentCV.name || "anonymous"),
            createdAt: now,
            updatedAt: now,
          };
          set({
            cvs: [...cvs, newCV],
            currentCV: newCV,
          });
        }
      },

      loadCV: (id) => {
        const { cvs } = get();
        const cv = cvs.find((c) => c.id === id);
        if (cv) {
          set({ currentCV: cv, currentStep: 1 });
        }
      },

      deleteCV: (id) => {
        const { cvs } = get();
        set({ cvs: cvs.filter((cv) => cv.id !== id) });
      },

      duplicateCV: (id) => {
        const { cvs } = get();
        const cv = cvs.find((c) => c.id === id);
        if (cv) {
          const newCV: CVData = {
            ...cv,
            id: generateId(),
            slug: generateSlug(cv.name || "anonymous"),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          set({ cvs: [...cvs, newCV] });
        }
      },

      getPublicCV: (slug) => {
        const { cvs } = get();
        return cvs.find((cv) => cv.slug === slug);
      },

      resetCurrentCV: () =>
        set({ currentCV: { ...defaultCVData }, currentStep: 1 }),
    }),
    {
      name: "cvforge-storage",
    }
  )
);
