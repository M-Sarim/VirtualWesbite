import React, { useState } from "react";
import { Upload, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { usePersonalizationStore } from "@/lib/stores/personalizationStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/ui/file-upload";
import { ImageCropper } from "@/components/ui/image-cropper";

export const ProfilePhotoStep: React.FC = () => {
  const {
    profilePhoto,
    identityVerification,
    updateProfilePhoto,
    nextStep,
    previousStep,
  } = usePersonalizationStore();

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleFileSelected = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
      updateProfilePhoto({ original: file });
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    updateProfilePhoto({
      cropped: croppedImage,
      thumbnail512: croppedImage,
      thumbnail128: croppedImage,
      thumbnail64: croppedImage,
    });
    setShowCropper(false);
  };

  const handleUseIdPhoto = () => {
    if (identityVerification.idFrontPhoto) {
      const idPhoto =
        identityVerification.idFrontPhoto instanceof File
          ? URL.createObjectURL(identityVerification.idFrontPhoto)
          : identityVerification.idFrontPhoto;

      setOriginalImage(idPhoto);
      setShowCropper(true);
    }
  };

  const canContinue = !!profilePhoto.cropped;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#003366]">Profile Photo</h2>
        <p className="mt-2 text-muted-foreground">
          Upload a profile photo that will be displayed on your account. You can
          crop and adjust it to look perfect.
        </p>
      </div>

      {!showCropper ? (
        <>
          {/* Preview */}
          {profilePhoto.cropped ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-[#D40E60]/20">
                  <img
                    src={profilePhoto.cropped}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 rounded-full bg-[#D40E60] p-2">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Looking good!</p>
              <Button variant="outline" onClick={() => setShowCropper(true)}>
                <Upload className="mr-2 h-4 w-4" />
                Change Photo
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Upload Section */}
              <div className="space-y-2">
                <Label>Upload Photo</Label>
                <FileUpload
                  onFilesSelected={handleFileSelected}
                  accept={{ "image/*": [".jpg", ".jpeg", ".png"] }}
                  maxFiles={1}
                  maxSize={10 * 1024 * 1024}
                  helperText="JPG, PNG (max 10MB)"
                />
              </div>

              {/* Use ID Photo Option */}
              {identityVerification.idFrontPhoto && (
                <div className="rounded-lg border border-[#D40E60]/20 bg-gradient-to-br from-[#D40E60]/5 to-[#D30B8D]/5 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-[#003366]">
                        Use photo from your ID
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        We can extract your photo from the ID you uploaded for
                        quick setup
                      </p>
                    </div>
                    <Button variant="outline" onClick={handleUseIdPhoto}>
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Use ID Photo
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-4">
            <p className="mb-4 text-sm text-muted-foreground">
              Adjust your photo to fit perfectly in a circle. You can zoom and
              rotate as needed.
            </p>
            <ImageCropper
              image={originalImage!}
              onCropComplete={handleCropComplete}
              onCancel={() => setShowCropper(false)}
              aspectRatio={1}
              cropShape="round"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button onClick={previousStep} variant="outline" size="lg">
          Back
        </Button>
        <Button onClick={nextStep} disabled={!canContinue} size="lg">
          Continue
        </Button>
      </div>
    </div>
  );
};
