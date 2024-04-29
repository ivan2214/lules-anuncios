import { faker } from "@faker-js/faker";
import { db } from "../lib/db";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

export const createManyUsers = async () => {
  const password = "123456";
  const hashPassword = await bcrypt.hash(password, 10);
  const numberOfUsers = faker.number.int({ min: 10, max: 45 });

  for (let i = 0; i < numberOfUsers; i++) {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      image: faker.image.avatar(),
      role: faker.datatype.boolean() ? UserRole.ANNONYMOUS : UserRole.USER,
      hashPassword,
      emailVerified: faker.datatype.boolean() ? new Date() : null,
    };

    await db.user.create({ data: user });
    console.log(`👤 Creando usuarios ${i + 1} de ${numberOfUsers}...`);
  }
  console.log("--------------------------------------");
};
