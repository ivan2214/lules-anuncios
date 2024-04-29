import Link from 'next/link'
import { db } from '@/lib/db'
import { Badge } from './ui/badge'

export async function Populars () {
  const categories = await db.category.findMany({
    take: 5,
    select: {
      offers: {
        select: {
          images: {
            select: {
              url: true
            }
          }
        }
      },
      name: true
    }
  })

  const stores = await db.store.findMany({
    take: 5,
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      offers: true
    }
  })
  return (
    <section className="flex w-full flex-col items-start gap-y-10">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Popular stores</h2>
      </div>
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
        {stores.map((store) => (
          <Link
            className="flex flex-col gap-2 rounded-md border border-gray-200 bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-2xl"
            href={`/offers?store=${store.id}`}
            key={store.name}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{store.name}</h3>
              <Badge>{store.offers.length} offers</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {store.address}, {store.city}
            </p>
          </Link>
        ))}
      </div>
      <div className="flex w-full items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Popular categories</h2>
      </div>
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((category) => (
          <Link
            className="flex flex-col gap-y-4 overflow-hidden rounded-md border border-gray-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-2xl"
            href={`/offers?category=${category?.name}`}
            key={category.name}
          >
            <div className="h-32 w-full">
              <img
                className="aspect-square h-full w-full  object-cover"
                src={category.offers[0].images[0].url}
                alt=""
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <Badge>{category.offers.length} offers</Badge>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
