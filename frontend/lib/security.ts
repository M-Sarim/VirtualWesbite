import DOMPurify from "dompurify";
import { z } from "zod";

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
};

/**
 * Sanitize HTML content while allowing safe tags
 */
export const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "p", "br"],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });
};

/**
 * Validate email format
 */
export const emailSchema = z
  .string()
  .email("Invalid email address")
  .min(1, "Email is required");

/**
 * Validate password strength
 */
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  );

/**
 * Validate UK phone number
 */
export const phoneSchema = z
  .string()
  .regex(/^(\+44|0)[1-9]\d{9}$/, "Invalid UK phone number");

/**
 * Validate company name
 */
export const companyNameSchema = z
  .string()
  .min(2, "Company name must be at least 2 characters")
  .max(100, "Company name must not exceed 100 characters")
  .regex(/^[a-zA-Z0-9\s\-&.,()]+$/, "Company name contains invalid characters");

/**
 * Login form schema
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

/**
 * Validate date of birth (dd/mm/yyyy)
 */
export const dateOfBirthSchema = z
  .string()
  .regex(
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/,
    "Date must be in dd/mm/yyyy format"
  )
  .refine((date) => {
    const [day, month, year] = date.split("/").map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18;
  }, "You must be at least 18 years old");

/**
 * Validate postcode/ZIP
 */
export const postcodeSchema = z
  .string()
  .min(3, "Postcode/ZIP must be at least 3 characters")
  .max(10, "Postcode/ZIP is too long");

/**
 * Signup form schema - Complete User Registration
 */
export const signupSchema = z
  .object({
    // Personal Information
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name too long")
      .regex(/^[a-zA-Z\s\-']+$/, "First name contains invalid characters"),
    middleName: z
      .string()
      .max(50, "Middle name too long")
      .regex(/^[a-zA-Z\s\-']*$/, "Middle name contains invalid characters")
      .optional()
      .or(z.literal("")),
    surname: z
      .string()
      .min(2, "Surname must be at least 2 characters")
      .max(50, "Surname too long")
      .regex(/^[a-zA-Z\s\-']+$/, "Surname contains invalid characters"),
    dateOfBirth: dateOfBirthSchema,
    phone: phoneSchema,
    nationality: z.string().min(2, "Please select your nationality"),

    // Address Details
    addressLine1: z
      .string()
      .min(5, "Address must be at least 5 characters")
      .max(100, "Address too long"),
    addressLine2: z
      .string()
      .max(100, "Address too long")
      .optional()
      .or(z.literal("")),
    cityTown: z
      .string()
      .min(2, "City/Town must be at least 2 characters")
      .max(50, "City/Town name too long")
      .regex(/^[a-zA-Z\s\-']+$/, "City/Town contains invalid characters"),
    postcodeZip: postcodeSchema,
    country: z.string().min(2, "Please select a country"),

    // Company Information
    companyType: z.enum(["LTD Company", "Sole Trader", "Virtual Address"], {
      errorMap: () => ({ message: "Please select a company type" }),
    }),

    // System fields
    role: z.enum(["admin", "user"]),
    terms: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must accept the terms and conditions"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

/**
 * Contact form schema
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name too long"),
  email: emailSchema,
  phone: phoneSchema.optional(),
  company: companyNameSchema.optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message too long"),
});

/**
 * Rate limiting hook for form submissions
 */
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  canAttempt(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];

    // Filter out attempts outside the time window
    const recentAttempts = attempts.filter(
      (time) => now - time < this.windowMs
    );

    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }

    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    return true;
  }

  reset(key: string): void {
    this.attempts.delete(key);
  }
}

/**
 * Generate CSRF token (client-side placeholder)
 */
export const generateCSRFToken = (): string => {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

/**
 * Secure storage wrapper with encryption simulation
 */
export const secureStorage = {
  setItem: (key: string, value: string): void => {
    try {
      // In production, implement proper encryption
      const encoded = btoa(value);
      localStorage.setItem(key, encoded);
    } catch (error) {
      console.error("Storage error:", error);
    }
  },

  getItem: (key: string): string | null => {
    try {
      const encoded = localStorage.getItem(key);
      if (!encoded) return null;
      return atob(encoded);
    } catch (error) {
      console.error("Storage error:", error);
      return null;
    }
  },

  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  },
};

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
