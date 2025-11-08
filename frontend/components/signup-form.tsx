import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Loader2,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { signupSchema } from "@/lib/security";
import { z } from "zod";

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const password = watch("password");

  // Calculate password strength
  const calculatePasswordStrength = (pwd: string): number => {
    if (!pwd) return 0;
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    return strength;
  };

  // Update password strength indicator
  useState(() => {
    setPasswordStrength(calculatePasswordStrength(password || ""));
  });

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In production, implement actual registration
      console.log("Signup data:", data);

      toast.success("Account created!", {
        description: "Check your email to verify your account.",
      });

      setSubmitted(true);
    } catch (error) {
      toast.error("Registration failed", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-orange-500";
    if (passwordStrength === 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6 py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle2
              className="w-8 h-8 text-green-500"
              aria-hidden="true"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-semibold mb-2">Account Created!</h3>
          <p className="text-muted-foreground">
            Check your email to verify your account and get started.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="outline"
            className="w-full glass"
            onClick={() => {
              toast.info("Verification email sent", {
                description: "Please check your inbox.",
              });
            }}
          >
            Resend Email
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Full Name field */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          {...register("name")}
          className={errors.name ? "border-destructive" : ""}
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-sm text-destructive flex items-center gap-1"
            role="alert"
          >
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            {errors.name.message}
          </motion.p>
        )}
      </motion.div>

      {/* Email field */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <Label htmlFor="email">Business Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          className={errors.email ? "border-destructive" : ""}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-sm text-destructive flex items-center gap-1"
            role="alert"
          >
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            {errors.email.message}
          </motion.p>
        )}
      </motion.div>

      {/* Password field with strength indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password")}
            onChange={(e) => {
              register("password").onChange(e);
              setPasswordStrength(calculatePasswordStrength(e.target.value));
            }}
            className={`pr-10 ${errors.password ? "border-destructive" : ""}`}
            aria-invalid={errors.password ? "true" : "false"}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Password strength indicator */}
        {password && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-1"
          >
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i < passwordStrength
                      ? getPasswordStrengthColor()
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Strength:{" "}
              <span className="font-medium">{getPasswordStrengthLabel()}</span>
            </p>
          </motion.div>
        )}

        {errors.password && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-sm text-destructive flex items-center gap-1"
            role="alert"
          >
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            {errors.password.message}
          </motion.p>
        )}
      </motion.div>

      {/* Confirm Password field */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-2"
      >
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("confirmPassword")}
            className={`pr-10 ${
              errors.confirmPassword ? "border-destructive" : ""
            }`}
            aria-invalid={errors.confirmPassword ? "true" : "false"}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-sm text-destructive flex items-center gap-1"
            role="alert"
          >
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            {errors.confirmPassword.message}
          </motion.p>
        )}
      </motion.div>

      {/* Business Type - removed for now as not in schema */}

      {/* Terms acceptance */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-2"
      >
        <div className="flex items-start gap-2">
          <Checkbox
            id="terms"
            {...register("terms")}
            aria-invalid={errors.terms ? "true" : "false"}
          />
          <Label
            htmlFor="terms"
            className="text-sm cursor-pointer leading-relaxed"
          >
            I agree to the{" "}
            <a href="#" className="text-primary hover:underline">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </Label>
        </div>
        {errors.terms && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-sm text-destructive flex items-center gap-1"
            role="alert"
          >
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            {errors.terms.message}
          </motion.p>
        )}
      </motion.div>

      {/* Submit button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2
                className="w-4 h-4 animate-spin mr-2"
                aria-hidden="true"
              />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </motion.div>
    </form>
  );
}
