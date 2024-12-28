/*
  Warnings:

  - You are about to drop the column `country` on the `address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "address" DROP COLUMN "country";

-- AlterTable
ALTER TABLE "department" ADD COLUMN     "addressId" UUID;

-- AddForeignKey
ALTER TABLE "department" ADD CONSTRAINT "department_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
