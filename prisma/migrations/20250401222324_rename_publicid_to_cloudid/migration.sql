/*
  Warnings:

  - Added the required column `cloudId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "category" TEXT,
ADD COLUMN     "cloudId" TEXT NOT NULL;
