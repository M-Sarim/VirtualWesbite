// File removed
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
