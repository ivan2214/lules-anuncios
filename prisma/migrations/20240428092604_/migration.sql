/*
  Warnings:

  - You are about to drop the column `offerId` on the `chats` table. All the data in the column will be lost.
  - Added the required column `chatId` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "chats_offerId_key";

-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "chatId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "chats" DROP COLUMN "offerId";

-- CreateIndex
CREATE INDEX "Offer_chatId_idx" ON "Offer"("chatId");
