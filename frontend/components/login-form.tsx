import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { loginSchema } from "@/lib/security";
import { z } from "zod";

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In production, implement actual authentication
      console.log("Login data:", data);

      toast.success("Welcome back!", {
        description: "You have successfully signed in.",
      });

      // Redirect to dashboard or home
      // navigate('/dashboard');
    } catch (error) {
      toast.error("Login failed", {
        description: "Invalid credentials. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email field */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          className={`transition-all ${
            errors.email
              ? "border-destructive focus-visible:ring-destructive"
              : ""
          }`}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-sm text-destructive flex items-center gap-1"
            id="email-error"
            role="alert"
          >
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            {errors.email.message}
          </motion.p>
        )}
      </motion.div>

      {/* Password field */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password")}
            className={`pr-10 transition-all ${
              errors.password
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }`}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Eye className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>
        {errors.password && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-sm text-destructive flex items-center gap-1"
            id="password-error"
            role="alert"
          >
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            {errors.password.message}
          </motion.p>
        )}
      </motion.div>

      {/* Remember me and Forgot password */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Checkbox id="remember" aria-label="Remember me" />
          <Label htmlFor="remember" className="text-sm cursor-pointer">
            Remember me
          </Label>
        </div>
        <a
          href="#"
          className="text-sm text-primary hover:underline focus-ring"
          onClick={(e) => {
            e.preventDefault();
            toast.info("Password reset", {
              description: "Check your email for reset instructions.",
            });
          }}
        >
          Forgot password?
        </a>
      </motion.div>

      {/* Submit button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
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
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </motion.div>
    </form>
  );
}
