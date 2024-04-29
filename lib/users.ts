'use server'
import { db } from '@/lib/db'
import { type Category } from '@prisma/client'
import { revalidatePath } from 'next/cache'

// Función para que los usuarios actualicen sus preferencias
export const updateUserPreferences = async (
  userId: string,
  preferences: string[],
  favoriteCategories?: Category[]
) => {
  try {
    await db.user.update({
      where: { id: userId },
      data: { preferences, favoriteCategories: { set: favoriteCategories } }
    })
  } catch (error) {
    console.error('Error al actualizar las preferencias del usuario:', error)
    throw error
  }
}

export const getRecommendedOffers = async (
  userId?: string | null,
  take?: number
) => {
  try {
    if (!userId) {
      return await db.offer.findMany({
        take,
        include: {
          categories: true,
          images: true,
          store: true,
          interactions: true
        }
      })
    }

    // Obtener las preferencias del usuario
    const userPreferences =
      (
        await db.user.findUnique({
          where: { id: userId },
          select: { preferences: true }
        })
      )?.preferences ?? []

    // Obtener las ofertas basadas en las preferencias del usuario
    const offersBasedOnPreferences = await db.offer.findMany({
      where: {
        categories: {
          some: {
            name: {
              in: userPreferences
            }
          }
        }
      },
      orderBy: {
        interactions: {
          _count: 'desc'
        }
      },
      take,
      include: {
        categories: true,
        images: true,
        store: true,
        interactions: true
      }
    })

    // Obtener las ofertas que le gustaron al usuario
    const likedOfferIds = (
      await db.userOfferInteraction.findMany({
        where: {
          userId,
          liked: true
        },
        select: {
          offerId: true
        }
      })
    ).map((interaction) => interaction.offerId)

    // Obtener las ofertas que el usuario ha visto
    const viewedOfferIds = (
      await db.userOfferInteraction.findMany({
        where: {
          userId,
          viewed: true
        },
        select: {
          offerId: true
        }
      })
    ).map((interaction) => interaction.offerId)

    // Obtener las ofertas que el usuario ha visto pero no ha marcado como gustadas
    const unlikedViewedOfferIds = (
      await db.userOfferInteraction.findMany({
        where: {
          userId,
          viewed: true,
          liked: false
        },
        select: {
          offerId: true
        }
      })
    ).map((interaction) => interaction.offerId)

    // Obtener las ofertas que no han sido recomendadas y que el usuario no ha visto ni marcado como gustadas
    const unviewedUnlikedOffers = await db.offer.findMany({
      where: {
        id: {
          notIn: [
            ...viewedOfferIds,
            ...likedOfferIds,
            ...unlikedViewedOfferIds
          ],
          not: {
            in: offersBasedOnPreferences.map((offer) => offer.id)
          }
        }
      },
      take,
      include: {
        categories: true,
        images: true,
        store: true,
        interactions: true
      }
    })

    // Combinar las ofertas basadas en preferencias con las no vistas ni marcadas como gustadas
    const recommendedOffers = [
      ...offersBasedOnPreferences,
      ...unviewedUnlikedOffers
    ]

    // Si no hay ofertas recomendadas, obtener ofertas generales
    if (recommendedOffers.length === 0) {
      return await db.offer.findMany({
        take,
        include: {
          categories: true,
          images: true,
          store: true,
          interactions: true
        }
      })
    }

    // Devolver las ofertas recomendadas
    return recommendedOffers
  } catch (error) {
    console.error('Error al obtener ofertas recomendadas:', error)
    throw error
  } finally {
    revalidatePath('/')
  }
}
