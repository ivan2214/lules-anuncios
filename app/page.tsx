import { Populars } from '@/components/populars'
import { Pricing } from '@/components/pricing'
import Link from 'next/link'
import { MadeForYou } from '@/components/made-for-you'

const page = () => {
  return (
    <div className="flex flex-col h-full w-full gap-y-10">
      <header className="bg-background py-8 px-4 md:px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Discover Incredible Offers
            </h1>
            <p className="text-lg text-gray-300">
              Publish your products and reach new customers.
            </p>
            <div>
              <Link
                className="inline-flex items-center justify-center rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                href="#"
              >
                List a New Offer
              </Link>
            </div>
          </div>
          <img
            alt="Featured Offers"
            className="mt-6 md:mt-0 rounded-lg shadow-lg"
            height={400}
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
            style={{
              aspectRatio: '600/400',
              objectFit: 'cover'
            }}
            width={600}
          />
        </div>
      </header>

      <MadeForYou />

      <Populars />

      <Pricing />
      <footer className="bg-background py-6">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <p className="text-sm">© 2024 Offer Hub</p>
          <nav className="flex items-center space-x-4">
            <Link className="hover:underline" href="#">
              About
            </Link>
            <Link className="hover:underline" href="#">
              Contact
            </Link>
            <Link className="hover:underline" href="#">
              Terms of Service
            </Link>
            <Link className="hover:underline" href="#">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default page
