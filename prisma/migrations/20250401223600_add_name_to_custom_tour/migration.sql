/*
  Warnings:

  - The `destinations` column on the `customTour` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `name` to the `customTour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customTour" ADD COLUMN     "message" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "destinations",
ADD COLUMN     "destinations" TEXT[];
