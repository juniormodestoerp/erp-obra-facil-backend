/*
  Warnings:

  - You are about to drop the column `description` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_id` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `model` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "description",
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "subcategory" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "transaction_id";
