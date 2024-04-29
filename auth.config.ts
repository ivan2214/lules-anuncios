import GitHub from 'next-auth/providers/github';
import type { NextAuthConfig } from 'next-auth';
import google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

import bcrypt from 'bcryptjs';

import { LoginSchema, LoginStoreSchema } from '@/schemas';

import { getUserByEmail } from './data/user';
import { getStoreByEmail } from './data/store';

export default {
  providers: [
    GitHub ({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    }),
    google ({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.hashPassword) {
            return null;
          }

          const isValid = await bcrypt.compare(password, user.hashPassword);

          if (isValid) {
            return user;
          }
        }

        return null;
      },
    }),
    Credentials({
      name: 'credentials-store',
      id: 'credentials-store',
      async authorize(credentials) {
        const validatedFields = LoginStoreSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const store = await getStoreByEmail(email);

          if (!store || !store.hashPassword) {
            return null;
          }

          const isValid = await bcrypt.compare(password, store.hashPassword);

          if (isValid) {
            return store;
          }
        }

        return null;
      },

    })
  ]
} satisfies NextAuthConfig;
