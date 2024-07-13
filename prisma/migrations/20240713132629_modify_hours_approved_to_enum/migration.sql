/*
  Warnings:

  - The `approved` column on the `hours` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "HoursStatus" AS ENUM ('APPROVED', 'REFUSED', 'WAITING');

-- AlterTable
ALTER TABLE "hours" DROP COLUMN "approved",
ADD COLUMN     "approved" "HoursStatus" NOT NULL DEFAULT 'WAITING';
