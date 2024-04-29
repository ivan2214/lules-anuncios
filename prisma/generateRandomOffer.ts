import { faker } from '@faker-js/faker';
import { db } from '../lib/db';
import { type Store } from '@prisma/client';

export const generateRandomOffer = async (store: Store) => {
  const randomName = faker.commerce.productName();
  const randomPrice = faker.commerce.price();
  const randomDescription = faker.lorem.sentence();

  const data = {
    title: randomName,
    price: Number(randomPrice),
    description: randomDescription
  };

  return await db.offer.create({
    data: {
      ...data,
      store: {
        connect: {
          id: store.id
        }
      },
      chat: {
        create: {
          store: {
            connect: {
              id: store.id
            }
          }
        }
      }
    },
    include: {
      chat: {
        include: {
          messages: true,
          store: true
        }
      },
      store: true
    }
  });
};
