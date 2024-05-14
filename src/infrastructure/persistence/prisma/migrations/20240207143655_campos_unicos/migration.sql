/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `managements` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `services` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "managements_name_key" ON "managements"("name");

-- CreateIndex
CREATE UNIQUE INDEX "services_name_key" ON "services"("name");
