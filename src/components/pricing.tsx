import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import { PiUserSwitchDuotone } from "react-icons/pi";
import { MdShowChart } from "react-icons/md";
import { CiShare2 } from "react-icons/ci";

export function Pricing() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-3">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Pricing
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Choose the plan thats right for your business.
              </p>
            </div>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>
                    For small teams or individuals.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-4xl font-bold">$19</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      /month
                    </span>
                  </div>
                  <ul className="mt-6 space-y-4 text-sm text-gray-500 dark:text-gray-400">
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 fill-primary" />
                      Publish up to 10 offers
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 fill-primary" />
                      Manage up to 50 client profiles
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 fill-primary" />
                      Basic analytics
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>
                    For growing teams and businesses.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-4xl font-bold">$49</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      /month
                    </span>
                  </div>
                  <ul className="mt-6 space-y-4 text-sm text-gray-500 dark:text-gray-400">
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 fill-primary" />
                      Publish up to 50 offers
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 fill-primary" />
                      Manage up to 500 client profiles
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 fill-primary" />
                      Advanced analytics
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 fill-primary" />
                      Custom branding
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>
                    For large teams and high-volume businesses.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-4xl font-bold">$99</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      /month
                    </span>
                  </div>
                  <ul className="mt-6 space-y-4 text-sm text-gray-500 dark:text-gray-400">
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 fill-primary" />
                      Publish unlimited offers
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 fill-primary" />
                      Manage unlimited client profiles
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 fill-primary" />
                      Advanced analytics and reporting
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 fill-primary" />
                      Dedicated account manager
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 fill-primary" />
                      Custom integrations
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
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
                  <CiShare2 className="h-6 w-6 fill-primary" />
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
                  <PiUserSwitchDuotone className="h-6 w-6 fill-primary" />
                  <h3 className="text-xl font-bold">Manage Clients</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Keep track of your client profiles, communication, and
                  transactions. Our platform provides a centralized hub to
                  manage your client relationships.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MdShowChart className="h-6 w-6 fill-primary" />
                  <h3 className="text-xl font-bold">Track Analytics</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Get detailed insights into your offer performance, client
                  engagement, and revenue. Our analytics dashboard helps you
                  make data-driven decisions to grow your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
