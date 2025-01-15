-- CreateTable
CREATE TABLE "service_card" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "status" TEXT NOT NULL,
    "createdBy" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" UUID,
    "updatedAt" TIMESTAMPTZ,
    "deletedAt" TIMESTAMP(3),
    "title" TEXT NOT NULL,
    "departmentId" UUID NOT NULL,
    "tag" JSONB,
    "document" TEXT,
    "cost" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,
    "inPerson" BOOLEAN NOT NULL,
    "online" BOOLEAN NOT NULL,
    "serviceCategory" TEXT NOT NULL,
    "city" INTEGER NOT NULL,
    "location" TEXT,
    "icon" TEXT,

    CONSTRAINT "service_card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "service_card" ADD CONSTRAINT "service_card_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
