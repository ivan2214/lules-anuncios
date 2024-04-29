/*
  Warnings:

  - Added the required column `status` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'ADMIN');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE');

-- CreateEnum
CREATE TYPE "BillingCycle" AS ENUM ('MONTHLY', 'ANNUAL');

-- CreateEnum
CREATE TYPE "StoreStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING_APPROVAL');

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "adminId" TEXT,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "status" "StoreStatus" NOT NULL,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "verificationDate" TIMESTAMP(3),
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "plans" ADD COLUMN     "billingCycle" "BillingCycle",
ADD COLUMN     "billingEnabled" BOOLEAN DEFAULT false,
ADD COLUMN     "lastPaymentDate" TIMESTAMP(3),
ADD COLUMN     "nextBillingDate" TIMESTAMP(3),
ADD COLUMN     "paymentStatus" "PaymentStatus",
ADD COLUMN     "totalAmountPaid" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'SUPER_ADMIN',

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "features" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "priority" INTEGER,
    "planId" TEXT,

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE INDEX "features_planId_idx" ON "features"("planId");

-- CreateIndex
CREATE INDEX "Store_adminId_idx" ON "Store"("adminId");
