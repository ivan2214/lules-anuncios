import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Menu } from "@/components/menu";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import SearchBarFallback from "@/components/fallbacks/search-bar-fallback";
import { db } from "@/lib/db";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await db.category.findMany({});
  const stores = await db.store.findMany({});
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={cn(
          "w-full h-full container mx-auto bg-background font-sans antialiased",
          inter.className
        )}
      >
        <Suspense fallback={<SearchBarFallback />}>
          <Menu categories={categories} stores={stores} session={session} />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
