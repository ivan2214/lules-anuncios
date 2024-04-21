/*
  Warnings:

  - Made the column `planId` on table `Offer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Offer" ALTER COLUMN "planId" SET NOT NULL;
