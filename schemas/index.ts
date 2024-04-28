import { MessageSender } from "@prisma/client";
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

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export const MessageSchema = z.object({
  content: z.string().min(1, { message: "Please enter a message" }),
  chatId: z.string().cuid({ message: "Chat id is required" }),
  sender: z.enum([MessageSender.STORE, MessageSender.USER]),
});
