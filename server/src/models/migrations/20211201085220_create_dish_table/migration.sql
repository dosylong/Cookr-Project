-- CreateTable
CREATE TABLE "Dish" (
    "id" SERIAL NOT NULL,
    "authorId" TEXT,
    "name" TEXT,
    "description" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dish" ADD FOREIGN KEY ("authorId") REFERENCES "User"("userFirebaseId") ON DELETE SET NULL ON UPDATE CASCADE;
