"use server";

import { OfferFormValues } from "@/app/create-offer/components/create-offer-form";
import { db } from "@/lib/db";
import { OfferSchema } from "@/schemas";
import { Image, Offer } from "@prisma/client";

export const createOffer = async (values: OfferFormValues) => {
  let offer: Offer | null = null;
  const validatedFields = OfferSchema.safeParse(values);

  console.log(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { storeId, categories, images, title, description, price } =
    validatedFields.data;

  if (!storeId || !categories || !images || !title || !description || !price) {
    return { error: "Invalid fields!" };
  }

  const categorieIsAlreadyCreated = await db.category.findMany({
    where: {
      name: {
        in: categories.map((category) => category.name),
      },
    },
  });

  const imagesIsAlreadyCreated = await db.image.findMany({
    where: {
      url: {
        in: images.map((image) => image.url),
      },
    },
  });

  if (imagesIsAlreadyCreated.length && categorieIsAlreadyCreated.length) {
    offer = await db.offer.create({
      data: {
        storeId,
        title,
        description,
        price,
        categories: {
          connect: categorieIsAlreadyCreated.map((category) => ({
            name: category.name,
          })),
        },
        images: {
          connect: imagesIsAlreadyCreated.map((image) => ({ id: image.id })),
        },
      },
    });
  }

  if (imagesIsAlreadyCreated.length && !categorieIsAlreadyCreated.length) {
    offer = await db.offer.create({
      data: {
        storeId,
        title,
        description,
        price,
        categories: {
          connect: categories.map((category) => ({
            name: category.name,
          })),
        },
        images: {
          connect: imagesIsAlreadyCreated.map((image) => ({ id: image.id })),
        },
      },
    });
  }

  if (!imagesIsAlreadyCreated.length && categorieIsAlreadyCreated.length) {
    offer = await db.offer.create({
      data: {
        storeId,
        title,
        description,
        price,
        categories: {
          connect: categorieIsAlreadyCreated.map((category) => ({
            name: category.name,
          })),
        },
        images: {
          create: images.map((image) => ({
            url: image.url,
          })),
        },
      },
    });
  }

  if (!imagesIsAlreadyCreated.length && !categorieIsAlreadyCreated.length) {
    offer = await db.offer.create({
      data: {
        storeId,
        title,
        description,
        price,
        categories: {
          create: categories.map((category) => ({
            name: category.name,
          })),
        },
        images: {
          create: images.map((image) => ({
            url: image.url,
          })),
        },
      },
    });
  }

  return { success: "Offer created successfully!", offer };
};
