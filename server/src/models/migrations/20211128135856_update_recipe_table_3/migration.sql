-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "ingredientId" DROP NOT NULL,
ALTER COLUMN "prepTime" DROP NOT NULL,
ALTER COLUMN "cookTime" DROP NOT NULL,
ALTER COLUMN "servings" DROP NOT NULL,
ALTER COLUMN "recipeSlug" DROP NOT NULL;