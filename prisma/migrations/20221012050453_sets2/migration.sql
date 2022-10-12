/*
  Warnings:

  - You are about to drop the column `workoutId` on the `Sets` table. All the data in the column will be lost.
  - Added the required column `exerciseId` to the `Sets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sets" DROP CONSTRAINT "Sets_workoutId_fkey";

-- AlterTable
ALTER TABLE "Sets" DROP COLUMN "workoutId",
ADD COLUMN     "exerciseId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Sets" ADD CONSTRAINT "Sets_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
