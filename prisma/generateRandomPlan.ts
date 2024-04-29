import { faker } from '@faker-js/faker';
import { db } from '../lib/db';
import { BillingCycle, PaymentStatus } from '@prisma/client';
import { mockPlan } from './mocks';

export const generateRandomPlan = async () => {
  const randomIndex = faker.number.int({
    min: 0,
    max: mockPlan.length - 1
  });
  const selectedPlan = mockPlan[randomIndex];

  // Buscar un plan existente en la base de datos con el mismo nombre
  const existingPlan = await db.plan.findFirst({
    where: { name: selectedPlan.name }
  });

  // Si el plan ya existe, retornarlo
  if (existingPlan) return existingPlan;

  // Si no existe, crearlo en la base de datos
  return await db.plan.create({
    data: {
      name: selectedPlan.name,
      description: selectedPlan.description,
      price: selectedPlan.price,
      offersLimit: selectedPlan.offersLimit,
      isFree: selectedPlan.isFree,
      billingEnabled: faker.datatype.boolean(),
      billingCycle: faker.helpers.arrayElement([BillingCycle.ANNUAL, BillingCycle.MONTHLY]),
      nextBillingDate: faker.date.future(),
      paymentStatus: faker.helpers.arrayElement([
        PaymentStatus.OVERDUE,
        PaymentStatus.PAID,
        PaymentStatus.PENDING
      ]),
      lastPaymentDate: faker.date.past(),
      totalAmountPaid: faker.number.float({ min: 0, max: 10000 })
    }
  });
};
