import { Button } from "@/components/ui/button";
import Link from "next/link";
import Icon, { IconProps } from "./ui/icon";

interface TopStoresProps {
  name: string;
  miniDescription: string;
  href: string;
}

const topStores: TopStoresProps[] = [
  {
    name: "Apple",
    miniDescription: "Apple Store",
    href: "#",
  },
  {
    name: "Google",
    miniDescription: "Google Play",
    href: "#",
  },
  {
    name: "Samsung",
    miniDescription: "Samsung Store",
    href: "#",
  },
  {
    name: "Xiaomi",
    miniDescription: "Xiaomi Store",
    href: "#",
  },
  {
    name: "Huawei",
    miniDescription: "Huawei Store",
    href: "#",
  },
  {
    name: "Sony",
    miniDescription: "Sony Store",
    href: "#",
  },
  {
    name: "Nokia",
    miniDescription: "Nokia Store",
    href: "#",
  },
  {
    name: "Motorola",
    miniDescription: "Motorola Store",
    href: "#",
  },
];

interface TopCategoriesProps {
  name: string;
  icon: IconProps["name"];
  href: string;
}

const topCategories: TopCategoriesProps[] = [
  {
    name: "Computers",
    icon: "computer",
    href: "#",
  },
  {
    name: "Electronics",
    icon: "bell-electric",
    href: "#",
  },
  {
    name: "Fashion",
    icon: "shirt",
    href: "#",
  },
  {
    name: "Home",
    icon: "home",
    href: "#",
  },
  {
    name: "Sports",
    icon: "dumbbell",
    href: "#",
  },
  {
    name: "Health",
    icon: "heart",
    href: "#",
  },
  {
    name: "Books",
    icon: "book-open",
    href: "#",
  },
  {
    name: "Toys",
    icon: "toy-brick",
    href: "#",
  },
];

export function Populars() {
  return (
    <section className="w-full grid grid-cols-1 gap-6 md:grid-cols-2">
      <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Explore Top Categories
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 sm:mt-4">
            Browse through our most popular product categories.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {topCategories.map((category) => {
            return (
              <Link
                className="group flex flex-col items-center justify-center gap-3 rounded-lg bg-gray-100 p-4 text-center transition-colors hover:bg-gray-200 group"
                href={category.href}
                key={category.name}
              >
                <Icon name={category.icon} className="h-6 w-6 text-primary" />

                <span className="text-sm font-medium">{category.name}</span>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Top Stores
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 sm:mt-4">
            Check out the most popular stores on our platform.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {topStores.map((store) => (
            <Link
              href={store.href}
              key={store.name}
              className="flex flex-col gap-y-3 items-start justify-between rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex items-center gap-4 w-full">
                <div className="w-full">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {store.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {store.miniDescription}
                  </p>
                </div>
              </div>
              <Button className="w-full" size="sm">
                View Offers
              </Button>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
