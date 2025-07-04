/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "name",
ADD COLUMN     "image" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "searchHistory" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "username" TEXT NOT NULL;
