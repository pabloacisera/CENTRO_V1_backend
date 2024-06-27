/*
  Warnings:

  - Changed the type of `codigo` on the `Nomenclatura` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `valor` on the `Nomenclatura` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Nomenclatura" DROP COLUMN "codigo",
ADD COLUMN     "codigo" INTEGER NOT NULL,
DROP COLUMN "valor",
ADD COLUMN     "valor" INTEGER NOT NULL;
