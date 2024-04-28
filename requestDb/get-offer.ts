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
            store: true,
            messages: {
              include: {
                user: true,
                store: true,
              },
            },
          },
        },
      },
    });

    console.log("offer", offer);
    
    return offer;
  } catch (error) {
    console.error(error);
  }
};
