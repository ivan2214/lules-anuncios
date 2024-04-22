import { cn } from "@/lib/utils";

import ImageSkeleton from "@/components/image-skeleton";
import Link from "next/link";
import { OfferExtens } from "@/types/offer";

interface OfferArticleProps extends React.HTMLAttributes<HTMLDivElement> {
  offer: OfferExtens;
  aspectRatio?: "portrait" | "square";
}

export function OfferArticle({
  offer,
  aspectRatio = "portrait",
  className,
}: OfferArticleProps) {
  return (
    <div
      className={cn("flex flex-col  justify-between w-full gap-y-5", className)}
    >
      <Link href="#" className="overflow-hidden  rounded-md h-80 w-full">
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
          {offer.store.name || ""}
        </p>
      </div>
    </div>
  );
}
