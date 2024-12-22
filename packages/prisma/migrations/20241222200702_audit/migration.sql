-- AlterTable
ALTER TABLE "address" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "attachment" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "audit_log" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "custom_field" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "department" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "digital_certificate" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "document" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "document_user" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "document_version" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "document_version_creator" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "file_metadata" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "help_topic" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "institution" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "notification" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "shared_document" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "sla_plan" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "task" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "task_user" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "ticket" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "ticket_attachment" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "ticket_collaborator" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "ticket_custom_field" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "ticket_priority" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "ticket_status" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "ticket_thread" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "ticket_user" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "user_department" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "user_on_documents" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "workflow" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "tenantId" TEXT,
ADD COLUMN     "updatedBy" TEXT;
