-- DropIndex
DROP INDEX "Click_urlId_key";

-- AlterTable
ALTER TABLE "Click" ADD CONSTRAINT "Click_pkey" PRIMARY KEY ("id");
