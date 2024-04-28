"use server";

import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { MessageFormValues } from "@/app/(routes)/offer/[offerId]/components/chat-message-form";
import { MessageSchema } from "@/schemas";

export const sendComment = async (values: MessageFormValues) => {
  const validatedFields = MessageSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { chatId, content, sender, userId } = validatedFields.data;

  const message = await db.message.create({
    data: {
      content,
      sender,
      chatId,
      userId,
    },
  });

  return {
    success: "Check your email and verify your account!",
  };
};
