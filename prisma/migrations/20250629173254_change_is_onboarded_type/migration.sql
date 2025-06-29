/*
  Warnings:

  - Changed the type of `isOnboarded` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "isOnboarded",
ADD COLUMN     "isOnboarded" BOOLEAN NOT NULL;

-- DropEnum
DROP TYPE "BOOLEANOPTIONS";
