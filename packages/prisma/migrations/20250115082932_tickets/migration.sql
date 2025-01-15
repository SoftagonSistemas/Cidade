/*
  Warnings:

  - You are about to drop the column `ticketThreadId` on the `ticket_attachment` table. All the data in the column will be lost.
  - Added the required column `threadId` to the `ticket_attachment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ticket_attachment" DROP CONSTRAINT "ticket_attachment_ticketThreadId_fkey";

-- DropIndex
DROP INDEX "ticket_thread_ticketId_key";

-- AlterTable
ALTER TABLE "ticket_attachment" DROP COLUMN "ticketThreadId",
ADD COLUMN     "threadId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "ticket_attachment" ADD CONSTRAINT "ticket_attachment_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "ticket_thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
