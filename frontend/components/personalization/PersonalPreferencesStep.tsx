import React from "react";
import { Globe, Bell, Eye, Palette, Sun, Moon, Monitor } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "zh", name: "中文" },
  { code: "ar", name: "العربية" },
];

const TIMEZONES = [
  "America/New_York",
  "America/Los_Angeles",
  "America/Chicago",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Asia/Dubai",
  "Australia/Sydney",
];

const THEMES = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export const PersonalPreferencesStep: React.FC = () => {
  const { preferences, updatePreferences, nextStep, previousStep } =
    usePersonalizationStore();

  const handleCommunicationChange = (
    key: keyof typeof preferences.communication,
    value: boolean
  ) => {
    updatePreferences({
      communication: {
        ...preferences.communication,
        [key]: value,
      },
    });
  };

  const handleAccessibilityChange = (
    key: keyof typeof preferences.accessibility,
    value: boolean
  ) => {
    updatePreferences({
      accessibility: {
        ...preferences.accessibility,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#003366]">
          Personal Preferences
        </h2>
        <p className="mt-2 text-muted-foreground">
          Customize your experience to match your needs and preferences.
        </p>
      </div>

      {/* Language & Timezone */}
      <div className="space-y-6 rounded-2xl border bg-card p-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-[#003366]">
          <Globe className="h-5 w-5 text-[#D40E60]" />
          Language & Region
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="language">Preferred Language</Label>
            <Select
              value={preferences.language}
              onValueChange={(value) => updatePreferences({ language: value })}
            >
              <SelectTrigger id="language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={preferences.timezone}
              onValueChange={(value) => updatePreferences({ timezone: value })}
            >
              <SelectTrigger id="timezone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIMEZONES.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz.replace(/_/g, " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Communication Preferences */}
      <div className="space-y-6 rounded-2xl border border-[#D40E60]/20 bg-gradient-to-br from-[#D40E60]/5 to-[#D30B8D]/5 p-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-[#003366]">
          <Bell className="h-5 w-5 text-[#D40E60]" />
          Communication Preferences
        </div>
        <p className="text-sm text-muted-foreground">
          Choose how you'd like to receive updates and notifications
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="email" className="font-medium">
                Email Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive updates via email
              </p>
            </div>
            <Checkbox
              id="email"
              checked={preferences.communication.email}
              onCheckedChange={(checked) =>
                handleCommunicationChange("email", checked as boolean)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="sms" className="font-medium">
                SMS Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Get text message alerts
              </p>
            </div>
            <Checkbox
              id="sms"
              checked={preferences.communication.sms}
              onCheckedChange={(checked) =>
                handleCommunicationChange("sms", checked as boolean)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="inApp" className="font-medium">
                In-App Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Show notifications within the app
              </p>
            </div>
            <Checkbox
              id="inApp"
              checked={preferences.communication.inApp}
              onCheckedChange={(checked) =>
                handleCommunicationChange("inApp", checked as boolean)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="whatsapp" className="font-medium">
                WhatsApp Messages
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive updates on WhatsApp
              </p>
            </div>
            <Checkbox
              id="whatsapp"
              checked={preferences.communication.whatsapp}
              onCheckedChange={(checked) =>
                handleCommunicationChange("whatsapp", checked as boolean)
              }
            />
          </div>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="space-y-6 rounded-2xl border bg-card p-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-[#003366]">
          <Palette className="h-5 w-5 text-[#D40E60]" />
          Appearance
        </div>

        <div className="grid grid-cols-3 gap-3">
          {THEMES.map((theme) => {
            const ThemeIcon =
              theme.value === "light"
                ? Sun
                : theme.value === "dark"
                ? Moon
                : Monitor;

            return (
              <button
                key={theme.value}
                onClick={() => updatePreferences({ theme: theme.value as any })}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all",
                  preferences.theme === theme.value
                    ? "border-[#D40E60] bg-[#D40E60]/5"
                    : "border-border hover:border-[#D40E60]/50"
                )}
              >
                <ThemeIcon
                  className={cn(
                    "h-8 w-8",
                    preferences.theme === theme.value && "text-[#D40E60]"
                  )}
                />
                <span className="text-sm font-medium">{theme.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accessibility Options */}
      <div className="space-y-6 rounded-2xl border border-[#D40E60]/20 bg-gradient-to-br from-[#D40E60]/5 to-[#D30B8D]/5 p-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-[#003366]">
          <Eye className="h-5 w-5 text-[#D40E60]" />
          Accessibility
        </div>
        <p className="text-sm text-muted-foreground">
          Customize the interface to improve readability and usability
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="highContrast" className="font-medium">
                High Contrast Mode
              </Label>
              <p className="text-sm text-muted-foreground">
                Increase contrast for better visibility
              </p>
            </div>
            <Checkbox
              id="highContrast"
              checked={preferences.accessibility.highContrast}
              onCheckedChange={(checked) =>
                handleAccessibilityChange("highContrast", checked as boolean)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="largeText" className="font-medium">
                Large Text
              </Label>
              <p className="text-sm text-muted-foreground">
                Increase font size throughout the app
              </p>
            </div>
            <Checkbox
              id="largeText"
              checked={preferences.accessibility.largeText}
              onCheckedChange={(checked) =>
                handleAccessibilityChange("largeText", checked as boolean)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="screenReader" className="font-medium">
                Screen Reader Support
              </Label>
              <p className="text-sm text-muted-foreground">
                Optimize for screen readers
              </p>
            </div>
            <Checkbox
              id="screenReader"
              checked={preferences.accessibility.screenReader}
              onCheckedChange={(checked) =>
                handleAccessibilityChange("screenReader", checked as boolean)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="keyboardNavigation" className="font-medium">
                Enhanced Keyboard Navigation
              </Label>
              <p className="text-sm text-muted-foreground">
                Improve keyboard-only navigation
              </p>
            </div>
            <Checkbox
              id="keyboardNavigation"
              checked={preferences.accessibility.keyboardNavigation}
              onCheckedChange={(checked) =>
                handleAccessibilityChange(
                  "keyboardNavigation",
                  checked as boolean
                )
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="reducedMotion" className="font-medium">
                Reduced Motion
              </Label>
              <p className="text-sm text-muted-foreground">
                Minimize animations and transitions
              </p>
            </div>
            <Checkbox
              id="reducedMotion"
              checked={preferences.accessibility.reducedMotion}
              onCheckedChange={(checked) =>
                handleAccessibilityChange("reducedMotion", checked as boolean)
              }
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button onClick={previousStep} variant="outline" size="lg">
          Back
        </Button>
        <Button onClick={nextStep} size="lg">
          Continue
        </Button>
      </div>
    </div>
  );
};
