import { type Category, type Image, type Offer, type Store } from '@prisma/client'

export interface OfferExtens extends Offer {
  categories: Category[]
  images: Image[]
  store: Store
}
