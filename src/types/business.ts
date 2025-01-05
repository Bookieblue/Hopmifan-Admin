import { z } from "zod";

export const formSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  businessType: z.enum(["freelancing", "local", "corporate"]),
  businessLocation: z.string().min(1, "Please select a business location"),
  operationType: z.enum(["physical", "remote"]),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  logo: z.any().optional(),
  address: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  description: z.string().min(20, "Description must be at least 20 characters"),
  defaultCurrency: z.string().optional(),
});

export type BusinessFormData = z.infer<typeof formSchema>;