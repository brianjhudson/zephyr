-- Drop User table if it exists
DROP TABLE IF EXISTS "User";

-- CreateTable (only if not exists)
CREATE TABLE IF NOT EXISTS "Drink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "abv" REAL NOT NULL,
    "isPopular" BOOLEAN NOT NULL,
    "photoCreditId" INTEGER NOT NULL,
    CONSTRAINT "Drink_photoCreditId_fkey" FOREIGN KEY ("photoCreditId") REFERENCES "PhotoCredit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable (only if not exists)
CREATE TABLE IF NOT EXISTS "PhotoCredit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "photographer" TEXT NOT NULL,
    "photographerUrl" TEXT NOT NULL,
    "originalPhotoUrl" TEXT NOT NULL
);