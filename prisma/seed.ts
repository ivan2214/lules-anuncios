import { PrismaClient } from "@prisma/client";
import { createManyOffers } from "./createManyOffers";
import { createManyUsers } from "./createManyUsers";

const prismaDb = new PrismaClient();

async function main() {
  await createManyUsers();
  await createManyOffers();
}
main()
  .then(async () => {
    await prismaDb.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaDb.$disconnect();
    process.exit(1);
  });
