import { faker } from "@faker-js/faker";
import { db } from "../lib/db";
import { mockPlan } from "./mocks";

export const createManyOffers = async () => {
  for (let i = 0; i < 45; i++) {
    const randomName = faker.commerce.productName();
    const randomPrice = faker.commerce.price();
    const randomDescription = faker.lorem.sentence();
    const randomImage = faker.image.urlPicsumPhotos();
    const randomCategory = faker.commerce.department();
    const randomStoreName = faker.company.name();
    const randomStoreAddress = faker.location.streetAddress();
    const randomStoreCity = faker.location.city();
    const randomStorePostalCode = faker.location.zipCode();
    const randomStoreEmail = faker.internet.email();
    const randomStoreVerified = faker.datatype.boolean();
    const randomPlanName = faker.helpers.arrayElement(mockPlan).name;
    const randomPlanDescription = faker.lorem.paragraph();
    const randomPlanPrice = faker.commerce.price();
    const randomPlanOffersLimit = faker.helpers.arrayElement(mockPlan).offersLimit;
    const randomPlanOfferPublishQuantity = faker.number.int({
      min: 1,
      max: 10,
    });
    const randomPlanIsFree = faker.helpers.arrayElement(mockPlan).isFree;

    const data = {
      title: randomName,
      price: Number(randomPrice),
      description: randomDescription,
    };

    const categorieIsAlreadyCreated = await db.category.findFirst({
      where: {
        name: randomCategory,
      },
    });

    const storeIsAlreadyCreated = await db.store.findFirst({
      where: {
        name: randomStoreName,
      },
    });

    const planIsAlreadyCreated = await db.plan.findFirst({
      where: {
        name: randomPlanName,
      },
    });

    const imageIsAlreadyCreated = await db.image.findFirst({
      where: {
        url: randomImage,
      },
    });

    await db.offer.create({
      data: {
        ...data,
        images: {
          connectOrCreate: {
            where: {
              id: imageIsAlreadyCreated?.id ?? "",
            },
            create: {
              url: randomImage,
            },
          },
        },
        categories: {
          connectOrCreate: {
            where: {
              id: categorieIsAlreadyCreated?.id ?? "",
            },
            create: {
              name: randomCategory,
            },
          },
        },
        store: {
          connectOrCreate: {
            where: {
              id: storeIsAlreadyCreated?.id ?? "",
            },
            create: {
              name: randomStoreName,
              address: randomStoreAddress,
              city: randomStoreCity,
              postalCode: randomStorePostalCode,
              email: randomStoreEmail,
              verified: randomStoreVerified,
            },
          },
        },
        plan: {
          connectOrCreate: {
            where: {
              id: planIsAlreadyCreated?.id ?? "",
            },
            create: {
              name: randomPlanName,
              description: randomPlanDescription,
              price: Number(randomPlanPrice),
              offersLimit: randomPlanOffersLimit,
              offerPublishQuantity: randomPlanOfferPublishQuantity,
              isFree: randomPlanIsFree,
            },
          },
        },
      },
    });
    console.log("Creando oferta ...", i);
  }
};
