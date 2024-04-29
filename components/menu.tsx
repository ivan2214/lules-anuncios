"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { cn, createUrl } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import UserMenu from "./user-menu";
import { SearchBar } from "./search-bar";
import { Suspense } from "react";
import SearchBarFallback from "./fallbacks/search-bar-fallback";
import { Category, Store } from "@prisma/client";
import AuthButtons from "@/components/auth-options";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";

const filterOptions = [
  {
    name: "Nuevos",
    value: "new",
  },
  {
    name: "Gratis",
    value: "free",
  },

  {
    name: "Todos",
    value: "all",
  },
  {
    name: "Recomendados",
    value: "recommended",
  },
  {
    name: "Destacados",
    value: "featured",
  },
  {
    name: "Mas vendidos",
    value: "most_sold",
  },
];

const sortOptions = [
  {
    name: "Mas recientes",
    value: "most_recent",
  },
  {
    name: "Mas antiguos",
    value: "most_ancient",
  },
  {
    name: "De mas popular a menos",
    value: "most_popular",
  },
];

export function Menu({
  categories,
  stores,
  user,
  store,
}: {
  categories?: Category[];
  stores?: Store[];
  user?: User | null;
  store?: Store | null;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCategories = searchParams.get("category")?.split(",") || [];
  const selectedSortValues = searchParams.get("sort")?.split(",");
  const selectedFilterValues = searchParams.get("filter");
  const router = useRouter();

  const handleCategoryClick = (categoryValue: string) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    let updatedCategories = [...selectedCategories];
    const categoryIndex = updatedCategories.indexOf(categoryValue);

    if (categoryIndex === -1) {
      updatedCategories.push(categoryValue);
    } else {
      updatedCategories.splice(categoryIndex, 1);
    }

    if (updatedCategories.length > 0) {
      newParams.set(
        "category",
        updatedCategories.map((category) => category).join(",")
      );
    } else {
      newParams.delete("category");
    }

    const includesOfferPage = pathname?.includes("offers");
    const pathNameDefined = !includesOfferPage
      ? `/offers${pathname}`
      : pathname;

    router.push(createUrl(pathNameDefined, newParams));
    router.refresh();
  };

  const handleSortClick = (sortValue: string) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set("sort", sortValue);
    const includesOfferPage = pathname?.includes("offers");
    const pathNameDefined = !includesOfferPage
      ? `/offers${pathname}`
      : pathname;

    router.push(createUrl(pathNameDefined, newParams));
    router.refresh();
  };

  const handleFilterClick = (filterValue: string) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set("filter", filterValue);
    const includesOfferPage = pathname?.includes("offers");
    const pathNameDefined = !includesOfferPage
      ? `/offers${pathname}`
      : pathname;

    router.push(createUrl(pathNameDefined, newParams));
    router.refresh();
  };

  const handleStoreClick = (storeValue: string) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set("store", storeValue);
    const includesOfferPage = pathname?.includes("offers");
    const pathNameDefined = !includesOfferPage
      ? `/offers${pathname}`
      : pathname;

    router.push(createUrl(pathNameDefined, newParams));
    router.refresh();
  };

  return (
    <Menubar className="rounded-none border-b border-none px-2 lg:px-4 py-8 flex justify-between w-full items-center">
      <div className="flex gap-2 items-center">
        <Link className="font-bold" href="/">
          Inicio
        </Link>
        <MenubarMenu>
          <MenubarTrigger className="font-bold">Offers</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/offers">Offers</Link>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Filters</MenubarSubTrigger>
              <MenubarSubContent className="w-[230px]">
                {filterOptions.map((filter) => (
                  <MenubarItem
                    key={filter.value}
                    onClick={() => handleFilterClick(filter.value)}
                    className={cn(
                      "hover:underline text-sm transition-colors duration-300",
                      selectedFilterValues?.includes(filter.value) &&
                        "underline decoration-primary underline-offset-4"
                    )}
                  >
                    {filter.name}
                  </MenubarItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Stores</MenubarSubTrigger>
              <MenubarSubContent className="w-[230px]">
                {stores?.map((filter) => (
                  <MenubarItem
                    key={filter.id}
                    onClick={() => handleStoreClick(filter.name)}
                    className={cn(
                      "hover:underline text-sm transition-colors duration-300",
                      selectedFilterValues?.includes(filter.name) &&
                        "underline decoration-primary underline-offset-4"
                    )}
                  >
                    {filter.name}
                  </MenubarItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Sort</MenubarSubTrigger>
              <MenubarSubContent className="w-[230px]">
                {sortOptions.map((sort) => (
                  <MenubarItem
                    key={sort.value}
                    onClick={() => handleSortClick(sort.value)}
                    className={cn(
                      "hover:underline text-sm transition-colors duration-300",
                      selectedSortValues?.includes(sort.value) &&
                        "underline decoration-primary underline-offset-4"
                    )}
                  >
                    {sort.name}
                  </MenubarItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Categories</MenubarSubTrigger>
              <MenubarSubContent className="w-[230px]">
                {categories?.map((category) => (
                  <MenubarItem
                    key={category.id}
                    onClick={() => handleCategoryClick(category.name)}
                    className={cn(
                      "hover:underline text-sm transition-colors duration-300",
                      selectedCategories.includes(category.name) &&
                        "underline decoration-primary underline-offset-4"
                    )}
                  >
                    {category.name}
                  </MenubarItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </div>
      <section className="flex gap-2 items-center">
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
        {!user && <AuthButtons />}
        {store && (
          <Button>
            <Link
              className="flex items-center gap-2 text-base font-light"
              href="/create-offer"
            >
              Crear oferta
            </Link>
          </Button>
        )}
        {user && <UserMenu store={store} user={user} />}
      </section>
    </Menubar>
  );
}
