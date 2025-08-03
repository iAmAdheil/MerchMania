/*
  Warnings:

  - You are about to drop the column `userId` on the `Shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "userId",
ADD COLUMN     "banner" TEXT;
