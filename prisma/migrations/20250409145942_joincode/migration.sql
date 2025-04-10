/*
  Warnings:

  - You are about to drop the column `whyInterested` on the `BetaUser` table. All the data in the column will be lost.
  - Added the required column `intent` to the `BetaUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joinCode` to the `Startup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BetaUser" DROP COLUMN "whyInterested",
ADD COLUMN     "intent" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Startup" ADD COLUMN     "joinCode" TEXT NOT NULL;
