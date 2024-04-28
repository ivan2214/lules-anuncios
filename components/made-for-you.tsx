import { Separator } from "@/components/ui/separator";
import { getOffers } from "@/requestDb/offers";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { OfferArticle } from "@/components/offer-article";
import { getRecommendedOffers } from "@/lib/users";
import { auth } from "@/auth";

interface MadeForYouProps {}

export const revalidate = 60 * 60 * 24;

export const MadeForYou: React.FC<MadeForYouProps> = async () => {
  const offers = await getRecommendedOffers("clvhk54bj0002tkg31ya7vjat", 15);
  const session = await auth();
  const userId = session?.user?.id;
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
            {offers?.length > 0 &&
              offers?.map((offer) => (
                <OfferArticle
                  userId={userId}
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
