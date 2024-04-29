import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from '@/auth.config'
import { db } from '@/lib/db'
import { getUserById } from './data/user'

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  events: {
    async linkAccount ({ user }) {
      await db.user.update({
        where: {
          id: user.id
        },
        data: {
          emailVerified: new Date(),
          role: 'USER'
        }
      })
    }
  },
  callbacks: {
    async signIn ({ user, account }) {
      // allow Oauth without  email verification

      if (account?.provider !== 'credentials') {
        return true
      }

      if (!user.id) return false

      const existingUser = await getUserById(user.id)

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false

      // TODO: Add 2FA Check

      return true
    },
    async session ({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role
      }

      if (token.accounts && session.user) {
        session.user.accounts = token.accounts
      }

      return session
    },
    async jwt ({ token }) {
      if (!token.sub) return token
      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      token.role = existingUser.role
      token.accounts = existingUser.accounts

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
})
