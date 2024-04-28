import { db } from "../lib/db";
import {
  categories,
  images,
  mockPlan,
  mockStore,
  randomDescriptions,
  randomPrices,
  randonNameOffers,
} from "./mocks";

export const createManyOffers = async () => {
  for (let i = 0; i < 45; i++) {
    const randomStore =
      mockStore[Math.floor(Math.random() * mockStore?.length)];

    const randomPlan = mockPlan[Math.floor(Math.random() * mockPlan?.length)];

    const randomName =
      randonNameOffers[Math.floor(Math.random() * randonNameOffers?.length)];

    const randomPrice =
      randomPrices[Math.floor(Math.random() * randomPrices?.length)];

    const randomDescription =
      randomDescriptions[
        Math.floor(Math.random() * randomDescriptions?.length)
      ];

    const randomImage = images[Math.floor(Math.random() * images?.length)].url;

    const randomCategory =
      categories[Math.floor(Math.random() * categories?.length)];

 

    const data = {
      title: randomName,
      price: randomPrice,
      description: randomDescription,
    };

    const categorieIsAlreadyCreated = await db.category.findFirst({
      where: {
        name: randomCategory.name,
      },
    });

    const storeIsAlreadyCreated = await db.store.findFirst({
      where: {
        name: randomStore.name,
      },
    });

    const planIsAlreadyCreated = await db.plan.findFirst({
      where: {
        name: randomPlan.name,
      },
    });

   

    await db.offer.create({
      data: {
        ...data,
        images: {
          create: {
            url: randomImage,
          },
        },
        categories: {
          connectOrCreate: {
            where: {
              id: categorieIsAlreadyCreated?.id ?? "",
            },
            create: {
              name: randomCategory.name,
            },
          },
        },
        store: {
          connectOrCreate: {
            where: {
              id: storeIsAlreadyCreated?.id ?? "",
            },
            create: {
              name: randomStore.name,
              address: randomStore.address,
              city: randomStore.city,
              postalCode: randomStore.postalCode,
            },
          },
        },
        Plan: {
          connectOrCreate: {
            where: {
              id: planIsAlreadyCreated?.id ?? "",
            },
            create: {
              name: randomPlan.name,
              description: randomPlan.description,
              price: randomPlan.price,
              offersLimit: randomPlan.offersLimit,
              offerPublishQuantity: randomPlan.offerPublishQuantity,
              isFree: randomPlan.isFree,
            },
          },
        },
      },
    });
    console.log("Creando oferta ...", i);
    
  }
};
