'use server';

import bcrypt from 'bcryptjs';
import { RegisterStoreSchema } from '@/schemas';
import { type RegisterStoreFormValues } from '@/components/auth/store/register-store-form';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';
import { getStoreByEmail } from '@/data/store';
import { db } from '@/lib/db';

export const registerStore = async (values: RegisterStoreFormValues) => {
  const validatedFields = RegisterStoreSchema.safeParse(values);
  console.log({
    ...values
  });

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, address, city, image, name, phone, postalCode, password } = validatedFields.data;

  const existingStore = await getStoreByEmail(email);

  if (existingStore) {
    return { error: 'Email already in use!' };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await db.store.create({
    data: {
      address,
      city,
      image,
      name,
      phone,
      postalCode,
      email,
      hashPassword
    }
  });

  const verificationToken = await generateVerificationToken(email);

  if (verificationToken) {
    await sendVerificationEmail(verificationToken?.email, verificationToken?.token, 'STORE');
  }

  return {
    success: 'Check your email and verify your account!'
  };
};
