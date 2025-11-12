// Types for the personalization wizard

export type WizardStep =
  | "identity-verification"
  | "profile-photo"
  | "documents"
  | "preferences"
  | "summary";

export type VerificationStatus =
  | "not-started"
  | "pending"
  | "in-review"
  | "verified"
  | "rejected";

export interface IdentityVerification {
  status: VerificationStatus;
  idType?: "passport" | "drivers-license" | "national-id" | "other";
  idNumber?: string;
  fullName?: string;
  dateOfBirth?: string;
  idFrontPhoto?: File | string;
  idBackPhoto?: File | string;
  selfiePhoto?: File | string;
  ocrExtractedData?: {
    name?: string;
    dob?: string;
    idNumber?: string;
    expiryDate?: string;
  };
  verificationErrors?: string[];
  submittedAt?: string;
  reviewedAt?: string;
}

export interface ProfilePhoto {
  original?: File | string;
  cropped?: string;
  thumbnail64?: string;
  thumbnail128?: string;
  thumbnail512?: string;
  uploadedAt?: string;
}

export interface DocumentUpload {
  id: string;
  file: File | string;
  name: string;
  type: string;
  size: number;
  category?: "proof-of-address" | "certification" | "other";
  uploadProgress: number;
  uploadedAt?: string;
  status: "pending" | "uploading" | "uploaded" | "failed";
  metadata?: {
    expiryDate?: string;
    issueDate?: string;
  };
}

export interface PersonalPreferences {
  language: string;
  timezone: string;
  theme: "light" | "dark" | "system";
  communication: {
    email: boolean;
    sms: boolean;
    inApp: boolean;
    whatsapp: boolean;
  };
  accessibility: {
    highContrast: boolean;
    largeText: boolean;
    screenReader: boolean;
    keyboardNavigation: boolean;
    reducedMotion: boolean;
  };
  interests?: string[];
  role?: string;
}

export interface WizardState {
  currentStep: WizardStep;
  completedSteps: Set<WizardStep>;
  identityVerification: IdentityVerification;
  profilePhoto: ProfilePhoto;
  documents: DocumentUpload[];
  preferences: PersonalPreferences;
  isComplete: boolean;
  lastSaved?: string;
}

export interface WizardProgress {
  totalSteps: number;
  completedSteps: number;
  percentComplete: number;
}
