/*
  Warnings:

  - Added the required column `design` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('male', 'female', 'unisex');

-- CreateEnum
CREATE TYPE "SIZE" AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "design" TEXT NOT NULL,
ADD COLUMN     "gender" "GENDER" NOT NULL DEFAULT 'unisex',
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "sizes" "SIZE"[] DEFAULT ARRAY[]::"SIZE"[];

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "logo" TEXT NOT NULL;
