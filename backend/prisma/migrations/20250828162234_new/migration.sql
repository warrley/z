/*
  Warnings:

  - You are about to drop the `Tren` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Tren`;

-- CreateTable
CREATE TABLE `Trend` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hastag` VARCHAR(191) NOT NULL,
    `counter` INTEGER NOT NULL DEFAULT 1,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
