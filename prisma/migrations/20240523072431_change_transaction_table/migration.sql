/*
  Warnings:

  - You are about to drop the column `enable_password_protection` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `enable_receipt_expense_goals` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `include_residual_balances_in_reports` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `installment_configuration` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `fit_id` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trn_type` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "enable_password_protection",
DROP COLUMN "enable_receipt_expense_goals",
DROP COLUMN "include_residual_balances_in_reports",
DROP COLUMN "installment_configuration",
ADD COLUMN     "fit_id" TEXT NOT NULL,
ADD COLUMN     "trn_type" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
