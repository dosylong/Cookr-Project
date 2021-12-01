/*
  Warnings:

  - You are about to drop the column `cookTime` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `instructions` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `prepTime` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `servings` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `totalTime` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "cookTime",
DROP COLUMN "instructions",
DROP COLUMN "prepTime",
DROP COLUMN "servings",
DROP COLUMN "totalTime";
