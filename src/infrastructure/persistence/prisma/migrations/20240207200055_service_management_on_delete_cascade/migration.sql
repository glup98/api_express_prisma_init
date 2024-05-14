-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_managementId_fkey";

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_managementId_fkey" FOREIGN KEY ("managementId") REFERENCES "managements"("id") ON DELETE CASCADE ON UPDATE CASCADE;
