import * as z from "zod";

export const OfferSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3).max(500).optional(),
  price: z.coerce.number().min(0).max(1000000).optional(),
  categories: z.object({ name: z.string() }).array().min(1),
  images: z.object({ url: z.string() }).array().min(1),
  storeId: z.string().cuid().optional(),
});
