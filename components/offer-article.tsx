"use client";
import { cn } from "@/lib/utils";

import ImageSkeleton from "@/components/image-skeleton";
import Link from "next/link";
import { OfferExtens } from "@/types/offer";
import { Badge } from "./ui/badge";
import { User } from "next-auth";

interface OfferArticleProps extends React.HTMLAttributes<HTMLDivElement> {
  offer: OfferExtens;
  aspectRatio?: "portrait" | "square";
  userId?: string;
}

export function OfferArticle({
  offer,
  aspectRatio = "portrait",
  className,
  userId,
}: OfferArticleProps) {
  const handleOfferClick = async (userId?: string) => {
    try {
      await fetch("/api/preferences-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          preferences: offer.categories.map((category) => category.name),
          favoriteCategories: offer.categories,
          offer: offer,
        }),
      });
      console.log("Preferencias actualizadas con éxito.");
    } catch (error) {
      console.log("Error al actualizar las preferencias del usuario:", error);
    }
  };

  return (
    <article
      className={cn("flex flex-col  justify-between w-full gap-y-5", className)}
    >
      <Link
        href={`/offer/${offer.id}`}
        className="overflow-hidden  rounded-md h-80 w-full"
        onClick={() => handleOfferClick(userId)}
      >
        <ImageSkeleton
          src={offer?.images[0]?.url || "https://picsum.photos/200"}
          alt={offer.title}
          className={cn(
            "w-full h-80 object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </Link>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none tracking-tight truncate">
          {offer.title}
        </h3>
        <p className="text-xs text-muted-foreground">
          {offer.categories.map((category) => category.name).join(", ")}
        </p>
        <Badge variant="outline" className="bg-purple-500 text-white">
          {offer.store.name}
        </Badge>
      </div>
    </article>
  );
}
