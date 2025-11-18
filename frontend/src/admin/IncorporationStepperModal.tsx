import React, { useState } from "react";

export interface IncorporationDraft {
  clientName: string;
  clientEmail: string;
  directors: { name: string; email: string }[];
  shareholders: { name: string; shares: number }[];
  officeAddress: string;
  package: string;
  documents: File[];
  kycStatus: string;
}

interface IncorporationStepperModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (draft: IncorporationDraft) => void;
  initialDraft?: Partial<IncorporationDraft>;
}

const steps = [
  "Client Details",
  "Directors/Shareholders",
  "Registered Office",
  "Packages",
  "Documents/KYC",
  "Review & Submit",
];

export const IncorporationStepperModal: React.FC<
  IncorporationStepperModalProps
> = ({ open, onClose, onSubmit, initialDraft }) => {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<IncorporationDraft>({
    clientName: initialDraft?.clientName || "",
    clientEmail: initialDraft?.clientEmail || "",
    directors: initialDraft?.directors || [{ name: "", email: "" }],
    shareholders: initialDraft?.shareholders || [{ name: "", shares: 100 }],
    officeAddress: initialDraft?.officeAddress || "",
    package: initialDraft?.package || "Digital",
    documents: initialDraft?.documents || [],
    kycStatus: initialDraft?.kycStatus || "Pending",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!open) return null;

  // Validation per step
  const validate = () => {
    const errs: Record<string, string> = {};
    if (step === 0) {
      if (!draft.clientName) errs.clientName = "Required";
      if (!draft.clientEmail) errs.clientEmail = "Required";
    }
    if (step === 1) {
      if (!draft.directors.length || !draft.directors[0].name)
        errs.directors = "At least one director required";
      if (!draft.shareholders.length || !draft.shareholders[0].name)
        errs.shareholders = "At least one shareholder required";
    }
    if (step === 2) {
      if (!draft.officeAddress) errs.officeAddress = "Required";
    }
    return errs;
  };

  const handleNext = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep((s) => s + 1);
  };
  const handlePrev = () => setStep((s) => Math.max(0, s - 1));
  const handleChange = (field: string, value: any) =>
    setDraft((d) => ({ ...d, [field]: value }));

  const handleDirectorChange = (idx: number, field: string, value: string) => {
    setDraft((d) => {
      const directors = [...d.directors];
      directors[idx] = { ...directors[idx], [field]: value };
      return { ...d, directors };
    });
  };
  const handleShareholderChange = (idx: number, field: string, value: any) => {
    setDraft((d) => {
      const shareholders = [...d.shareholders];
      shareholders[idx] = { ...shareholders[idx], [field]: value };
      return { ...d, shareholders };
    });
  };

  const handleAddDirector = () =>
    setDraft((d) => ({
      ...d,
      directors: [...d.directors, { name: "", email: "" }],
    }));
  const handleAddShareholder = () =>
    setDraft((d) => ({
      ...d,
      shareholders: [...d.shareholders, { name: "", shares: 0 }],
    }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setDraft((d) => ({ ...d, documents: Array.from(files) }));
    }
  };

  const handleSubmit = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) onSubmit(draft);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="mb-4 flex items-center gap-2">
          {steps.map((s, i) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded ${
                i <= step ? "bg-[#D30B5F]" : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>
        <h2 className="text-xl font-bold mb-4">{steps[step]}</h2>
        {/* Step content */}
        {step === 0 && (
          <div className="space-y-3">
            <input
              className="input input-bordered w-full"
              placeholder="Client Name"
              value={draft.clientName}
              onChange={(e) => handleChange("clientName", e.target.value)}
            />
            {errors.clientName && (
              <div className="text-red-500 text-xs">{errors.clientName}</div>
            )}
            <input
              className="input input-bordered w-full"
              placeholder="Client Email"
              value={draft.clientEmail}
              onChange={(e) => handleChange("clientEmail", e.target.value)}
            />
            {errors.clientEmail && (
              <div className="text-red-500 text-xs">{errors.clientEmail}</div>
            )}
          </div>
        )}
        {step === 1 && (
          <div className="space-y-3">
            <div>
              <div className="font-semibold mb-1">Directors</div>
              {draft.directors.map((dir, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    className="input input-bordered flex-1"
                    placeholder="Name"
                    value={dir.name}
                    onChange={(e) =>
                      handleDirectorChange(i, "name", e.target.value)
                    }
                  />
                  <input
                    className="input input-bordered flex-1"
                    placeholder="Email"
                    value={dir.email}
                    onChange={(e) =>
                      handleDirectorChange(i, "email", e.target.value)
                    }
                  />
                </div>
              ))}
              <button
                className="btn btn-xs btn-outline"
                onClick={handleAddDirector}
              >
                Add Director
              </button>
              {errors.directors && (
                <div className="text-red-500 text-xs">{errors.directors}</div>
              )}
            </div>
            <div>
              <div className="font-semibold mb-1">Shareholders</div>
              {draft.shareholders.map((shr, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    className="input input-bordered flex-1"
                    placeholder="Name"
                    value={shr.name}
                    onChange={(e) =>
                      handleShareholderChange(i, "name", e.target.value)
                    }
                  />
                  <input
                    className="input input-bordered w-24"
                    type="number"
                    placeholder="Shares"
                    value={shr.shares}
                    onChange={(e) =>
                      handleShareholderChange(
                        i,
                        "shares",
                        Number(e.target.value)
                      )
                    }
                  />
                </div>
              ))}
              <button
                className="btn btn-xs btn-outline"
                onClick={handleAddShareholder}
              >
                Add Shareholder
              </button>
              {errors.shareholders && (
                <div className="text-red-500 text-xs">
                  {errors.shareholders}
                </div>
              )}
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-3">
            <input
              className="input input-bordered w-full"
              placeholder="Registered Office Address"
              value={draft.officeAddress}
              onChange={(e) => handleChange("officeAddress", e.target.value)}
            />
            {errors.officeAddress && (
              <div className="text-red-500 text-xs">{errors.officeAddress}</div>
            )}
          </div>
        )}
        {step === 3 && (
          <div className="space-y-3">
            <select
              className="input input-bordered w-full"
              value={draft.package}
              onChange={(e) => handleChange("package", e.target.value)}
            >
              <option value="Digital">Digital</option>
              <option value="Print">Print</option>
              <option value="Privacy">Privacy</option>
              <option value="International">International</option>
            </select>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-3">
            <input
              className="input input-bordered w-full"
              type="file"
              multiple
              onChange={handleFileChange}
            />
            <select
              className="input input-bordered w-full"
              value={draft.kycStatus}
              onChange={(e) => handleChange("kycStatus", e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        )}
        {step === 5 && (
          <div className="space-y-3">
            <div>
              <b>Client:</b> {draft.clientName} ({draft.clientEmail})
            </div>
            <div>
              <b>Directors:</b> {draft.directors.map((d) => d.name).join(", ")}
            </div>
            <div>
              <b>Shareholders:</b>{" "}
              {draft.shareholders
                .map((s) => `${s.name} (${s.shares})`)
                .join(", ")}
            </div>
            <div>
              <b>Office:</b> {draft.officeAddress}
            </div>
            <div>
              <b>Package:</b> {draft.package}
            </div>
            <div>
              <b>KYC:</b> {draft.kycStatus}
            </div>
            <div>
              <b>Documents:</b> {draft.documents.length} file(s) uploaded
            </div>
          </div>
        )}
        <div className="flex justify-between mt-6">
          <button
            className="btn btn-outline"
            onClick={handlePrev}
            disabled={step === 0}
          >
            Back
          </button>
          {step < steps.length - 1 ? (
            <button className="btn btn-primary" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button className="btn btn-success" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
