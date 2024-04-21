import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import Icon, { IconProps } from "../ui/icon";
import { Separator } from "../ui/separator";

export interface Route {
  name: string;
  icon?: IconProps["name"];
  href: string;
}

const routes: Route[] = [
  {
    name:"Cuenta",
    icon: "user",
    href: "/account",
  },
  {
    name:"Ayuda",
    icon: "badge-help",
    href: "/help",
  }
];

const UserMenu = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="grid h-10 w-10 place-items-center rounded-full border-2 border-gray-200 hover:border-gray-300 focus:outline-none"
          size="icon"
          variant="ghost"
        >
          <img
            alt="Avatar"
            className="rounded-full object-cover"
            height="35"
            src={"https://i.pravatar.cc/300"}
            style={{
              aspectRatio: "35/35",
              objectFit: "cover",
            }}
            width="35"
          />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 p-0" side="bottom">
        <div />
        <div>
          <div className="flex flex-col gap-3 p-4">
            {routes.map((route) => (
              <Link
                className="flex items-center gap-2 text-base font-medium"
                href={route.href}
                key={route.name}
              >
                <span>{route.name}</span>
              </Link>
            ))}
            <Separator />
            <Link
              className="flex items-center gap-2 text-base font-medium"
              href="/create-offer"
            >
              Crear oferta
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserMenu;
