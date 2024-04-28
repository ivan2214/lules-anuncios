import { db } from "../lib/db";
import { randonNamesUsers } from "./mocks";

export const createManyUsers = async () => {
  // Crea un array de objetos que representan los usuarios que deseas crear
  const users = randonNamesUsers.map((name) => ({
    name,
    email: `${name}@example.com`,
  }));

  // Crea los usuarios en la base de datos
  await db.user.createMany({ data: users });
};
