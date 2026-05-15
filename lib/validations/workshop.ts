import { z } from "zod";

const imageUrlSchema = z.union([
  z.literal(""),
  z
    .string()
    .trim()
    .max(2000, "Image URL is too long")
    .refine(
      (value) => {
        try {
          new URL(value);
          return true;
        } catch {
          return value.startsWith("/");
        }
      },
      "Image URL must be a full URL (https://...) or a relative path starting with /"
    ),
]);

const dateSchema = z.coerce
  .date()
  .refine((value) => !Number.isNaN(value.getTime()), "Invalid date");

const priceSchema = z.coerce
  .number()
  .int("Price must be a whole number")
  .min(0, "Price must be 0 or more");

const bookingUrlSchema = z.union([
  z.literal(""),
  z.string().trim().url("Booking URL must be a valid URL (https://...)").max(2000),
]);

export const workshopInputSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  date: dateSchema,
  time: z.string().trim().min(1, "Time is required"),
  location: z.string().trim().min(1, "Location is required"),
  price: priceSchema,
  imageUrl: imageUrlSchema.optional(),
  bookingUrl: bookingUrlSchema.optional(),
  isPublished: z.coerce.boolean(),
});

export const workshopUpdateSchema = workshopInputSchema.partial();
