import { faker } from "@faker-js/faker";
import { db } from "../lib/db";
import { Chat, MessageSender, Offer } from "@prisma/client";

interface OfferExtend extends Offer {
  chat: Chat;
}

export const generateRandomMessages = async (offer: OfferExtend) => {
  const randomNumberMessage = faker.number.int({ min: 1, max: 10 });
  for (let i = 0; i < randomNumberMessage; i++) {
    const randomSender = faker.datatype.boolean()
      ? MessageSender.STORE
      : MessageSender.USER;
    const randomContent = faker.lorem.paragraph();
    const users = await db.user.findMany();
    const randomUser = faker.helpers.arrayElement(users);
    const stores = await db.store.findMany();
    const randomStore = faker.helpers.arrayElement(stores);

    await db.message.create({
      data: {
        content: randomContent,
        sender: randomSender,
        store: {
          connect: {
            id: randomStore.id,
          },
        },
        user: {
          connect: {
            id: randomUser.id,
          },
        },
        chat: {
          connect: {
            id: offer.chat.id,
          },
        },
      },
    });

    console.log(`📧 Creando mensajes ${i + 1} de ${randomNumberMessage}...`);
  }
};
