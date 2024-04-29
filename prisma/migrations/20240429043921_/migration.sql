/*
  Warnings:

  - You are about to drop the column `planId` on the `Offer` table. All the data in the column will be lost.
  - Made the column `planId` on table `Store` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Offer_planId_idx";

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "planId";

-- AlterTable
ALTER TABLE "Store" ALTER COLUMN "planId" SET NOT NULL;
