import { faker } from "@faker-js/faker";
import { db } from "../lib/db";
import { mockPlan } from "./mocks";
import { Image, MessageSender } from "@prisma/client";

export const createManyOffers = async () => {
  const randomNumberOffers = faker.number.int({ min: 1, max: 45 });
  for (let i = 0; i < randomNumberOffers; i++) {
    const randomName = faker.commerce.productName();
    const randomPrice = faker.commerce.price();
    const randomDescription = faker.lorem.sentence();
    const randomCategory = faker.commerce.department();
    const randomStoreName = faker.company.name();
    const randomStoreAddress = faker.location.streetAddress();
    const randomStoreCity = faker.location.city();
    const randomStorePostalCode = faker.location.zipCode();
    const randomStoreEmail = faker.internet.email();
    const randomStoreVerified = faker.datatype.boolean();
    const randomStoreImage = faker.image.urlPicsumPhotos();
    const randomStorePhone = faker.phone.number();
    const randomPlanName = faker.helpers.arrayElement(mockPlan).name;
    const randomPlanDescription = faker.lorem.paragraph();
    const randomPlanPrice = faker.commerce.price();
    const randomPlanOffersLimit =
      faker.helpers.arrayElement(mockPlan).offersLimit;
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

    const planIsAlreadyCreated = await db.plan.findFirst({
      where: {
        name: randomPlanName,
      },
    });

    const store = await db.store.create({
      data: {
        name: randomStoreName,
        address: randomStoreAddress,
        city: randomStoreCity,
        postalCode: randomStorePostalCode,
        email: randomStoreEmail,
        verified: randomStoreVerified,
        image: randomStoreImage,
        phone: randomStorePhone,
      },
    });

    let imagesCreatedForOffers: Image[] = [];

    const offer = await db.offer.create({
      data: {
        ...data,
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

    const randomNumerImages = faker.number.int({ min: 1, max: 4 });
    for (let i = 0; i < randomNumerImages; i++) {
      const image = await db.image.create({
        data: {
          url: faker.image.urlPicsumPhotos(),
          offer: {
            connect: {
              id: offer.id,
            },
          },
        },
      });
      imagesCreatedForOffers.push(image);
      console.log(`Creando imagenes ${i + 1} de ${randomNumerImages}`);
    }

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

      if (randomSender === MessageSender.STORE) {
        await db.message.create({
          data: {
            content: randomContent,
            sender: randomSender,
            store: {
              connect: {
                id: randomStore.id,
              },
            },
            chat: {
              connect: {
                id: offer.chat.id,
              },
            },
          },
        });
      }

      if (randomSender === MessageSender.USER) {
        await db.message.create({
          data: {
            content: randomContent,
            sender: randomSender,
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
      }

      console.log(`Creando mensajes ${i + 1} de ${randomNumberMessage}...`);
    }

    console.log(`Creando ofertas ${i + 1} de ${randomNumberOffers}...`);
  }
};
