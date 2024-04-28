import { Category, Image, Offer, Plan, Store } from "@prisma/client";

export interface OfferExtens extends Offer {
  categories: Category[];
  images: Image[];
  store: Store;
  plan: Plan | null;
}
