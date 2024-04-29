import { MessageSender, Store } from "@prisma/client";
import * as z from "zod";

export const OfferSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3).max(500).optional(),
  price: z.coerce.number().min(0).max(1000000).optional(),
  categories: z.object({ name: z.string() }).array().min(1),
  images: z.object({ url: z.string() }).array().min(1),
  storeId: z.string().cuid().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const LoginStoreSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export const RegisterStoreSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  postalCode: z.string().min(1, { message: "Postal Code is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  image: z.string().min(1, { message: "Image is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const MessageSchema = z.object({
  content: z.string().min(1, { message: "Please enter a message" }),
  sender: z.enum([MessageSender.STORE, MessageSender.USER]),
  senderId: z.string().cuid({ message: "Sender id is required" }),
  chatId: z.string().cuid().optional(),
  storeId: z.string().cuid().optional(),
});
