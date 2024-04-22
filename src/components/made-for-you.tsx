import { Separator } from "@/components/ui/separator";
import { getOffers } from "@/requestDb/offers";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { OfferArticle } from "@/components/offer-article";

interface MadeForYouProps {}

export const MadeForYou: React.FC<MadeForYouProps> = async () => {
  const offers = await getOffers({ category: "Made for you", take: 10 });
  return (
    <section>
      <div className="mt-6 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Made for You</h2>
        <p className="text-sm text-muted-foreground">
          Your personal playlists. Updated daily.
        </p>
      </div>
      <Separator className="my-4" />

      <section>
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {offers.length > 0 &&
              offers?.map((offer) => (
                <OfferArticle
                  key={offer.id}
                  offer={offer}
                  aspectRatio="portrait"
                />
              ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
    </section>
  );
};
