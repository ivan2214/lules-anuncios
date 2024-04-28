import { db } from "@/lib/db";

export const getOffer = async (offerId: string) => {
  try {
    const offer = await db.offer.findUnique({
      where: {
        id: offerId,
      },
      include: {
        store: true,
        categories: true,
        images: true,
        chat: {
          include: {
            messages: true,
          },
        },
      },
    });
    return offer;
  } catch (error) {
    console.error(error);
  }
};
