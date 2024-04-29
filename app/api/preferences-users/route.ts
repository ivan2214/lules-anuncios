import { db } from '@/lib/db'
import { type Category, type Offer } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST (request: Request) {
  try {
    const { userId, preferences, favoriteCategories, offer } = await request.json()
    updateUserPreferences(userId, preferences, favoriteCategories, offer).catch((error) => {
      console.error(error)
    })
    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.log('Error al actualizar las preferencias del usuario:', error)

    console.error('Error al actualizar las preferencias del usuario:', error)
    throw error
  }
}

export const updateUserPreferences = async (
  userId: string,
  preferences: string[],
  favoriteCategories?: Category[],
  offer?: Offer
) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        favoriteCategories: true,
        interactions: {
          where: {
            offerId: offer?.id
          }
        }
      }
    })

    if (!user) {
      return
    }

    if (user.interactions.length > 0) {
      return
    }

    if (user.preferences.length > 15) {
      await db.user.update({
        where: { id: userId },
        data: {
          preferences
        }
      })
    }

    await db.user.update({
      where: { id: userId },
      data: {
        preferences: {
          push: preferences
        },
        favoriteCategories: {
          connect: favoriteCategories?.map((category) => ({
            id: category?.id
          }))
        },
        interactions: {
          create: {
            offer: {
              connect: {
                id: offer?.id
              }
            }
          }
        }
      }
    })
  } catch (error) {
    console.error('Error al actualizar las preferencias del usuario:', error)
    throw error
  } finally {
    revalidatePath('/', 'page')
  }
}
