import Link from "next/link";
import Icon from "./ui/icon";
import { db } from "@/lib/db";
import { Badge } from "./ui/badge";

export async function Populars() {
  const categories = await db.category.findMany({
    take: 5,
    select: {
      Offers: {
        select: {
          images: {
            select: {
              url: true,
            },
          },
        },
      },
      name: true,
    },
  });

  const stores = await db.store.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      Offers: true,
    },
  });
  return (
    <section className="w-full flex flex-col items-start gap-y-10">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">
          Popular stores
        </h2>
      </div>
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
        {stores.map((store) => (
          <Link
            className="flex flex-col gap-2 rounded-md border border-gray-200 shadow-md hover:shadow-2xl transition-shadow duration-300 bg-white p-4"
            href={`/offers?store=${store.id}`}
            key={store.name}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{store.name}</h3>
              <Badge>{store.Offers.length} offers</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {store.address}, {store.city}
            </p>
          </Link>
        ))}
      </div>
      <div className="flex w-full items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">
          Popular categories
        </h2>
      </div>
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((category) => (
          <Link
            className="flex flex-col gap-y-4 rounded-md border border-gray-200 shadow-md hover:shadow-2xl transition-shadow duration-300 bg-white overflow-hidden"
            href={`/offers?category=${category?.name}`}
            key={category.name}
          >
            <div className="w-full h-32">
              <img
                className="w-full h-full object-cover  aspect-square"
                src={category.Offers[0].images[0].url}
                alt=""
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <Badge>{category.Offers.length} offers</Badge>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
