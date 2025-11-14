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
  // File removed
  saveProgress: () => void;
