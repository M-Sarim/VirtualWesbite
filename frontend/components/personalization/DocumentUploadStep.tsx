import React from "react";
import { FileText, X, CheckCircle2, Upload, AlertCircle } from "lucide-react";
import { usePersonalizationStore } from "@/lib/stores/personalizationStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/utils";
import type { DocumentUpload } from "@/lib/types/personalization";

export const DocumentUploadStep: React.FC = () => {
  const {
    documents,
    addDocument,
    updateDocument,
    removeDocument,
    nextStep,
    previousStep,
    markStepComplete,
  } = usePersonalizationStore();

  const handleFilesSelected = (files: File[]) => {
    files.forEach((file) => {
      const doc: Omit<DocumentUpload, "id"> = {
        file,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadProgress: 0,
        status: "pending",
      };

      addDocument(doc);

      // Simulate upload
      setTimeout(() => {
        const docId = documents[documents.length - 1]?.id;
        if (docId) {
          simulateUpload(docId);
        }
      }, 100);
    });
  };

  const simulateUpload = (docId: string) => {
    updateDocument(docId, { status: "uploading" });

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      updateDocument(docId, { uploadProgress: progress });

      if (progress >= 100) {
        clearInterval(interval);
        updateDocument(docId, {
          status: "uploaded",
          uploadedAt: new Date().toISOString(),
        });
      }
    }, 200);
  };

  const handleRemoveDocument = (docId: string) => {
    removeDocument(docId);
  };

  const handleCategoryChange = (docId: string, category: string) => {
    updateDocument(docId, { category: category as any });
  };

  const handleSkip = () => {
    markStepComplete("documents");
    nextStep();
  };

  const handleContinue = () => {
    markStepComplete("documents");
    nextStep();
  };

  const hasUploadedDocuments =
    documents.filter((d) => d.status === "uploaded").length > 0;
  const isUploading = documents.some((d) => d.status === "uploading");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#003366]">
          Supporting Documents
        </h2>
        <p className="mt-2 text-muted-foreground">
          Upload additional documents to complete your profile. This step is
          optional but recommended for full verification.
        </p>
      </div>

      {/* Upload Area */}
      <div className="space-y-2">
        <Label>Upload Documents</Label>
        <FileUpload
          onFilesSelected={handleFilesSelected}
          accept={{
            "application/pdf": [".pdf"],
            "image/*": [".jpg", ".jpeg", ".png"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
              [".docx"],
          }}
          maxFiles={10}
          multiple={true}
          helperText="PDF, JPG, PNG, DOCX (max 10MB each)"
          disabled={isUploading}
        />
      </div>

      {/* Document Categories Info */}
      <div className="grid gap-4 rounded-lg border border-[#D40E60]/20 bg-gradient-to-br from-[#D40E60]/5 to-[#D30B8D]/5 p-4 md:grid-cols-3">
        <div>
          <h4 className="mb-1 font-medium text-[#003366]">Proof of Address</h4>
          <p className="text-xs text-muted-foreground">
            Utility bill, bank statement, etc.
          </p>
        </div>
        <div>
          <h4 className="mb-1 font-medium text-[#003366]">Certifications</h4>
          <p className="text-xs text-muted-foreground">
            Professional certificates, diplomas
          </p>
        </div>
        <div>
          <h4 className="mb-1 font-medium text-[#003366]">Other Documents</h4>
          <p className="text-xs text-muted-foreground">
            Any additional supporting docs
          </p>
        </div>
      </div>

      {/* Uploaded Documents List */}
      {documents.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Uploaded Documents ({documents.length})</Label>
            {hasUploadedDocuments && (
              <div className="flex items-center gap-2 text-sm text-[#D40E60]">
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  {documents.filter((d) => d.status === "uploaded").length}{" "}
                  uploaded
                </span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="rounded-lg border bg-card p-4 transition-all hover:shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "rounded-full p-2",
                      doc.status === "uploaded"
                        ? "bg-[#D40E60]/10"
                        : "bg-gray-100"
                    )}
                  >
                    {doc.status === "uploaded" ? (
                      <CheckCircle2 className="h-5 w-5 text-[#D40E60]" />
                    ) : doc.status === "failed" ? (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    ) : (
                      <FileText className="h-5 w-5 text-gray-600" />
                    )}
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(doc.size / 1024).toFixed(2)} KB
                            {doc.uploadedAt &&
                              ` • Uploaded ${new Date(
                                doc.uploadedAt
                              ).toLocaleString()}`}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveDocument(doc.id)}
                          disabled={doc.status === "uploading"}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {doc.status === "uploading" && (
                      <ProgressBar
                        progress={doc.uploadProgress}
                        size="sm"
                        showLabel={false}
                      />
                    )}

                    {doc.status === "uploaded" && (
                      <div className="space-y-2">
                        <Label
                          htmlFor={`category-${doc.id}`}
                          className="text-xs"
                        >
                          Document Category (optional)
                        </Label>
                        <Select
                          value={doc.category}
                          onValueChange={(value) =>
                            handleCategoryChange(doc.id, value)
                          }
                        >
                          <SelectTrigger
                            id={`category-${doc.id}`}
                            className="h-8 text-sm"
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="proof-of-address">
                              Proof of Address
                            </SelectItem>
                            <SelectItem value="certification">
                              Certification
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {doc.status === "failed" && (
                      <p className="text-xs text-red-600">
                        Upload failed. Please try again.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Box */}
      {documents.length === 0 && (
        <div className="rounded-lg bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <Upload className="h-5 w-5 flex-shrink-0 text-blue-600" />
            <div className="flex-1">
              <h4 className="font-medium text-blue-900">
                No documents uploaded yet
              </h4>
              <p className="mt-1 text-sm text-blue-700">
                While this step is optional, uploading supporting documents can
                speed up your account verification and unlock additional
                features.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button onClick={previousStep} variant="outline" size="lg">
          Back
        </Button>
        <div className="flex gap-3">
          {!hasUploadedDocuments && (
            <Button onClick={handleSkip} variant="outline" size="lg">
              Skip for Now
            </Button>
          )}
          <Button onClick={handleContinue} disabled={isUploading} size="lg">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
