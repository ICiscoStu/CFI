/*
  Warnings:

  - You are about to drop the `ApprovedJobs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `approvedById` to the `ActiveJobs` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[ApprovedJobs] DROP CONSTRAINT [ApprovedJobs_approvedById_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ApprovedJobs] DROP CONSTRAINT [ApprovedJobs_jobDetailsId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ApprovedJobs] DROP CONSTRAINT [ApprovedJobs_mobileFactoryId_fkey];

-- AlterTable
ALTER TABLE [dbo].[ActiveJobs] ADD [approvedById] NVARCHAR(1000) NOT NULL,
[status] NVARCHAR(1000) NOT NULL CONSTRAINT [ActiveJobs_status_df] DEFAULT 'Unassigned';

-- DropTable
DROP TABLE [dbo].[ApprovedJobs];

-- AddForeignKey
ALTER TABLE [dbo].[ActiveJobs] ADD CONSTRAINT [ActiveJobs_approvedById_fkey] FOREIGN KEY ([approvedById]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
