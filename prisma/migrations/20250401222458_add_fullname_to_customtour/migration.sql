/*
  Warnings:

  - Added the required column `fullName` to the `customTour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customTour" ADD COLUMN     "fullName" TEXT NOT NULL;
