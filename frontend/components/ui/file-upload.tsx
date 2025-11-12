import React, { useCallback, useState } from "react";
import { useDropzone, Accept } from "react-dropzone";
import { Upload, FileIcon, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/progress-bar";

export interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  accept?: Accept;
  maxSize?: number; // in bytes
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  uploadProgress?: number;
  uploadStatus?: "idle" | "uploading" | "success" | "error";
  errorMessage?: string;
  helperText?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesSelected,
  accept = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "application/pdf": [".pdf"],
  },
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 1,
  multiple = false,
  disabled = false,
  className,
  uploadProgress,
  uploadStatus = "idle",
  errorMessage,
  helperText,
}) => {
  const [fileError, setFileError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setFileError(null);

      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        if (error.code === "file-too-large") {
          setFileError(
            `File is too large. Max size is ${maxSize / (1024 * 1024)}MB`
          );
        } else if (error.code === "file-invalid-type") {
          setFileError("Invalid file type");
        } else {
          setFileError(error.message);
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        onFilesSelected(acceptedFiles);
      }
    },
    [onFilesSelected, maxSize]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept,
      maxSize,
      maxFiles,
      multiple,
      disabled,
    });

  const displayError = fileError || errorMessage;

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 transition-all duration-200",
          isDragActive && "border-primary bg-primary/5",
          !isDragActive &&
            "border-border hover:border-primary/50 hover:bg-accent/50",
          disabled && "cursor-not-allowed opacity-50",
          displayError && "border-red-500 bg-red-50/50"
        )}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center text-center">
          {uploadStatus === "success" ? (
            <CheckCircle2 className="mb-4 h-12 w-12 text-green-500" />
          ) : uploadStatus === "error" ? (
            <AlertCircle className="mb-4 h-12 w-12 text-red-500" />
          ) : (
            <Upload
              className={cn(
                "mb-4 h-12 w-12",
                isDragActive ? "text-primary" : "text-muted-foreground"
              )}
            />
          )}

          <p className="mb-2 text-sm font-medium">
            {isDragActive ? (
              "Drop files here"
            ) : uploadStatus === "success" ? (
              "Upload successful!"
            ) : uploadStatus === "error" ? (
              "Upload failed"
            ) : (
              <>
                <span className="text-primary">Click to upload</span> or drag
                and drop
              </>
            )}
          </p>

          {helperText && (
            <p className="text-xs text-muted-foreground">{helperText}</p>
          )}

          {!helperText && (
            <p className="text-xs text-muted-foreground">
              {Object.values(accept).flat().join(", ").toUpperCase()} (max{" "}
              {maxSize / (1024 * 1024)}MB)
            </p>
          )}
        </div>
      </div>

      {uploadProgress !== undefined &&
        uploadProgress > 0 &&
        uploadProgress < 100 && (
          <ProgressBar
            progress={uploadProgress}
            label="Uploading"
            variant="default"
          />
        )}

      {displayError && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p>{displayError}</p>
        </div>
      )}

      {acceptedFiles.length > 0 && uploadStatus !== "uploading" && (
        <div className="space-y-2">
          {acceptedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border bg-card p-3"
            >
              <div className="flex items-center gap-3">
                <FileIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              {uploadStatus === "success" && (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
