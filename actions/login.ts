'use server'

import { signIn } from '@/auth'
import { type LoginFormValues } from '@/components/auth/login-form'
import { LoginSchema } from '@/schemas'
import { AuthError } from 'next-auth'
import { getUserByEmail } from '@/data/user'
import { sendVerificationEmail } from '@/lib/mail'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { generateVerificationToken } from '@/lib/tokens'

export const login = async (values: LoginFormValues) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser?.email || !existingUser.hashPassword) {
    return { error: 'Email does not exist' }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email)

    if (verificationToken) {
      await sendVerificationEmail(verificationToken?.email, verificationToken?.token)
    }

    return {
      success: 'Confirmation email sent!'
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }
    throw error
  }
}
