import React from "react";
import { usePersonalizationStore } from "@/lib/stores/personalizationStore";
import { IdentityVerificationStep } from "./IdentityVerificationStep";
import { ProfilePhotoStep } from "./ProfilePhotoStep";
import { DocumentUploadStep } from "./DocumentUploadStep";
import { PersonalPreferencesStep } from "./PersonalPreferencesStep";
import { SummaryStep } from "./SummaryStep";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WizardStep } from "@/lib/types/personalization";

const STEPS: { id: WizardStep; label: string; description: string }[] = [
  {
    id: "identity-verification",
    label: "Identity",
    description: "Verify your identity",
  },
  {
    id: "profile-photo",
    label: "Photo",
    description: "Upload profile picture",
  },
  {
    id: "documents",
    label: "Documents",
    description: "Supporting documents",
  },
  {
    id: "preferences",
    label: "Preferences",
    description: "Customize experience",
  },
  {
    id: "summary",
    label: "Review",
    description: "Complete setup",
  },
];

type PersonalizationWizardProps = {
  onComplete?: () => void;
};

export const PersonalizationWizard: React.FC<PersonalizationWizardProps> = ({
  onComplete,
}) => {
  const { currentStep, completedSteps, getProgress, goToStep } =
    usePersonalizationStore();
  const progress = getProgress();
  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);

  // Call onComplete when summary step is completed
  React.useEffect(() => {
    if (currentStep === "summary" && typeof onComplete === "function") {
      // Wait for user to finish summary step (e.g., click finish button)
      // For now, call onComplete automatically after a short delay
      const timer = setTimeout(() => {
        onComplete();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [currentStep, onComplete]);

  const renderStep = () => {
    switch (currentStep) {
      case "identity-verification":
        return <IdentityVerificationStep />;
      case "profile-photo":
        return <ProfilePhotoStep />;
      case "documents":
        return <DocumentUploadStep />;
      case "preferences":
        return <PersonalPreferencesStep />;
      case "summary":
        return <SummaryStep />;
      default:
        return <IdentityVerificationStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D30B8D]/5 via-[#FF7900]/5 to-[#D40E60]/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold md:text-4xl text-[#003366]">
            Complete Your Profile
          </h1>
          <p className="mt-2 text-muted-foreground">
            Just a few steps to personalize your experience
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="mx-auto max-w-2xl">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-[#003366]">Progress</span>
              <span className="text-muted-foreground">
                {progress.percentComplete}% Complete
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-[#D30B8D] to-[#D40E60] transition-all duration-500 ease-out"
                style={{ width: `${progress.percentComplete}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="mb-12">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center justify-between">
              {STEPS.map((step, index) => {
                const isCompleted = completedSteps.has(step.id);
                const isCurrent = step.id === currentStep;
                const isPast = index < currentStepIndex;
                const canNavigate = isCompleted || isPast || isCurrent;

                return (
                  <React.Fragment key={step.id}>
                    <button
                      onClick={() => canNavigate && goToStep(step.id)}
                      disabled={!canNavigate}
                      className={cn(
                        "group flex flex-col items-center gap-2 transition-all",
                        canNavigate
                          ? "cursor-pointer"
                          : "cursor-not-allowed opacity-40"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all",
                          isCompleted &&
                            "border-green-500 bg-green-500 text-white shadow-lg shadow-green-500/50",
                          isCurrent &&
                            !isCompleted &&
                            "border-[#D40E60] bg-[#D40E60] text-white shadow-lg shadow-[#D40E60]/30",
                          !isCompleted &&
                            !isCurrent &&
                            "border-border bg-white",
                          canNavigate && "group-hover:scale-110"
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-6 w-6" />
                        ) : (
                          <Circle
                            className={cn(
                              "h-6 w-6",
                              isCurrent && "fill-current"
                            )}
                          />
                        )}
                      </div>
                      <div className="text-center">
                        <p
                          className={cn(
                            "text-sm font-medium",
                            isCurrent && "text-[#D40E60]",
                            !isCurrent &&
                              !isCompleted &&
                              "text-muted-foreground"
                          )}
                        >
                          {step.label}
                        </p>
                        <p className="hidden text-xs text-muted-foreground sm:block">
                          {step.description}
                        </p>
                      </div>
                    </button>
                    {index < STEPS.length - 1 && (
                      <div
                        className={cn(
                          "h-0.5 flex-1 transition-all",
                          isPast || isCompleted ? "bg-green-500" : "bg-border"
                        )}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border bg-white p-8 shadow-xl md:p-12">
            {renderStep()}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Need help? Contact support at support@example.com</p>
        </div>
      </div>
    </div>
  );
};
