-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "apiUserId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "keywords" TEXT[],
    "ocrText" TEXT,
    "ownerId" UUID NOT NULL,
    "signed" BOOLEAN NOT NULL DEFAULT false,
    "signedAt" TIMESTAMP(3),
    "signature" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentVersion" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "documentId" UUID NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "filePath" TEXT NOT NULL,
    "changesDescription" TEXT,
    "createdById" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workflow" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workflow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "workflowId" UUID NOT NULL,
    "assignedToId" UUID,
    "documentId" UUID,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "taskId" UUID NOT NULL,
    "action" TEXT NOT NULL,
    "performedById" UUID NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedDocument" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "documentId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "sharedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SharedDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DigitalCertificate" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "filePath" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DigitalCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileMetadata" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "documentId" UUID NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "checksum" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FileMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "back3nd_user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "reset_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "back3nd_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "back3nd_role" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "back3nd_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "back3nd_user_role" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "back3nd_user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "back3nd_permission" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "role_id" UUID NOT NULL,
    "table_id" UUID NOT NULL,
    "can_create" BOOLEAN NOT NULL DEFAULT false,
    "can_read" BOOLEAN NOT NULL DEFAULT false,
    "can_update" BOOLEAN NOT NULL DEFAULT false,
    "can_delete" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "back3nd_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "back3nd_entity" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "back3nd_entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "back3nd_entity_fields" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "columnName" TEXT NOT NULL,
    "columnType" TEXT NOT NULL,
    "size" INTEGER,
    "placeholder" TEXT,
    "defaultValue" TEXT,
    "isUnique" BOOLEAN NOT NULL,
    "entity_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "back3nd_entity_fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "back3nd_password_reset" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "back3nd_password_reset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_apiUserId_key" ON "User"("apiUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FileMetadata_documentId_key" ON "FileMetadata"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "back3nd_user_email_key" ON "back3nd_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "back3nd_role_name_key" ON "back3nd_role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "back3nd_user_role_user_id_role_id_key" ON "back3nd_user_role"("user_id", "role_id");

-- CreateIndex
CREATE UNIQUE INDEX "back3nd_permission_role_id_table_id_key" ON "back3nd_permission"("role_id", "table_id");

-- CreateIndex
CREATE UNIQUE INDEX "back3nd_entity_name_key" ON "back3nd_entity"("name");

-- CreateIndex
CREATE INDEX "back3nd_entity_fields_entity_id_idx" ON "back3nd_entity_fields"("entity_id");

-- CreateIndex
CREATE UNIQUE INDEX "back3nd_entity_fields_entity_id_columnName_key" ON "back3nd_entity_fields"("entity_id", "columnName");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentVersion" ADD CONSTRAINT "DocumentVersion_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentVersion" ADD CONSTRAINT "DocumentVersion_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedDocument" ADD CONSTRAINT "SharedDocument_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedDocument" ADD CONSTRAINT "SharedDocument_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DigitalCertificate" ADD CONSTRAINT "DigitalCertificate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileMetadata" ADD CONSTRAINT "FileMetadata_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "back3nd_user_role" ADD CONSTRAINT "back3nd_user_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "back3nd_role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "back3nd_user_role" ADD CONSTRAINT "back3nd_user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "back3nd_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "back3nd_permission" ADD CONSTRAINT "back3nd_permission_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "back3nd_role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "back3nd_permission" ADD CONSTRAINT "back3nd_permission_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "back3nd_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "back3nd_entity_fields" ADD CONSTRAINT "back3nd_entity_fields_entity_id_fkey" FOREIGN KEY ("entity_id") REFERENCES "back3nd_entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "back3nd_password_reset" ADD CONSTRAINT "back3nd_password_reset_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "back3nd_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
