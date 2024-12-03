/*
  Warnings:

  - Made the column `userId` on table `Click` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Click" DROP CONSTRAINT "Click_userId_fkey";

-- AlterTable
ALTER TABLE "Click" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
