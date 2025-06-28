/*
  Warnings:

  - Added the required column `isOnboarded` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "session" ADD COLUMN     "isOnboarded" BOOLEAN NOT NULL,
ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'CUSTOMER';
