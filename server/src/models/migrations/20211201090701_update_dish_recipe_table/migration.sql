/*
  Warnings:

  - A unique constraint covering the columns `[dishSlug]` on the table `Dish` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dishSlug" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "cookTime" DOUBLE PRECISION,
ADD COLUMN     "prepTime" DOUBLE PRECISION,
ADD COLUMN     "servings" INTEGER,
ADD COLUMN     "totalTime" DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "Dish.dishSlug_unique" ON "Dish"("dishSlug");
