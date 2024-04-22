/*
  Warnings:

  - You are about to drop the column `profilesLimit` on the `Plan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "profilesLimit",
ADD COLUMN     "offerPublishQuantity" INTEGER NOT NULL DEFAULT 20;
