import { Separator } from '@/components/ui/separator';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { OfferArticle } from '@/components/offer-article';
import { getRecommendedOffers } from '@/lib/users';
import { auth } from '@/auth';

export const MadeForYou = async () => {
  const session = await auth();
  const offers = await getRecommendedOffers(session?.user.id, 15);

  const userId = session?.user?.id;
  return (
    <section>
      <div className="mt-6 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Made for You</h2>
        <p className="text-sm text-muted-foreground">Your personal playlists. Updated daily.</p>
      </div>
      <Separator className="my-4" />

      <section>
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {offers?.length > 0 &&
              offers?.map((offer) => (
                <OfferArticle userId={userId} key={offer.id} offer={offer} aspectRatio="portrait" />
              ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
    </section>
  );
};
