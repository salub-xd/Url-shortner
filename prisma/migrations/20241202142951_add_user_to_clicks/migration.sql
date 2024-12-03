-- DropForeignKey
ALTER TABLE "Click" DROP CONSTRAINT "Click_userId_fkey";

-- AlterTable
ALTER TABLE "Click" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "userId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
