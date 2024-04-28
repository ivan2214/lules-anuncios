import { faker } from "@faker-js/faker";
import { db } from "../lib/db";

export const createManyUsers = async (
  numberOfUsers: number | undefined = 55
) => {
  const users = Array.from({ length: numberOfUsers }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }));

  await db.user.createMany({ data: users });
};
