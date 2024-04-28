BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [fullName] NVARCHAR(1000),
    [userName] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [User_status_df] DEFAULT 'Active',
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [User_userName_key] UNIQUE NONCLUSTERED ([userName])
);

-- CreateTable
CREATE TABLE [dbo].[Contractor] (
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Contractor_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [id] INT NOT NULL IDENTITY(1,1),
    [contractorId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Contractor_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[JobDetails] (
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [JobDetails_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [id] INT NOT NULL IDENTITY(1,1),
    [vaultNumber] NVARCHAR(1000) NOT NULL,
    [owner] NVARCHAR(1000) NOT NULL,
    [city] NVARCHAR(1000) NOT NULL,
    [state] NVARCHAR(1000) NOT NULL,
    [vaultWidthFt] DECIMAL(10,2) NOT NULL,
    [vaultHeightFt] DECIMAL(10,2) NOT NULL,
    [vaultLengthFt] DECIMAL(10,2) NOT NULL,
    [vaultWidthIn] DECIMAL(10,2) NOT NULL,
    [vaultHeightIn] DECIMAL(10,2) NOT NULL,
    [vaultLengthIn] DECIMAL(10,2) NOT NULL,
    [wallSqFt] DECIMAL(10,2) NOT NULL,
    [ceilingSqFt] DECIMAL(10,2) NOT NULL,
    [totalSqFt] DECIMAL(10,2) NOT NULL,
    CONSTRAINT [JobDetails_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[JobAdditionalFiles] (
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [JobAdditionalFiles_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [id] INT NOT NULL IDENTITY(1,1),
    [PotentialJobId] INT NOT NULL,
    [fileName] NVARCHAR(1000) NOT NULL,
    [filetype] NVARCHAR(1000) NOT NULL,
    [fileExt] NVARCHAR(1000) NOT NULL,
    [file] VARBINARY(max) NOT NULL,
    CONSTRAINT [JobAdditionalFiles_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PotentialJobs] (
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PotentialJobs_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [id] INT NOT NULL IDENTITY(1,1),
    [createdById] NVARCHAR(1000) NOT NULL,
    [contractorId] NVARCHAR(1000) NOT NULL,
    [jobDetailsId] INT NOT NULL,
    CONSTRAINT [PotentialJobs_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[SubmittedJobs] (
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [SubmittedJobs_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [id] INT NOT NULL IDENTITY(1,1),
    [submittedById] NVARCHAR(1000) NOT NULL,
    [contractorId] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [SubmittedJobs_status_df] DEFAULT 'Pending',
    [jobDetailsId] INT NOT NULL,
    CONSTRAINT [SubmittedJobs_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ApprovedJobs] (
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ApprovedJobs_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [id] INT NOT NULL IDENTITY(1,1),
    [approvedById] NVARCHAR(1000) NOT NULL,
    [contractorId] NVARCHAR(1000) NOT NULL,
    [jobDetailsId] INT NOT NULL,
    [mobileFactoryId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ApprovedJobs_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ActiveJobs] (
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ActiveJobs_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [id] INT NOT NULL IDENTITY(1,1),
    [contractorId] NVARCHAR(1000) NOT NULL,
    [jobDetailsId] INT NOT NULL,
    [mobileFactoryId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ActiveJobs_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[MobileFactory] (
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [MobileFactory_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [id] INT NOT NULL IDENTITY(1,1),
    [tpId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [plateNumber] NVARCHAR(1000) NOT NULL,
    [warehouseId] INT NOT NULL,
    CONSTRAINT [MobileFactory_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [MobileFactory_tpId_key] UNIQUE NONCLUSTERED ([tpId])
);

-- CreateTable
CREATE TABLE [dbo].[MobileFactoryInventory] (
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [MobileFactoryInventory_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [id] INT NOT NULL IDENTITY(1,1),
    [mobileFactoryId] INT NOT NULL,
    [inventoryItem] NVARCHAR(1000) NOT NULL,
    [primaryQuantity] INT NOT NULL,
    [secondaryQuantity] INT,
    CONSTRAINT [MobileFactoryInventory_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Warehouse] (
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Warehouse_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [address] NVARCHAR(1000) NOT NULL,
    [city] NVARCHAR(1000) NOT NULL,
    [state] NVARCHAR(1000) NOT NULL,
    [zip] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Warehouse_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[WarehouseInventory] (
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [WarehouseInventory_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [id] INT NOT NULL IDENTITY(1,1),
    [warehouseId] INT NOT NULL,
    [inventoryItem] NVARCHAR(1000) NOT NULL,
    [primaryQuantity] INT NOT NULL,
    [secondaryQuantity] INT,
    CONSTRAINT [WarehouseInventory_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Lookup_InventoryItems] (
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Lookup_InventoryItems_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [index] INT NOT NULL IDENTITY(1,1),
    [isActive] BIT NOT NULL CONSTRAINT [Lookup_InventoryItems_isActive_df] DEFAULT 1,
    [order] INT NOT NULL CONSTRAINT [Lookup_InventoryItems_order_df] DEFAULT 0,
    [primaryUnit] NVARCHAR(1000) NOT NULL,
    [secondaryUnit] NVARCHAR(1000),
    CONSTRAINT [Lookup_InventoryItems_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[MixingLog] (
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [MixingLog_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [id] INT NOT NULL IDENTITY(1,1),
    [mobileFactoryId] NVARCHAR(1000) NOT NULL,
    [Material] NVARCHAR(1000) NOT NULL,
    [PartBDose] INT NOT NULL,
    [BWallLevel] INT NOT NULL,
    [BCeilingLevel] INT NOT NULL,
    [MixTime] INT NOT NULL,
    [LotNumber] NVARCHAR(1000) NOT NULL,
    [GPSLat] NVARCHAR(1000) NOT NULL,
    [GPSLong] NVARCHAR(1000) NOT NULL,
    [LOGTime] NVARCHAR(1000) NOT NULL,
    [LOGDate] NVARCHAR(1000) NOT NULL,
    [Box1Temp] DECIMAL(32,16) NOT NULL,
    [Box2Temp] DECIMAL(32,16) NOT NULL,
    [GENHours] INT NOT NULL,
    CONSTRAINT [MixingLog_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Contractor] ADD CONSTRAINT [Contractor_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[JobAdditionalFiles] ADD CONSTRAINT [JobAdditionalFiles_PotentialJobId_fkey] FOREIGN KEY ([PotentialJobId]) REFERENCES [dbo].[PotentialJobs]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PotentialJobs] ADD CONSTRAINT [PotentialJobs_createdById_fkey] FOREIGN KEY ([createdById]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PotentialJobs] ADD CONSTRAINT [PotentialJobs_jobDetailsId_fkey] FOREIGN KEY ([jobDetailsId]) REFERENCES [dbo].[JobDetails]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SubmittedJobs] ADD CONSTRAINT [SubmittedJobs_jobDetailsId_fkey] FOREIGN KEY ([jobDetailsId]) REFERENCES [dbo].[JobDetails]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SubmittedJobs] ADD CONSTRAINT [SubmittedJobs_submittedById_fkey] FOREIGN KEY ([submittedById]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ApprovedJobs] ADD CONSTRAINT [ApprovedJobs_approvedById_fkey] FOREIGN KEY ([approvedById]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ApprovedJobs] ADD CONSTRAINT [ApprovedJobs_jobDetailsId_fkey] FOREIGN KEY ([jobDetailsId]) REFERENCES [dbo].[JobDetails]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ApprovedJobs] ADD CONSTRAINT [ApprovedJobs_mobileFactoryId_fkey] FOREIGN KEY ([mobileFactoryId]) REFERENCES [dbo].[MobileFactory]([tpId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ActiveJobs] ADD CONSTRAINT [ActiveJobs_jobDetailsId_fkey] FOREIGN KEY ([jobDetailsId]) REFERENCES [dbo].[JobDetails]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ActiveJobs] ADD CONSTRAINT [ActiveJobs_mobileFactoryId_fkey] FOREIGN KEY ([mobileFactoryId]) REFERENCES [dbo].[MobileFactory]([tpId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[MobileFactory] ADD CONSTRAINT [MobileFactory_warehouseId_fkey] FOREIGN KEY ([warehouseId]) REFERENCES [dbo].[Warehouse]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[MobileFactoryInventory] ADD CONSTRAINT [MobileFactoryInventory_inventoryItem_fkey] FOREIGN KEY ([inventoryItem]) REFERENCES [dbo].[Lookup_InventoryItems]([name]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[MobileFactoryInventory] ADD CONSTRAINT [MobileFactoryInventory_mobileFactoryId_fkey] FOREIGN KEY ([mobileFactoryId]) REFERENCES [dbo].[MobileFactory]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[WarehouseInventory] ADD CONSTRAINT [WarehouseInventory_inventoryItem_fkey] FOREIGN KEY ([inventoryItem]) REFERENCES [dbo].[Lookup_InventoryItems]([name]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[WarehouseInventory] ADD CONSTRAINT [WarehouseInventory_warehouseId_fkey] FOREIGN KEY ([warehouseId]) REFERENCES [dbo].[Warehouse]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[MixingLog] ADD CONSTRAINT [MixingLog_mobileFactoryId_fkey] FOREIGN KEY ([mobileFactoryId]) REFERENCES [dbo].[MobileFactory]([tpId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

