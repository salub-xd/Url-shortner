-- AlterTable
ALTER TABLE "Click" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT 'defaultUserId';

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
