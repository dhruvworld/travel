/*
  Warnings:

  - You are about to drop the column `message` on the `customTour` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `customTour` table. All the data in the column will be lost.
  - Added the required column `destinations` to the `customTour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numTravelers` to the `customTour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `travelOnly` to the `customTour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customTour" DROP COLUMN "message",
DROP COLUMN "name",
ADD COLUMN     "destinations" TEXT NOT NULL,
ADD COLUMN     "numTravelers" INTEGER NOT NULL,
ADD COLUMN     "preferences" TEXT,
ADD COLUMN     "travelOnly" BOOLEAN NOT NULL;
