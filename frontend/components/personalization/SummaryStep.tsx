import React, { useState } from "react";
import { CheckCircle2, Edit, Loader2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePersonalizationStore } from "@/lib/stores/personalizationStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

export const SummaryStep: React.FC = () => {
  const navigate = useNavigate();
  const {
    identityVerification,
    profilePhoto,
    documents,
    preferences,
    completedSteps,
    goToStep,
    completeWizard,
  } = usePersonalizationStore();

  const [isCompleting, setIsCompleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      await completeWizard();
      setIsComplete(true);

      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Redirect to dashboard after delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    } catch (error) {
      console.error("Error completing wizard:", error);
    } finally {
      setIsCompleting(false);
    }
  };

  const summaryItems = [
    {
      title: "Identity Verification",
      step: "identity-verification" as const,
      completed: completedSteps.has("identity-verification"),
      description:
        identityVerification.status === "verified"
          ? `Verified - ${identityVerification.fullName || "Name provided"}`
          : "Not completed",
      showCheck: identityVerification.status === "verified",
    },
    {
      title: "Profile Photo",
      step: "profile-photo" as const,
      completed: completedSteps.has("profile-photo"),
      description: profilePhoto.cropped
        ? "Photo uploaded and cropped"
        : "Not completed",
      showCheck: profilePhoto.cropped,
      preview: profilePhoto.cropped,
    },
    {
      title: "Supporting Documents",
      step: "documents" as const,
      completed: completedSteps.has("documents"),
      description:
        documents.length > 0
          ? `${
              documents.filter((d) => d.status === "uploaded").length
            } document(s) uploaded`
          : "Skipped",
      showCheck: documents.length > 0,
    },
    {
      title: "Personal Preferences",
      step: "preferences" as const,
      completed: completedSteps.has("preferences"),
      description: `${preferences.language.toUpperCase()} - ${
        preferences.theme
      } theme`,
      showCheck: true,
    },
  ];

  const allStepsComplete = summaryItems
    .slice(0, -1)
    .every((item) => item.completed);

  if (isComplete) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center space-y-6 text-center">
        <div className="rounded-full bg-green-100 p-6">
          <CheckCircle2 className="h-16 w-16 text-green-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Setup Complete!</h2>
          <p className="text-lg text-muted-foreground">
            Welcome to your personalized experience
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Redirecting to dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#003366]">Review & Complete</h2>
        <p className="mt-2 text-muted-foreground">
          Review your setup and make any final changes before completing your
          personalization.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="rounded-2xl border bg-gradient-to-br from-[#D30B8D]/10 to-[#FF7900]/10 p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-white p-3 shadow-sm">
            <CheckCircle2 className="h-6 w-6 text-[#D30B8D]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#003366]">
              {allStepsComplete ? "All Set!" : "Almost There!"}
            </h3>
            <p className="mt-1 text-sm text-[#003366]/80">
              {allStepsComplete
                ? "Your account is fully personalized and ready to go."
                : "Complete the remaining steps to unlock your full experience."}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="space-y-4">
        {summaryItems.map((item) => (
          <div
            key={item.step}
            className={cn(
              "flex items-start gap-4 rounded-2xl border-2 p-6 transition-all",
              item.completed
                ? "border-green-200 bg-green-50/50"
                : "border-border bg-card"
            )}
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
              {item.showCheck ? (
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              ) : (
                <Clock className="h-6 w-6 text-gray-400" />
              )}
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                {item.preview && (
                  <div className="ml-4 h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20">
                    <img
                      src={item.preview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>

              {item.step !== "preferences" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => goToStep(item.step)}
                  className="mt-2"
                >
                  <Edit className="mr-2 h-3 w-3" />
                  {item.completed ? "Edit" : "Complete"}
                </Button>
              )}
            </div>

            {item.completed && (
              <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-green-600" />
            )}
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="space-y-3 rounded-lg bg-[#D30B8D]/5 border border-[#D30B8D]/20 p-4">
        <h4 className="font-medium text-[#003366]">What happens next?</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[#D40E60]">•</span>
            <span>
              Your identity verification will be reviewed within 24-48 hours
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[#D40E60]">•</span>
            <span>
              You'll receive an email confirmation once verification is complete
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[#D40E60]">•</span>
            <span>
              You can update your preferences anytime from your account settings
            </span>
          </li>
        </ul>
      </div>

      {/* Complete Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleComplete}
          disabled={!allStepsComplete || isCompleting}
          size="lg"
          className="min-w-[200px] bg-[#D40E60] hover:bg-[#B00D50]"
        >
          {isCompleting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Completing...
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Finish Setup
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
