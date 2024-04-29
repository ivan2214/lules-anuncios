import { faker } from "@faker-js/faker";
import { db } from "../lib/db";
import { Offer, Image, Category, Plan, Store } from "@prisma/client";
import bcrypt from "bcryptjs";
import { mockPlan } from "./mocks";
import { generateRandomStore } from "./generateRandomStore";
import { generateRandomOffer } from "./generateRandomOffer";
import { generateRandomImages } from "./generateRandomImages";
import { generateRandomMessages } from "./generateRandomMessages";
import { generateRandomCategories } from "./generateRandomCategories";

export const createManyOffers = async () => {
  const randomNumberOffers = faker.number.int({ min: 10, max: 45 });
  for (let i = 0; i < randomNumberOffers; i++) {
    const randomPlanName = faker.helpers.arrayElement(mockPlan).name;

    const planIsAlreadyCreated = await db.plan.findFirst({
      where: {
        name: randomPlanName,
      },
    });

    const store = await generateRandomStore();
    const offer = await generateRandomOffer(
      store,
      planIsAlreadyCreated
    );

    await generateRandomCategories(offer);
    await generateRandomImages(offer);
    await generateRandomMessages(offer);

    console.log(`💼 Creando ofertas ${i + 1} de ${randomNumberOffers}...`);
    console.log("--------------------------------------");
  }
};
