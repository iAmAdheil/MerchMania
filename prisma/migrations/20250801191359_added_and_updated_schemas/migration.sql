/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_shopId_fkey";

-- DropTable
DROP TABLE "Product";

-- CreateTable
CREATE TABLE "ShopDetails" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "socialLinks" TEXT[],
    "shopId" TEXT NOT NULL,

    CONSTRAINT "ShopDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "designs" TEXT[],
    "gender" "GENDER" NOT NULL DEFAULT 'unisex',
    "sizes" "SIZE"[] DEFAULT ARRAY[]::"SIZE"[],
    "price" TEXT NOT NULL,
    "tags" TEXT[],
    "shopId" TEXT NOT NULL,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "remainingStock" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShopDetails_shopId_key" ON "ShopDetails"("shopId");

-- AddForeignKey
ALTER TABLE "ShopDetails" ADD CONSTRAINT "ShopDetails_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
