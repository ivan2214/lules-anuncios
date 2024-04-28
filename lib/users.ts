import { db } from "@/lib/db";
import { Category } from "@prisma/client";

// Función para que los usuarios actualicen sus preferencias
export const updateUserPreferences = async (
  userId: string,
  preferences: string[],
  favoriteCategories?: Category[]
) => {
  try {
    await db.user.update({
      where: { id: userId },
      data: { preferences, favoriteCategories: { set: favoriteCategories } },
    });
  } catch (error) {
    console.error("Error al actualizar las preferencias del usuario:", error);
    throw error;
  }
};

// Función para obtener ofertas recomendadas para un usuario
export const getRecommendedOffers = async (userId: string, take: number) => {
  try {
    // Obtener las preferencias del usuario
    const userPreferences =
      (
        await db.user.findUnique({
          where: { id: userId },
          select: { preferences: true },
        })
      )?.preferences || [];

    // Obtener todas las ofertas que tienen al menos una de las categorías preferidas por el usuario
    const recommendedOffers = await db.offer.findMany({
      where: {
        categories: {
          some: {
            name: {
              in: userPreferences,
            },
          },
        },
      },
      take,
      include: {
        categories: true,
        images: true,
        store: true,
        interactions: true,
        plan: true,
      },
    });

    if (!recommendedOffers || recommendedOffers.length === 0) {
      return await db.offer.findMany({
        take,
        include: {
          categories: true,
          images: true,
          store: true,
          interactions: true,
          plan: true,
        },
      });
    }

    return recommendedOffers;
  } catch (error) {
    console.error("Error al obtener ofertas recomendadas:", error);
    throw error;
  }
};
