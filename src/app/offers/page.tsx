import { Separator } from "@/components/ui/separator";
import { listenNowAlbums } from "./data/albums";
import { AlbumArtwork } from "./components/albun-artwork";
import { SearchBar } from "@/components/search-bar";
import { Suspense } from "react";
import SearchBarFallback from "@/components/fallbacks/search-bar-fallback";
import { QueryComponent } from "./components/query-component";

interface ParamsOffersPageProps {
  sort?: string;
  filter?: string;
  category?: string;
  search?: string;
}

export default function OffersPage({
  searchParams,
}: {
  searchParams?: ParamsOffersPageProps;
}) {
  const hasQuery = searchParams && Object.keys(searchParams).length > 0;

  return (
    <main className="col-span-5 lg:col-span-4 border-t lg:border-l">
      <section className="h-full px-4 py-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row gap-4 lg:justify-between lg:items-center">
          <Suspense fallback={<SearchBarFallback />}>
            <SearchBar />
          </Suspense>
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Listado de ofertas
            </h2>
            <p className="text-sm text-muted-foreground">
              Encuentra las mejores ofertas, descuentos y promociones.
            </p>
          </div>
        </div>

        {hasQuery && <QueryComponent searchParams={searchParams} />}

        <Separator className="my-4" />

        <section className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-10 place-items-center">
          {listenNowAlbums.map((album) => (
            <AlbumArtwork
              key={album.name}
              album={album}
              className="w-[250px]"
              aspectRatio="portrait"
              width={250}
              height={330}
            />
          ))}
        </section>
      </section>
    </main>
  );
}
