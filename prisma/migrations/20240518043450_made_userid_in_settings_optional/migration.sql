/*
  Warnings:

  - Made the column `user_id` on table `settings` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "settings" DROP CONSTRAINT "settings_user_id_fkey";

-- AlterTable
ALTER TABLE "settings" ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
