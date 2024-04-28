/*
  Warnings:

  - You are about to drop the column `primaryQuantity` on the `MobileFactoryInventory` table. All the data in the column will be lost.
  - You are about to drop the column `secondaryQuantity` on the `MobileFactoryInventory` table. All the data in the column will be lost.
  - You are about to drop the column `primaryQuantity` on the `WarehouseInventory` table. All the data in the column will be lost.
  - You are about to drop the column `secondaryQuantity` on the `WarehouseInventory` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ActiveJobs] DROP CONSTRAINT [ActiveJobs_status_df];
ALTER TABLE [dbo].[ActiveJobs] ADD CONSTRAINT [ActiveJobs_status_df] DEFAULT 'Pending_Dispatch' FOR [status];

-- AlterTable
ALTER TABLE [dbo].[MobileFactoryInventory] DROP COLUMN [primaryQuantity],
[secondaryQuantity];
ALTER TABLE [dbo].[MobileFactoryInventory] ADD [quantity] INT NOT NULL CONSTRAINT [MobileFactoryInventory_quantity_df] DEFAULT 0;

-- AlterTable
ALTER TABLE [dbo].[WarehouseInventory] DROP COLUMN [primaryQuantity],
[secondaryQuantity];
ALTER TABLE [dbo].[WarehouseInventory] ADD [quantity] INT NOT NULL CONSTRAINT [WarehouseInventory_quantity_df] DEFAULT 0;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
