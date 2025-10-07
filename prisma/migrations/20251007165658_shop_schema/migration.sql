/*
  Warnings:

  - You are about to drop the column `shopId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `ShopDetails` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ownerId]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contact` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ShopDetails" DROP CONSTRAINT "ShopDetails_shopId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user" DROP CONSTRAINT "user_shopId_fkey";

-- DropIndex
DROP INDEX "public"."user_shopId_key";

-- AlterTable
ALTER TABLE "public"."Shop" ADD COLUMN     "contact" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "ownerId" TEXT,
ADD COLUMN     "socialLinks" TEXT[];

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "shopId";

-- DropTable
DROP TABLE "public"."ShopDetails";

-- CreateIndex
CREATE UNIQUE INDEX "Shop_ownerId_key" ON "public"."Shop"("ownerId");

-- AddForeignKey
ALTER TABLE "public"."Shop" ADD CONSTRAINT "Shop_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
