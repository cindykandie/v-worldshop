import { z } from "zod";

const imageUrlSchema = z.union([
  z
    .string()
    .trim()
    .url("Image URL must be a valid URL")
    .max(2000, "Image URL is too long"),
  z.literal(""),
]);

const dateSchema = z.coerce
  .date()
  .refine((value) => !Number.isNaN(value.getTime()), "Invalid date");

const priceSchema = z.coerce
  .number()
  .int("Price must be a whole number")
  .min(0, "Price must be 0 or more");

export const workshopInputSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  date: dateSchema,
  time: z.string().trim().min(1, "Time is required"),
  location: z.string().trim().min(1, "Location is required"),
  price: priceSchema,
  imageUrl: imageUrlSchema.optional(),
  isPublished: z.coerce.boolean(),
});

export const workshopUpdateSchema = workshopInputSchema.partial();
