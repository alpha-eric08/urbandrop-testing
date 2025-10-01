import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string(),
    receiveEmails: z.boolean().default(false),
    agreeTerms: z.boolean().refine((value) => value === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const createCustomerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  dateOfBirth: z.date({ required_error: "Date of birth is required" }),
  address: z.string().min(5, "Address must be at least 5 characters"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  zipCode: z.string().min(3, "ZIP code is required"),
});

export const customerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  dateOfBirth: z.date().optional(),
  address: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  subscriptionStatus: z.enum(["Premium", "Basic"]),
  accountStatus: z.enum(["Active", "Inactive", "Pending", "Suspended"]),
});

export const createMerchantSchema = z.object({
  merchantName: z.string().min(2, "Merchant name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  merchantAddress: z.string().min(5, "Address must be at least 5 characters"),
  postCode: z.string().min(3, "Post code must be at least 3 characters"),
  businessType: z.string().min(2, "Business type must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  joinDate: z.string().min(1, "Join date is required"),
});

export const merchantSchema = z.object({
  id: z.string(),
  merchantName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  merchantAddress: z.string(),
  postCode: z.string(),
  businessType: z.string(),
  status: z.enum(["Active", "Inactive", "Pending"]),
  joinDate: z.string(),
  website: z.string().optional(),
  country: z.string(),
  totalOrders: z.number(),
  totalRevenue: z.number(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type CreateCustomerFormData = z.infer<typeof createCustomerSchema>;
export type CustomerFormData = z.infer<typeof customerSchema>;
export type CreateMerchantFormData = z.infer<typeof createMerchantSchema>;
export type Merchant = z.infer<typeof merchantSchema>;
