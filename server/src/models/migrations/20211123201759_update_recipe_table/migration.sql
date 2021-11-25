/*
  Warnings:

  - You are about to drop the column `postImage` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "postImage",
ADD COLUMN     "coverImage" TEXT[];
