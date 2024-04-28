/*
  Warnings:

  - A unique constraint covering the columns `[offerId]` on the table `chats` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "chats_offerId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "chats_offerId_key" ON "chats"("offerId");

-- RenameIndex
ALTER INDEX "chats_storeId_idx" RENAME TO "store_index";

-- RenameIndex
ALTER INDEX "messages_chatId_idx" RENAME TO "chat_index";
