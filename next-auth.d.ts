import { type Account, type UserRole } from '@prisma/client'
import { type DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
  id: string
  role: UserRole
  accounts: Account[]
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: UserRole
    accounts: Account[]
  }
}
