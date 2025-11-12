import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { PersonalizationWizard } from "@/components/personalization";

export default function PersonalizationPage() {
  const navigate = useNavigate();

  // This callback should be called by the wizard when completed
  const handleComplete = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  return <PersonalizationWizard onComplete={handleComplete} />;
}
