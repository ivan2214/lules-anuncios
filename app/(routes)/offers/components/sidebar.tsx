import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

import { type Playlist } from '../data/playlists'
import { type Category, type Store } from '@prisma/client'
import Link from 'next/link'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[]
  stores?: Store[]
  categories?: Category[]
}

export function Sidebar ({ className, playlists, categories, stores }: SidebarProps) {
  return (
    <div className={cn('pb-12', className)}>
      <div className="sticky top-0 space-y-4 py-4">
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">Stores</h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">
              {stores?.map((store) => (
                <Link
                  className="block rounded-md px-4 py-2 text-sm font-light hover:bg-muted"
                  href={`/offers?store=${store.name}`}
                  key={store.name}
                >
                  {store.name}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">Categories</h2>
          <ScrollArea className="h-[400px] px-1">
            <div className="space-y-1 p-2">
              {categories?.map((category) => (
                <Link
                  className="block rounded-md px-4 py-2 text-sm font-light hover:bg-muted"
                  href={`/offers?category=${category.name}`}
                  key={category.name}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
