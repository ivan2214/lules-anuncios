import { faker } from "@faker-js/faker";
import { db } from "../lib/db";
import { Offer, Image, Category, Plan, Store } from "@prisma/client";
import bcrypt from "bcryptjs";
import { mockPlan } from "./mocks";

export const generateRandomOffer = async (
  store: Store,
  planIsAlreadyCreated: Plan | null
) => {
  const randomName = faker.commerce.productName();
  const randomPrice = faker.commerce.price();
  const randomDescription = faker.lorem.sentence();
  const randomPlanDescription =
    faker.helpers.arrayElement(mockPlan).description;
  const randomPlanPrice = faker.helpers.arrayElement(mockPlan).price;
  const randomPlanOffersLimit =
    faker.helpers.arrayElement(mockPlan).offersLimit;
  const randomPlanOfferPublishQuantity =
    faker.helpers.arrayElement(mockPlan).offerPublishQuantity;
  const randomPlanIsFree = faker.helpers.arrayElement(mockPlan).isFree;
  const randomPlanName = faker.helpers.arrayElement(mockPlan).name;

  const data = {
    title: randomName,
    price: Number(randomPrice),
    description: randomDescription,
  };

  return await db.offer.create({
    data: {
      ...data,
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
      store: {
        connect: {
          id: store.id,
        },
      },
      chat: {
        create: {
          store: {
            connect: {
              id: store.id,
            },
          },
        },
      },
    },
    include: {
      chat: {
        include: {
          messages: true,
          store: true,
        },
      },
      store: true,
    },
  });
};
