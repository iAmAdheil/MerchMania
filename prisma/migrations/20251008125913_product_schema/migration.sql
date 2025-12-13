/*
  Warnings:

  - You are about to drop the column `designs` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `remainingStock` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Shop" DROP CONSTRAINT "Shop_ownerId_fkey";

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "designs",
DROP COLUMN "remainingStock",
ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
