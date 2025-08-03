/*
  Warnings:

  - A unique constraint covering the columns `[shopId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_userId_fkey";

-- DropIndex
DROP INDEX "Shop_userId_key";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "shopId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_shopId_key" ON "user"("shopId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
