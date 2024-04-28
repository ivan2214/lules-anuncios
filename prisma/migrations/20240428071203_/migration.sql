/*
  Warnings:

  - You are about to drop the column `userId` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `OfferId` on the `images` table. All the data in the column will be lost.
  - You are about to drop the `offers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "categories_userId_idx";

-- DropIndex
DROP INDEX "images_OfferId_idx";

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "chats" ALTER COLUMN "offerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "images" DROP COLUMN "OfferId",
ADD COLUMN     "offerId" TEXT;

-- DropTable
DROP TABLE "offers";

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "storeId" TEXT NOT NULL,
    "planId" TEXT,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserFavoriteCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Offer_storeId_idx" ON "Offer"("storeId");

-- CreateIndex
CREATE INDEX "Offer_planId_idx" ON "Offer"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFavoriteCategories_AB_unique" ON "_UserFavoriteCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFavoriteCategories_B_index" ON "_UserFavoriteCategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Store_email_key" ON "Store"("email");

-- CreateIndex
CREATE INDEX "images_offerId_idx" ON "images"("offerId");
