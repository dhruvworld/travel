/*
  Warnings:

  - You are about to drop the column `name` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `publicId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `packageId` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Package` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Package` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `destinations` on the `customTour` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `customTour` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `customTour` table. All the data in the column will be lost.
  - You are about to drop the column `numTravelers` on the `customTour` table. All the data in the column will be lost.
  - You are about to drop the column `preferences` on the `customTour` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `customTour` table. All the data in the column will be lost.
  - You are about to drop the column `travelOnly` on the `customTour` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `customTour` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Package` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expiresAt` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `customTour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `customTour` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_packageId_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "name",
DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "category",
DROP COLUMN "publicId",
DROP COLUMN "updatedAt",
ADD COLUMN     "alt" TEXT;

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "endDate",
DROP COLUMN "isActive",
DROP COLUMN "name",
DROP COLUMN "packageId",
DROP COLUMN "startDate",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Package" DROP COLUMN "isActive",
DROP COLUMN "location",
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "highlights" TEXT[],
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "description",
DROP COLUMN "imageUrl",
DROP COLUMN "isActive",
DROP COLUMN "location",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
ADD COLUMN     "caption" TEXT,
ADD COLUMN     "packageId" TEXT,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "customTour" DROP COLUMN "destinations",
DROP COLUMN "endDate",
DROP COLUMN "fullName",
DROP COLUMN "numTravelers",
DROP COLUMN "preferences",
DROP COLUMN "startDate",
DROP COLUMN "travelOnly",
DROP COLUMN "updatedAt",
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "TourPackage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "highlights" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TourPackage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TourPackage_slug_key" ON "TourPackage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Package_slug_key" ON "Package"("slug");

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE SET NULL ON UPDATE CASCADE;
