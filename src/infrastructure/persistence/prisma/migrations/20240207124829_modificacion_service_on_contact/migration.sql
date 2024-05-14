/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `services_on_contacts` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `services_on_contacts` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `services_on_contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "services_on_contacts" DROP COLUMN "assignedAt",
DROP COLUMN "assignedBy",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
