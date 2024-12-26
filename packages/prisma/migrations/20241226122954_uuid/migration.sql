-- DropForeignKey
ALTER TABLE "institution" DROP CONSTRAINT "institution_mayorId_fkey";

-- DropForeignKey
ALTER TABLE "institution" DROP CONSTRAINT "institution_viceMayorId_fkey";

-- AlterTable
ALTER TABLE "institution" ALTER COLUMN "mayorId" SET DATA TYPE TEXT,
ALTER COLUMN "viceMayorId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "contact_info" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "dayOfWeek" INTEGER,
    "departmentId" INTEGER,
    "institutionId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "contact_info_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "institution" ADD CONSTRAINT "institution_mayorId_fkey" FOREIGN KEY ("mayorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institution" ADD CONSTRAINT "institution_viceMayorId_fkey" FOREIGN KEY ("viceMayorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_info" ADD CONSTRAINT "contact_info_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
