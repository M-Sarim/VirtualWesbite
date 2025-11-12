import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  WizardStep,
  WizardState,
  IdentityVerification,
  ProfilePhoto,
  DocumentUpload,
  PersonalPreferences,
  WizardProgress,
} from "@/lib/types/personalization";

const STEP_ORDER: WizardStep[] = [
  "identity-verification",
  "profile-photo",
  "documents",
  "preferences",
  "summary",
];

interface PersonalizationStore extends WizardState {
  // Navigation actions
  goToStep: (step: WizardStep) => void;
  nextStep: () => void;
  previousStep: () => void;

  // Step completion
  markStepComplete: (step: WizardStep) => void;
  isStepComplete: (step: WizardStep) => boolean;

  // Identity verification actions
  updateIdentityVerification: (data: Partial<IdentityVerification>) => void;
  submitIdentityVerification: () => Promise<void>;

  // Profile photo actions
  updateProfilePhoto: (data: Partial<ProfilePhoto>) => void;

  // Document actions
  addDocument: (document: Omit<DocumentUpload, "id">) => void;
  updateDocument: (id: string, updates: Partial<DocumentUpload>) => void;
  removeDocument: (id: string) => void;

  // Preferences actions
  updatePreferences: (data: Partial<PersonalPreferences>) => void;

  // Utility actions
  getProgress: () => WizardProgress;
  completeWizard: () => Promise<void>;
  resetWizard: () => void;
  saveProgress: () => void;
}

const initialState: WizardState = {
  currentStep: "identity-verification",
  completedSteps: new Set(),
  identityVerification: {
    status: "not-started",
  },
  profilePhoto: {},
  documents: [],
  preferences: {
    language: navigator.language || "en",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    theme: "system",
    communication: {
      email: true,
      sms: false,
      inApp: true,
      whatsapp: false,
    },
    accessibility: {
      highContrast: false,
      largeText: false,
      screenReader: false,
      keyboardNavigation: true,
      reducedMotion: false,
    },
  },
  isComplete: false,
};

export const usePersonalizationStore = create<PersonalizationStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      goToStep: (step) => {
        set({ currentStep: step });
      },

      nextStep: () => {
        const { currentStep } = get();
        const currentIndex = STEP_ORDER.indexOf(currentStep);
        if (currentIndex < STEP_ORDER.length - 1) {
          set({ currentStep: STEP_ORDER[currentIndex + 1] });
        }
      },

      previousStep: () => {
        const { currentStep } = get();
        const currentIndex = STEP_ORDER.indexOf(currentStep);
        if (currentIndex > 0) {
          set({ currentStep: STEP_ORDER[currentIndex - 1] });
        }
      },

      markStepComplete: (step) => {
        set((state) => ({
          completedSteps: new Set(state.completedSteps).add(step),
          lastSaved: new Date().toISOString(),
        }));
      },

      isStepComplete: (step) => {
        return get().completedSteps.has(step);
      },

      updateIdentityVerification: (data) => {
        set((state) => ({
          identityVerification: {
            ...state.identityVerification,
            ...data,
          },
          lastSaved: new Date().toISOString(),
        }));
      },

      submitIdentityVerification: async () => {
        // Simulate API call
        set((state) => ({
          identityVerification: {
            ...state.identityVerification,
            status: "pending",
            submittedAt: new Date().toISOString(),
          },
        }));

        // Simulate verification process
        return new Promise((resolve) => {
          setTimeout(() => {
            set((state) => ({
              identityVerification: {
                ...state.identityVerification,
                status: "verified",
                reviewedAt: new Date().toISOString(),
              },
            }));
            get().markStepComplete("identity-verification");
            resolve();
          }, 2000);
        });
      },

      updateProfilePhoto: (data) => {
        set((state) => ({
          profilePhoto: {
            ...state.profilePhoto,
            ...data,
            uploadedAt: data.original
              ? new Date().toISOString()
              : state.profilePhoto.uploadedAt,
          },
          lastSaved: new Date().toISOString(),
        }));

        if (data.cropped) {
          get().markStepComplete("profile-photo");
        }
      },

      addDocument: (document) => {
        const id = `doc_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        set((state) => ({
          documents: [...state.documents, { ...document, id }],
          lastSaved: new Date().toISOString(),
        }));
      },

      updateDocument: (id, updates) => {
        set((state) => ({
          documents: state.documents.map((doc) =>
            doc.id === id ? { ...doc, ...updates } : doc
          ),
          lastSaved: new Date().toISOString(),
        }));
      },

      removeDocument: (id) => {
        set((state) => ({
          documents: state.documents.filter((doc) => doc.id !== id),
          lastSaved: new Date().toISOString(),
        }));
      },

      updatePreferences: (data) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            ...data,
            communication: {
              ...state.preferences.communication,
              ...(data.communication || {}),
            },
            accessibility: {
              ...state.preferences.accessibility,
              ...(data.accessibility || {}),
            },
          },
          lastSaved: new Date().toISOString(),
        }));

        get().markStepComplete("preferences");
      },

      getProgress: () => {
        const { completedSteps } = get();
        const totalSteps = STEP_ORDER.length - 1; // Exclude summary
        const completed = Array.from(completedSteps).filter(
          (step) => step !== "summary"
        ).length;

        return {
          totalSteps,
          completedSteps: completed,
          percentComplete: Math.round((completed / totalSteps) * 100),
        };
      },

      completeWizard: async () => {
        // Simulate final API call to save all data
        return new Promise((resolve) => {
          setTimeout(() => {
            set({
              isComplete: true,
              lastSaved: new Date().toISOString(),
            });
            get().markStepComplete("summary");

            // Save completion status to localStorage
            localStorage.setItem("personalizationComplete", "true");

            resolve();
          }, 1000);
        });
      },

      resetWizard: () => {
        set(initialState);
        localStorage.removeItem("personalizationComplete");
      },

      saveProgress: () => {
        set({ lastSaved: new Date().toISOString() });
      },
    }),
    {
      name: "personalization-wizard",
      partialize: (state) => ({
        currentStep: state.currentStep,
        completedSteps: Array.from(state.completedSteps),
        identityVerification: state.identityVerification,
        profilePhoto: state.profilePhoto,
        documents: state.documents,
        preferences: state.preferences,
        isComplete: state.isComplete,
        lastSaved: state.lastSaved,
      }),
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        ...persistedState,
        completedSteps: new Set(persistedState.completedSteps || []),
      }),
    }
  )
);
