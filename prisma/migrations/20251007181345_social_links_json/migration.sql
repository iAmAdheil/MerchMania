/*
  Warnings:

  - Changed the type of `socialLinks` on the `Shop` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Shop" ALTER COLUMN "contact" SET DEFAULT '',
ALTER COLUMN "location" SET DEFAULT '',
DROP COLUMN "socialLinks",
ADD COLUMN     "socialLinks" JSONB NOT NULL;
