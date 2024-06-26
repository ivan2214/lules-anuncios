import { Button } from '@/components/ui/button'
import { getOffer } from '@/requestDb/get-offer'
import { ChatContent } from './components/chat-content'
import { ImageGallery } from './components/image-gallery'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

interface OfferPageProps {
  params: {
    offerId?: string
  }
}

const OfferPage: React.FC<OfferPageProps> = async ({ params }) => {
  const offerId = params?.offerId

  if (!offerId) {
    return null
  }

  const offer = await getOffer(offerId)

  const chat = offer?.chat

  if (!offer) {
    return null
  }

  const session = await auth()

  const user = session?.user

  if (user && user?.id) {
    await db.user
      .update({
        where: {
          id: user?.id
        },
        data: {
          interactions: {
            create: {
              offerId: offer?.id,
              viewed: true
            }
          }
        }
      })
      .finally(() => {
        revalidatePath('/')
      })
  }

  return (
    <section className="w-full py-12 items-center md:py-24 lg:py-32 flex flex-col gap-y-8">
      <section className="lg:container flex flex-col lg:flex-row items-start gap-8 lg:px-4 md:px-6">
        <ImageGallery images={offer.images} />
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter">
            {offer?.title}
          </h1>
          <div className="flex space-x-1">
            <svg
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <svg
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <svg
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <svg
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <svg
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            ${offer?.price}
          </p>
          <p className="text-base text-zinc-500 dark:text-zinc-400">
            {offer?.description}
          </p>
          <div className="flex space-x-2">
            <Button className="w-12 h-12 rounded-md border border-zinc-200 text-zinc-900 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
              7
            </Button>
            <Button className="w-12 h-12 rounded-md border border-zinc-200 text-zinc-900 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
              8
            </Button>
            <Button className="w-12 h-12 rounded-md border border-zinc-200 text-zinc-900 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
              9
            </Button>
            <Button className="w-12 h-12 rounded-md border border-zinc-200 text-zinc-900 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
              10
            </Button>
          </div>
          <Button className="w-full h-12 rounded-md bg-zinc-900 text-zinc-50 shadow-sm dark:bg-zinc-50 dark:text-zinc-900">
            Add to Cart
          </Button>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {offer?.store.name} •{' '}
            {offer?.categories.map((category) => category.name).join(', ')}
          </p>
        </div>
      </section>
      <section className="lg:container flex items-start gap-8 px-4 md:px-6">
        <ChatContent store={offer?.store} chat={chat} />
      </section>
    </section>
  )
}

export default OfferPage
