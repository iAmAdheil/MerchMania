/*
  Warnings:

  - The values [CUSTOMER,ADMIN,CREATOR] on the enum `ROLE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ROLE_new" AS ENUM ('customer', 'admin', 'creator');
ALTER TABLE "public"."user" ALTER COLUMN "role" TYPE "public"."ROLE_new" USING ("role"::text::"public"."ROLE_new");
ALTER TYPE "public"."ROLE" RENAME TO "ROLE_old";
ALTER TYPE "public"."ROLE_new" RENAME TO "ROLE";
DROP TYPE "public"."ROLE_old";
COMMIT;
