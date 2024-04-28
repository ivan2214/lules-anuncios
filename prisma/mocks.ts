import { Plan } from "@prisma/client";

type safePlan = Omit<Plan, "id" | "createdAt" | "updatedAt">;

export const mockPlan: safePlan[] = [
  {
    name: "Free",
    description: "Free plan",
    price: 0,
    offersLimit: "FREETIER_20",
    offerPublishQuantity: 20,
    isFree: true,
  },
  {
    name: "Basic",
    description: "Basic plan",
    price: 30,
    offersLimit: "BASIC_50",
    offerPublishQuantity: 50,
    isFree: false,
  },
  {
    name: "Pro",
    description: "Pro plan",
    price: 100,
    offersLimit: "PRO_100",
    offerPublishQuantity: 100,
    isFree: false,
  },
];
