/*
  Warnings:

  - Changed the type of `U.B` on the `Nomenclatura` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Nomenclatura" DROP COLUMN "U.B",
ADD COLUMN     "U.B" INTEGER NOT NULL,
ALTER COLUMN "valor" DROP NOT NULL;
