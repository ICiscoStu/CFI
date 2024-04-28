BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[ActiveJobs] DROP CONSTRAINT [ActiveJobs_approvedById_fkey];

-- AlterTable
ALTER TABLE [dbo].[ActiveJobs] ADD [assignedToId] NVARCHAR(1000);

-- AddForeignKey
ALTER TABLE [dbo].[ActiveJobs] ADD CONSTRAINT [ActiveJobs_approvedById_fkey] FOREIGN KEY ([approvedById]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ActiveJobs] ADD CONSTRAINT [ActiveJobs_assignedToId_fkey] FOREIGN KEY ([assignedToId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
