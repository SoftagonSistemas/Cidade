/*
  Warnings:

  - You are about to drop the column `parentSecretariatId` on the `Department` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_parentSecretariatId_fkey";

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "parentSecretariatId",
ADD COLUMN     "headId" UUID,
ADD COLUMN     "parentDepartmentId" INTEGER;

-- AlterTable
ALTER TABLE "Institution" ADD COLUMN     "address" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "emblem" TEXT,
ADD COLUMN     "flag" TEXT,
ADD COLUMN     "mayorId" UUID,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "viceMayorId" UUID;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "jobTitle" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "profilePhoto" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Institution" ADD CONSTRAINT "Institution_mayorId_fkey" FOREIGN KEY ("mayorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Institution" ADD CONSTRAINT "Institution_viceMayorId_fkey" FOREIGN KEY ("viceMayorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_parentDepartmentId_fkey" FOREIGN KEY ("parentDepartmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_headId_fkey" FOREIGN KEY ("headId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
