/*
  Warnings:

  - A unique constraint covering the columns `[joinCode]` on the table `Startup` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Startup" ADD COLUMN     "joinCode" TEXT NOT NULL DEFAULT 'tempcode';

-- CreateIndex
CREATE UNIQUE INDEX "Startup_joinCode_key" ON "Startup"("joinCode");
