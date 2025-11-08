import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { contactSchema, RateLimiter } from "@/lib/security";
import { z } from "zod";

type ContactFormData = z.infer<typeof contactSchema>;

// Rate limiter: max 3 submissions per 60 seconds
const rateLimiter = new RateLimiter(3, 60000);

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Check rate limit
    if (!rateLimiter.canAttempt("contact-form")) {
      toast.error("Too many requests", {
        description: "Please wait a moment before submitting again.",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In production, implement actual form submission to backend
      console.log("Contact form data:", data);

      toast.success("Message sent!", {
        description: "We'll get back to you soon.",
      });

      setSubmitted(true);
      reset();

      // Reset submitted state after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      toast.error("Submission failed", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Success message */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
        >
          <CheckCircle2 className="w-5 h-5 text-green-500" aria-hidden="true" />
          <div>
            <p className="font-medium text-green-800">
              Thanks for reaching out!
            </p>
            <p className="text-sm text-green-600">We'll be in touch soon.</p>
          </div>
        </motion.div>
      )}

      {/* Name and Email in a row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name field */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <Label htmlFor="name" className="text-gray-600 text-sm font-normal">
            First Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder=""
            {...register("name")}
            className={`h-12 bg-white border-gray-300 ${
              errors.name ? "border-red-500" : ""
            }`}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-sm text-red-500 flex items-center gap-1"
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
          <Label htmlFor="email" className="text-gray-600 text-sm font-normal">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder=""
            {...register("email")}
            className={`h-12 bg-white border-gray-300 ${
              errors.email ? "border-red-500" : ""
            }`}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-sm text-red-500 flex items-center gap-1"
              role="alert"
            >
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
              {errors.email.message}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Phone and Company in a row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone field */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <Label htmlFor="phone" className="text-gray-600 text-sm font-normal">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder=""
            {...register("phone")}
            className={`h-12 bg-white border-gray-300 ${
              errors.phone ? "border-red-500" : ""
            }`}
            aria-invalid={errors.phone ? "true" : "false"}
          />
          {errors.phone && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-sm text-red-500 flex items-center gap-1"
              role="alert"
            >
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
              {errors.phone.message}
            </motion.p>
          )}
        </motion.div>

        {/* Company field */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <Label
            htmlFor="company"
            className="text-gray-600 text-sm font-normal"
          >
            Company Name
          </Label>
          <Input
            id="company"
            type="text"
            placeholder=""
            {...register("company")}
            className={`h-12 bg-white border-gray-300 ${
              errors.company ? "border-red-500" : ""
            }`}
            aria-invalid={errors.company ? "true" : "false"}
          />
          {errors.company && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-sm text-red-500 flex items-center gap-1"
              role="alert"
            >
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
              {errors.company.message}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Message field */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-2"
      >
        <Label htmlFor="message" className="text-gray-600 text-sm font-normal">
          Message
        </Label>
        <Textarea
          id="message"
          rows={6}
          placeholder=""
          {...register("message")}
          className={`resize-none bg-white border-gray-300 ${
            errors.message ? "border-red-500" : ""
          }`}
          aria-invalid={errors.message ? "true" : "false"}
        />
        {errors.message && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-sm text-red-500 flex items-center gap-1"
            role="alert"
          >
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            {errors.message.message}
          </motion.p>
        )}
      </motion.div>

      {/* Submit button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-end"
      >
        <Button
          type="submit"
          className="px-8 py-6 bg-gradient-to-r from-[#D30B5F] to-[#FF1F7A] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#D30B5F]/30 transition-all duration-300 text-base"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2
                className="w-5 h-5 animate-spin mr-2"
                aria-hidden="true"
              />
              Sending...
            </>
          ) : (
            "Submit Enquiry"
          )}
        </Button>
      </motion.div>
    </form>
  );
}
