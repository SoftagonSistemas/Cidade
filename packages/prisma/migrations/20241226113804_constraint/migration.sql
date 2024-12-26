/*
  Warnings:

  - A unique constraint covering the columns `[name,institutionId,isSecretariat]` on the table `department` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "department_name_institutionId_isSecretariat_key" ON "department"("name", "institutionId", "isSecretariat");
