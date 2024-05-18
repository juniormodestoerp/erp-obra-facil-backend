/*
  Warnings:

  - Added the required column `bank_name` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current_balance` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `establishment_name` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previous_balance` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_amount` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_date` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "additional_comments" TEXT,
ADD COLUMN     "associated_contracts" TEXT,
ADD COLUMN     "associated_projects" TEXT,
ADD COLUMN     "bank_name" TEXT NOT NULL,
ADD COLUMN     "competency_date" TIMESTAMP(3),
ADD COLUMN     "cost_center" TEXT,
ADD COLUMN     "current_balance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "document_number" TEXT,
ADD COLUMN     "enable_password_protection" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "enable_receipt_expense_goals" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "establishment_name" TEXT NOT NULL,
ADD COLUMN     "include_residual_balances_in_reports" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "installment_configuration" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "payment_method" TEXT NOT NULL,
ADD COLUMN     "previous_balance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT,
ADD COLUMN     "total_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "transaction_date" TIMESTAMP(3) NOT NULL;
