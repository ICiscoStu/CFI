/*
  Warnings:

  - You are about to drop the column `approvedById` on the `ActiveJobs` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[ActiveJobs] DROP CONSTRAINT [ActiveJobs_approvedById_fkey];

-- AlterTable
ALTER TABLE [dbo].[ActiveJobs] DROP COLUMN [approvedById];

-- CreateTable
CREATE TABLE [dbo].[ApprovedJobs] (
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ApprovedJobs_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [id] INT NOT NULL IDENTITY(1,1),
    [contractorId] NVARCHAR(1000) NOT NULL,
    [jobDetailsId] INT NOT NULL,
    [approvedById] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ApprovedJobs_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[ApprovedJobs] ADD CONSTRAINT [ApprovedJobs_approvedById_fkey] FOREIGN KEY ([approvedById]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ApprovedJobs] ADD CONSTRAINT [ApprovedJobs_jobDetailsId_fkey] FOREIGN KEY ([jobDetailsId]) REFERENCES [dbo].[JobDetails]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
