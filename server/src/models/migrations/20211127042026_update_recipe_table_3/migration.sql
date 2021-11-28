/*
  Warnings:

  - A unique constraint covering the columns `[recipeSlug]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recipeSlug` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "recipeSlug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Recipe.recipeSlug_unique" ON "Recipe"("recipeSlug");
