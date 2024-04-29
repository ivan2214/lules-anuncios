import { faker } from '@faker-js/faker';
import { db } from '../lib/db';
import { type Offer, type Image } from '@prisma/client';

export const generateRandomImages = async (offer: Offer) => {
  const randomNumerImages = faker.number.int({ min: 1, max: 4 });
  const imagesCreatedForOffers: Image[] = [];
  for (let i = 0; i < randomNumerImages; i++) {
    const image = await db.image.create({
      data: {
        url: faker.image.urlPicsumPhotos(),
        offer: {
          connect: {
            id: offer.id
          }
        }
      }
    });
    imagesCreatedForOffers.push(image);
    console.log(`📸 Creando imagenes ${i + 1} de ${randomNumerImages}...`);
  }
};
