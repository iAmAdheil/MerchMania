/*
  Warnings:

  - You are about to drop the column `isOnboarded` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "session" DROP COLUMN "isOnboarded",
DROP COLUMN "role";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "isOnboarded" BOOLEAN NOT NULL DEFAULT false;
