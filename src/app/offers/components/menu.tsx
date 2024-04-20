"use client";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { cn, createUrl } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  {
    name: "Todas",
    value: "all",
  },
  {
    name: "Limpieza",
    value: "cleaning",
  },
  {
    name: "Cocina",
    value: "kitchen",
  },
  {
    name: "Jardinería",
    value: "gardening",
  },
  {
    name: "Aparatos",
    value: "devices",
  },
  {
    name: "Juguetes",
    value: "toys",
  },
  {
    name: "Cuidado personal",
    value: "personal_care",
  },
  {
    name: "Hogar",
    value: "home",
  },
  {
    name: "Libros",
    value: "books",
  },
  {
    name: "Musica",
    value: "music",
  },
  {
    name: "Peliculas",
    value: "movies",
  },
  {
    name: "Series",
    value: "series",
  },
  {
    name: "Juegos",
    value: "games",
  },
  {
    name: "Deportes",
    value: "sports",
  },
  {
    name: "Viajes",
    value: "travel",
  },
  {
    name: "Vehiculos",
    value: "vehicles",
  },
  {
    name: "Animales",
    value: "animals",
  },
  {
    name: "Electronica",
    value: "electronics",
  },
  {
    name: "Otros",
    value: "others",
  },
];

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

export function Menu() {
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
        updatedCategories.map(encodeURIComponent).join(",")
      );
    } else {
      newParams.delete("category");
    }

    router.push(createUrl(pathname, newParams));
    router.refresh();
  };

  const handleSortClick = (sortValue: string) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set("sort", sortValue);
    router.push(createUrl(pathname, newParams));
    router.refresh();
  };

  const handleFilterClick = (filterValue: string) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set("filter", filterValue);
    router.push(createUrl(pathname, newParams));
    router.refresh();
  };

  return (
    <Menubar className="rounded-none border-b border-none px-2 lg:px-4 py-8">
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
              {categories.map((category) => (
                <MenubarItem
                  key={category.value}
                  onClick={() => handleCategoryClick(category.value)}
                  className={cn(
                    "hover:underline text-sm transition-colors duration-300",
                    selectedCategories.includes(category.value) &&
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
    </Menubar>
  );
}
