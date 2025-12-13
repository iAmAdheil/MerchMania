/*
  Warnings:

  - The values [admin] on the enum `ROLE` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `paid` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ORDER_STATUS" AS ENUM ('PENDING', 'PROCESSED', 'MANUFACTURED', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED');

-- AlterEnum
BEGIN;
CREATE TYPE "ROLE_new" AS ENUM ('customer', 'staff', 'creator');
ALTER TABLE "user" ALTER COLUMN "role" TYPE "ROLE_new" USING ("role"::text::"ROLE_new");
ALTER TYPE "ROLE" RENAME TO "ROLE_old";
ALTER TYPE "ROLE_new" RENAME TO "ROLE";
DROP TYPE "public"."ROLE_old";
COMMIT;

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "paid" BOOLEAN NOT NULL,
ADD COLUMN     "status" "ORDER_STATUS" NOT NULL DEFAULT 'PENDING';
