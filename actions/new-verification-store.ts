'use server'

import { db } from '@/lib/db'
import { getStoreByEmail } from '@/data/store'
import { getVerificationTokenByToken } from '@/data/verification-token'

export const newVerificationStore = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return { error: 'Token does not exist' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: 'Token has expired' }
  }

  const existingStore = await getStoreByEmail(existingToken.email)

  if (!existingStore) {
    return { error: 'Email does not exist!' }
  }

  await db.store.update({
    where: {
      id: existingStore.id
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email
    }
  })

  await db.verificationToken.delete({
    where: {
      id: existingToken.id
    }
  })

  return { success: 'Email verified', verificated: true }
}
