import { faker } from "@faker-js/faker";
import { db } from "../lib/db";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

export const createManyUsers = async (
  numberOfUsers: number | undefined = 55
) => {
  const password = "123456";
  const hashPassword = await bcrypt.hash(password, 10);
  const users = Array.from({ length: numberOfUsers }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    image: faker.image.avatar(),
    role: faker.datatype.boolean() ? UserRole.ADMIN : UserRole.USER,
    hashPassword,
    emailVerified: faker.datatype.boolean() ? new Date() : null,
  }));

  await db.user.createMany({ data: users });
};
