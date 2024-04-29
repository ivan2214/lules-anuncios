import { faker } from "@faker-js/faker";

import { db } from "../lib/db";
import bcrypt from "bcryptjs";

export const generateRandomStore = async () => {
    const randomStoreName = faker.company.name();
    const randomStoreAddress = faker.location.streetAddress();
    const randomStoreCity = faker.location.city();
    const randomStorePostalCode = faker.location.zipCode();
    const randomStoreEmail = faker.internet.email();
    const randomStoreVerified = faker.datatype.boolean();
    const randomStoreImage = faker.image.urlPicsumPhotos();
    const randomStorePhone = faker.phone.number();
    const storePasword = "store123";
    const hashPassword = await bcrypt.hash(storePasword, 10);
    const randomEmailVerified = faker.datatype.boolean() ? new Date() : null;
  
    return await db.store.create({
      data: {
        name: randomStoreName,
        address: randomStoreAddress,
        city: randomStoreCity,
        postalCode: randomStorePostalCode,
        email: randomStoreEmail,
        verified: randomStoreVerified,
        image: randomStoreImage,
        phone: randomStorePhone,
        hashPassword,
        emailVerified: randomEmailVerified,
        status: "ACTIVE",
      },
    });
  };