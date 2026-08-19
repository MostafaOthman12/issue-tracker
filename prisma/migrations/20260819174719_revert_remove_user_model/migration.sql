/*
  Warnings:

  - You are about to drop the column `assignedToUserId` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Issue` DROP FOREIGN KEY `Issue_assignedToUserId_fkey`;

-- DropIndex
DROP INDEX `Issue_assignedToUserId_fkey` ON `Issue`;

-- AlterTable
ALTER TABLE `Issue` DROP COLUMN `assignedToUserId`;

-- DropTable
DROP TABLE `User`;
