import React, { useState } from "react";
import {
  Camera,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { usePersonalizationStore } from "@/lib/stores/personalizationStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { cn } from "@/lib/utils";
import type { VerificationStatus } from "@/lib/types/personalization";

export const IdentityVerificationStep: React.FC = () => {
  const {
    identityVerification,
    updateIdentityVerification,
    submitIdentityVerification,
    nextStep,
  } = usePersonalizationStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleFileUpload =
    (type: "front" | "back" | "selfie") => (files: File[]) => {
      if (files.length > 0) {
        const file = files[0];

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          setValidationErrors([
            ...validationErrors,
            `File size for ${type} photo must be less than 5MB`,
          ]);
          return;
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
          setValidationErrors([
            ...validationErrors,
            `${type} photo must be an image file`,
          ]);
          return;
        }

        // Clear validation errors for this field
        setValidationErrors([]);

        // Simulate OCR extraction for ID front
        if (type === "front") {
          updateIdentityVerification({
            idFrontPhoto: file,
            ocrExtractedData: {
              name: "John Doe", // Simulated OCR data
              dob: "1990-01-15",
              idNumber: "ID123456789",
            },
          });
        } else if (type === "back") {
          updateIdentityVerification({ idBackPhoto: file });
        } else {
          updateIdentityVerification({ selfiePhoto: file });
        }
      }
    };

  const handleRemovePhoto = (type: "front" | "back" | "selfie") => {
    if (type === "front") {
      updateIdentityVerification({
        idFrontPhoto: undefined,
        ocrExtractedData: undefined,
      });
    } else if (type === "back") {
      updateIdentityVerification({ idBackPhoto: undefined });
    } else {
      updateIdentityVerification({ selfiePhoto: undefined });
    }
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!identityVerification.idType) {
      errors.push("Please select an ID document type");
    }

    if (!identityVerification.idFrontPhoto) {
      errors.push("Please upload a photo of your ID front side");
    }

    if (!identityVerification.fullName?.trim()) {
      errors.push("Please enter your full name");
    }

    if (!identityVerification.dateOfBirth) {
      errors.push("Please enter your date of birth");
    }

    if (!identityVerification.idNumber?.trim()) {
      errors.push("Please enter your ID number");
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setValidationErrors([]);

    try {
      await submitIdentityVerification();
      // Auto-advance to next step after successful verification
      setTimeout(() => {
        nextStep();
      }, 1500);
    } catch (error) {
      console.error("Verification failed:", error);
      setValidationErrors(["Verification failed. Please try again."]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: VerificationStatus) => {
    const badges = {
      "not-started": {
        icon: null,
        text: "Not Started",
        className: "bg-gray-100 text-gray-700",
      },
      pending: {
        icon: Loader2,
        text: "Pending Review",
        className: "bg-yellow-100 text-yellow-700",
      },
      "in-review": {
        icon: Loader2,
        text: "In Review",
        className: "bg-blue-100 text-blue-700",
      },
      verified: {
        icon: CheckCircle2,
        text: "Verified",
        className: "bg-green-100 text-green-700",
      },
      rejected: {
        icon: AlertCircle,
        text: "Rejected",
        className: "bg-red-100 text-red-700",
      },
    };

    const badge = badges[status];
    const Icon = badge.icon;

    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium",
          badge.className
        )}
      >
        {Icon && (
          <Icon
            className={cn(
              "h-4 w-4",
              status === "pending" || status === "in-review"
                ? "animate-spin"
                : ""
            )}
          />
        )}
        {badge.text}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Identity Verification</h2>
        <p className="mt-2 text-muted-foreground">
          Please upload your identification document to verify your identity.
          This helps us keep your account secure.
        </p>
        <div className="mt-4 flex items-center justify-between">
          {getStatusBadge(identityVerification.status)}
          {identityVerification.status === "verified" &&
            identityVerification.reviewedAt && (
              <p className="text-sm text-muted-foreground">
                Verified on{" "}
                {new Date(identityVerification.reviewedAt).toLocaleDateString()}
              </p>
            )}
        </div>
      </div>

      {/* Information Box */}
      {identityVerification.status === "not-started" && (
        <div className="rounded-lg bg-[#D30B8D]/5 border border-[#D30B8D]/20 p-4">
          <h3 className="mb-2 font-medium text-[#D30B8D]">What you'll need:</h3>
          <ul className="space-y-1 text-sm text-[#003366]">
            <li>
              A valid government-issued ID (passport, driver's license, or
              national ID)
            </li>
            <li>Clear, well-lit photos of your ID</li>
            <li>Your personal information to confirm</li>
            <li>Optional: A selfie for additional security</li>
          </ul>
        </div>
      )}

      {/* ID Type Selection */}
      <div className="space-y-2">
        <Label htmlFor="idType">ID Document Type *</Label>
        <Select
          value={identityVerification.idType}
          onValueChange={(value: any) =>
            updateIdentityVerification({ idType: value })
          }
          disabled={identityVerification.status === "verified"}
        >
          <SelectTrigger id="idType">
            <SelectValue placeholder="Select ID type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="passport">Passport</SelectItem>
            <SelectItem value="drivers-license">Driver's License</SelectItem>
            <SelectItem value="national-id">National ID Card</SelectItem>
            <SelectItem value="other">Other Government ID</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ID Photo Uploads */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>ID Front Photo *</Label>
          {identityVerification.idFrontPhoto ? (
            <div className="relative">
              <div className="overflow-hidden rounded-lg border">
                <img
                  src={
                    identityVerification.idFrontPhoto instanceof File
                      ? URL.createObjectURL(identityVerification.idFrontPhoto)
                      : identityVerification.idFrontPhoto
                  }
                  alt="ID Front"
                  className="h-48 w-full object-cover"
                />
              </div>
              <div className="mt-2 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRemovePhoto("front")}
                  className="flex-1"
                  disabled={identityVerification.status === "verified"}
                >
                  Remove
                </Button>
                <label className="flex-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    disabled={identityVerification.status === "verified"}
                    asChild
                  >
                    <span>
                      <Upload className="mr-2 h-4 w-4" />
                      Change
                    </span>
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        handleFileUpload("front")(Array.from(files));
                      }
                    }}
                    disabled={identityVerification.status === "verified"}
                  />
                </label>
              </div>
            </div>
          ) : (
            <FileUpload
              onFilesSelected={handleFileUpload("front")}
              accept={{ "image/*": [".jpg", ".jpeg", ".png"] }}
              maxFiles={1}
              helperText="Clear photo of ID front side"
              disabled={identityVerification.status === "verified"}
            />
          )}
        </div>

        <div className="space-y-2">
          <Label>ID Back Photo (if applicable)</Label>
          {identityVerification.idBackPhoto ? (
            <div className="relative">
              <div className="overflow-hidden rounded-lg border">
                <img
                  src={
                    identityVerification.idBackPhoto instanceof File
                      ? URL.createObjectURL(identityVerification.idBackPhoto)
                      : identityVerification.idBackPhoto
                  }
                  alt="ID Back"
                  className="h-48 w-full object-cover"
                />
              </div>
              <div className="mt-2 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRemovePhoto("back")}
                  className="flex-1"
                  disabled={identityVerification.status === "verified"}
                >
                  Remove
                </Button>
                <label className="flex-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    disabled={identityVerification.status === "verified"}
                    asChild
                  >
                    <span>
                      <Upload className="mr-2 h-4 w-4" />
                      Change
                    </span>
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        handleFileUpload("back")(Array.from(files));
                      }
                    }}
                    disabled={identityVerification.status === "verified"}
                  />
                </label>
              </div>
            </div>
          ) : (
            <FileUpload
              onFilesSelected={handleFileUpload("back")}
              accept={{ "image/*": [".jpg", ".jpeg", ".png"] }}
              maxFiles={1}
              helperText="Clear photo of ID back side"
              disabled={identityVerification.status === "verified"}
            />
          )}
        </div>
      </div>

      {/* OCR Extracted Data */}
      {identityVerification.ocrExtractedData && (
        <div className="rounded-lg border-2 border-[#D30B8D]/30 bg-[#D30B8D]/5 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#D30B8D]">
            <CheckCircle2 className="h-5 w-5" />
            Information auto-detected from your ID
          </div>
          <div className="grid gap-3 text-sm">
            {identityVerification.ocrExtractedData.name && (
              <div className="flex items-center justify-between rounded-md bg-white px-3 py-2">
                <span className="text-gray-600">Name:</span>
                <span className="font-semibold text-[#003366]">
                  {identityVerification.ocrExtractedData.name}
                </span>
              </div>
            )}
            {identityVerification.ocrExtractedData.dob && (
              <div className="flex items-center justify-between rounded-md bg-white px-3 py-2">
                <span className="text-gray-600">Date of Birth:</span>
                <span className="font-semibold text-[#003366]">
                  {new Date(
                    identityVerification.ocrExtractedData.dob
                  ).toLocaleDateString()}
                </span>
              </div>
            )}
            {identityVerification.ocrExtractedData.idNumber && (
              <div className="flex items-center justify-between rounded-md bg-white px-3 py-2">
                <span className="text-gray-600">ID Number:</span>
                <span className="font-semibold text-[#003366]">
                  {identityVerification.ocrExtractedData.idNumber}
                </span>
              </div>
            )}
          </div>
          <p className="mt-3 text-xs text-[#D30B8D]">
            Please verify this information is correct and update if needed
            below.
          </p>
        </div>
      )}

      {/* Manual Entry Fields */}
      <div className="space-y-4">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-[#003366]">
            Confirm Your Information
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">
                Full Name *
                <span className="ml-1 text-xs font-normal text-muted-foreground">
                  (as shown on ID)
                </span>
              </Label>
              <Input
                id="fullName"
                value={
                  identityVerification.fullName ||
                  identityVerification.ocrExtractedData?.name ||
                  ""
                }
                onChange={(e) =>
                  updateIdentityVerification({ fullName: e.target.value })
                }
                placeholder="e.g. John Smith"
                disabled={identityVerification.status === "verified"}
                className={
                  validationErrors.some((e) => e.includes("full name"))
                    ? "border-red-500"
                    : ""
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={
                  identityVerification.dateOfBirth ||
                  identityVerification.ocrExtractedData?.dob ||
                  ""
                }
                onChange={(e) =>
                  updateIdentityVerification({ dateOfBirth: e.target.value })
                }
                disabled={identityVerification.status === "verified"}
                className={
                  validationErrors.some((e) => e.includes("date of birth"))
                    ? "border-red-500"
                    : ""
                }
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="idNumber">
                ID Number *
                <span className="ml-1 text-xs font-normal text-muted-foreground">
                  (Document number)
                </span>
              </Label>
              <Input
                id="idNumber"
                value={
                  identityVerification.idNumber ||
                  identityVerification.ocrExtractedData?.idNumber ||
                  ""
                }
                onChange={(e) =>
                  updateIdentityVerification({ idNumber: e.target.value })
                }
                placeholder="e.g. ID123456789"
                disabled={identityVerification.status === "verified"}
                className={
                  validationErrors.some((e) => e.includes("ID number"))
                    ? "border-red-500"
                    : ""
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Selfie Verification */}
      <div className="space-y-2">
        <Label>Selfie Verification (Optional)</Label>
        <p className="text-sm text-muted-foreground">
          Take a selfie to match with your ID photo for enhanced security
        </p>
        {identityVerification.selfiePhoto ? (
          <div className="flex items-start gap-4">
            <div className="overflow-hidden rounded-lg border">
              <img
                src={
                  identityVerification.selfiePhoto instanceof File
                    ? URL.createObjectURL(identityVerification.selfiePhoto)
                    : identityVerification.selfiePhoto
                }
                alt="Selfie"
                className="h-32 w-32 object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleRemovePhoto("selfie")}
                disabled={identityVerification.status === "verified"}
              >
                Remove
              </Button>
              <label>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={identityVerification.status === "verified"}
                  asChild
                >
                  <span>
                    <Camera className="mr-2 h-4 w-4" />
                    Retake
                  </span>
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  capture="user"
                  className="hidden"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      handleFileUpload("selfie")(Array.from(files));
                    }
                  }}
                  disabled={identityVerification.status === "verified"}
                />
              </label>
            </div>
          </div>
        ) : (
          <FileUpload
            onFilesSelected={handleFileUpload("selfie")}
            accept={{ "image/*": [".jpg", ".jpeg", ".png"] }}
            maxFiles={1}
            helperText="Clear photo of your face"
            disabled={identityVerification.status === "verified"}
          />
        )}
      </div>

      {/* Validation/Error Messages */}
      {validationErrors.length > 0 && (
        <div className="rounded-lg bg-red-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-red-900">
            <AlertCircle className="h-4 w-4" />
            Please fix the following issues:
          </div>
          <ul className="list-inside list-disc space-y-1 text-sm text-red-700">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Verification Error Messages from Backend */}
      {identityVerification.verificationErrors &&
        identityVerification.verificationErrors.length > 0 && (
          <div className="rounded-lg bg-orange-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-orange-900">
              <AlertCircle className="h-4 w-4" />
              Verification Issues
            </div>
            <ul className="list-inside list-disc space-y-1 text-sm text-orange-700">
              {identityVerification.verificationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

      {/* Submit Button */}
      <div className="flex justify-between gap-3">
        <Button variant="ghost" onClick={nextStep} disabled={isSubmitting}>
          Skip for Now
        </Button>

        <div className="flex gap-3">
          {identityVerification.status === "verified" ? (
            <Button onClick={nextStep} size="lg">
              Continue to Next Step
            </Button>
          ) : identityVerification.status === "pending" ||
            identityVerification.status === "in-review" ? (
            <Button disabled size="lg">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verification in Progress...
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting} size="lg">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Submit for Verification"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
