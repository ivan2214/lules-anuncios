"use server";

import { signIn } from "@/auth";
import { LoginStoreFormValues } from "@/components/auth/store/login-store-form";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { getStoreByEmail } from "@/data/store";
import { sendVerificationEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT, DEFAULT_LOGIN_STORE_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/lib/tokens";

export const loginStore = async (values: LoginStoreFormValues) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingStore = await getStoreByEmail(email);

  if (!existingStore || !existingStore.email || !existingStore.hashPassword) {
    return { error: "Email does not exist" };
  }

  if (!existingStore.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingStore.email
    );

    if (verificationToken) {
      await sendVerificationEmail(
        verificationToken?.email,
        verificationToken?.token
      );
    }

    return {
      success: "Confirmation email sent!",
    };
  }

  try {
    await signIn("credentials-store", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_STORE_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
