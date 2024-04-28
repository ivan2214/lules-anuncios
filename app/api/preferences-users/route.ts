import { db } from "@/lib/db";
import { Category, Offer } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, preferences, favoriteCategories, offer } =
      await request.json();
    updateUserPreferences(userId, preferences, favoriteCategories, offer);
    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.log("Error al actualizar las preferencias del usuario:", error);

    console.error("Error al actualizar las preferencias del usuario:", error);
    throw error;
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
          include: {
            offer: true,
          },
        },
      },
    });

    if (!user) {
      return;
    }

    if (
      user?.interactions.some(
        (interaction) => interaction.offer.id === offer?.id
      )
    ) {
      return;
    }

    if (user.preferences.length > 15) {
      await db.user.update({
        where: { id: userId },
        data: {
          preferences,
        },
      });
    }

    await db.user.update({
      where: { id: userId },
      data: {
        preferences: {
          push: preferences,
        },
        favoriteCategories: {
          connect: favoriteCategories?.map((category) => ({
            id: category?.id,
          })),
        },
        interactions: {
          create: {
            offer: {
              connect: {
                id: offer?.id,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("Error al actualizar las preferencias del usuario:", error);
    throw error;
  }
};