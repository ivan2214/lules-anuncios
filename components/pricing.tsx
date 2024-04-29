import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChartIcon, CheckIcon, ShareIcon, UsersIcon } from 'lucide-react'
import { db } from '@/lib/db'

export async function Pricing () {
  const plans = await db.plan.findMany({
    orderBy: {
      price: 'asc'
    },
    include: {
      features: true
    }
  })
  console.log(plans)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="grid gap-10  md:gap-16 md:grid-cols-3">
        <div className="space-y-6 px-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Pricing
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Choose the plan thats right for your business.
            </p>
          </div>
          <div className="grid gap-6">
            {plans?.map((plan) => (
              <Card key={plan.id}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      /month
                    </span>
                  </div>
                  <ul className="mt-6 space-y-4 text-sm text-gray-500 dark:text-gray-400">
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                      Publish up to {plan.offerPublishQuantity} offers
                    </li>

                    {plan.features.map((feature) => (
                      <li key={feature.id} className="flex items-center">
                        <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                        {feature.name}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <div className="col-span-2 space-y-6">
          <div className="space-y-2 sticky top-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Publish Offers, Manage Clients, Track Analytics
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Our platform provides everything you need to grow your business.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 sticky top-48">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ShareIcon className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Publish Offers</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Create and publish offers to reach new clients. Our platform
                makes it easy to manage your offer catalog and track
                performance.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <UsersIcon className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Manage Clients</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Keep track of your client profiles, communication, and
                transactions. Our platform provides a centralized hub to manage
                your client relationships.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BarChartIcon className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Track Analytics</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Get detailed insights into your offer performance, client
                engagement, and revenue. Our analytics dashboard helps you make
                data-driven decisions to grow your business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
