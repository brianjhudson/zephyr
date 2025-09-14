-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clerk_user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT NOT NULL,
    "identifier" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Drink" (
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

-- CreateTable
CREATE TABLE "PhotoCredit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "photographer" TEXT NOT NULL,
    "photographerUrl" TEXT NOT NULL,
    "originalPhotoUrl" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerk_user_id_key" ON "User"("clerk_user_id");
