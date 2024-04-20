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
import Link from "next/link";

export type categoryType = typeof categories;

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

export type filterOptionsType = (typeof filterOptions)

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

export type sortOptionsType = (typeof sortOptions)

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
                  className="hover:underline  text-sm transition-colors duration-300"
                  key={filter.value}
                >
                  <Link href={`/offers?filter=${filter.value}`}>
                    {filter.name}
                  </Link>
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
                  className="hover:underline  text-sm transition-colors duration-300"
                  key={sort.value}
                >
                  <Link href={`/offers?sort=${sort.value}`}>{sort.name}</Link>
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
                  className="hover:underline  text-sm transition-colors duration-300"
                  key={category.value}
                >
                  <Link href={`/offers?category=${category.value}`}>
                    {category.name}
                  </Link>
                </MenubarItem>
              ))}
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
