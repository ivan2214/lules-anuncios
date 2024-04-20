import { Metadata } from "next";
import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  categoryType,
  filterOptionsType,
  Menu,
  sortOptionsType,
} from "./components/menu";
import { Sidebar } from "./components/sidebar";
import { playlists } from "./data/playlists";
import { listenNowAlbums, madeForYouAlbums } from "./data/albums";
import { AlbumArtwork } from "./components/albun-artwork";
import { PodcastEmptyPlaceholder } from "./components/podcast-empty-placeholder";

export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
};

interface ParamsMusicPageProps {
  sort?: sortOptionsType;
  filter?: filterOptionsType;
  category?: categoryType;
}

export default function MusicPage({
  params,
}: {
  params: ParamsMusicPageProps;
}) {
  const { sort = "popular", filter = "all", category = "all" } = params;

  return (
    <main className="col-span-5 lg:col-span-4 border-t lg:border-l">
      <section className="h-full px-4 py-6 lg:px-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Listen Now</h2>
          <p className="text-sm text-muted-foreground">
            Top picks for you. Updated daily.
          </p>
        </div>

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
