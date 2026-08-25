import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number.")
    .max(40)
    .regex(/^[0-9+\-().\s]+$/, "Phone number contains invalid characters."),
  preferredContact: z.enum(["email", "phone", "either"]),
  practiceArea: z.string().trim().min(1, "Please select a practice area."),
  message: z
    .string()
    .trim()
    .min(10, "Please include a brief message.")
    .max(4000),
  consent: z.boolean().refine((v) => v === true, {
    message: "Consent is required before submitting.",
  }),
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const chatMessageSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(4000),
      }),
    )
    .min(1)
    .max(24),
});
