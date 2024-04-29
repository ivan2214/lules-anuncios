import { faker } from '@faker-js/faker'
import { db } from '../lib/db'
import { type Offer } from '@prisma/client'

export const generateRandomCategories = async (offer: Offer) => {
  const categoryName = faker.commerce.department()

  const categoryIsAlreadyCreated = await db.category.findFirst({
    where: {
      name: categoryName
    }
  })

  if (!categoryIsAlreadyCreated) {
    await db.category.create({
      data: {
        name: categoryName,
        offers: {
          connect: {
            id: offer.id
          }
        }
      }
    })
  }

  if (categoryIsAlreadyCreated) {
    await db.category.update({
      where: {
        id: categoryIsAlreadyCreated.id
      },
      data: {
        offers: {
          connect: {
            id: offer.id
          }
        }
      }
    })
  }
}
