-- AlterTable
ALTER TABLE "institution" ADD COLUMN     "city" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "whatsapp" TEXT;

-- AlterTable
ALTER TABLE "ticket" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
