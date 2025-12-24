/*
  Warnings:

  - The values [PENDING,PROCESSED,MANUFACTURED,SHIPPED,DELIVERED,CANCELLED,RETURNED] on the enum `ORDER_STATUS` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `paid` on the `order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shopId]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ORDER_PAYMENT_STATUS" AS ENUM ('active', 'paid', 'failed', 'cancelled');

-- AlterEnum
BEGIN;
CREATE TYPE "ORDER_STATUS_new" AS ENUM ('pending', 'processed', 'manufactured', 'shipped', 'delivered', 'cancelled', 'returned');
ALTER TABLE "public"."order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "order" ALTER COLUMN "status" TYPE "ORDER_STATUS_new" USING ("status"::text::"ORDER_STATUS_new");
ALTER TYPE "ORDER_STATUS" RENAME TO "ORDER_STATUS_old";
ALTER TYPE "ORDER_STATUS_new" RENAME TO "ORDER_STATUS";
DROP TYPE "public"."ORDER_STATUS_old";
ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_userId_fkey";

-- DropForeignKey
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_productId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_shopId_fkey";

-- DropForeignKey
ALTER TABLE "shop" DROP CONSTRAINT "shop_ownerId_fkey";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "paid",
ADD COLUMN     "paymentStatus" "ORDER_PAYMENT_STATUS" NOT NULL DEFAULT 'active',
ALTER COLUMN "status" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "order_item" ALTER COLUMN "productId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "shopId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "product_shopId_key" ON "product"("shopId");

-- AddForeignKey
ALTER TABLE "shop" ADD CONSTRAINT "shop_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
