/*
  Warnings:

  - Added the required column `cookTime` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prepTime` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serving` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "cookTime" INTEGER NOT NULL,
ADD COLUMN     "prepTime" INTEGER NOT NULL,
ADD COLUMN     "serving" INTEGER NOT NULL;
