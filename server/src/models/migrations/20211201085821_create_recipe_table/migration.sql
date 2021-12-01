-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "difficulty" TEXT,
    "dishId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipe" ADD FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE SET NULL ON UPDATE CASCADE;
