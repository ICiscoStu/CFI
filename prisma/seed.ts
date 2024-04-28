import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {

    const superadmin = await prisma.user.upsert({
        where: { email: 'developer@alamobrass.com' },
        update: {},
        create: {
            id: "user_2clz7rFrMqeDgF0kFfzSmIWrfiZ",
            email: 'developer@alamobrass.com',
            fullName: 'CFI Super Administrator',
            userName: 'cfisuper',
            role: 'cfi_super'
        },
    });

    const grunt = await prisma.user.upsert({
        where: { email: 'themrcisco@gmail.com' },
        update: {},
        create: {
            id: "user_2dxdPrb7kQe6EAtT1mK5y0puuDh",
            email: 'themrcisco@gmail.com',
            fullName: 'CFI Grunt',
            userName: 'cfigrunt',
            role: 'cfi_grunt'
        },
    });

    const admin = await prisma.user.upsert({
        where: { email: 'developer@alamobrasstechnologies.com' },
        update: {},
        create: {
            id: "user_2cSJNbmFOl1KPAKa6T5WbBTRkcX",
            email: 'developer@alamobrasstechnologies.com',
            fullName: 'CFI Administrator',
            userName: 'cfiadmin',
            role: 'cfi_admin'
        },
    });
    
    const contractor_admin = await prisma.user.upsert({
        where: { email: 'contractor_admin@contractor.com' },
        update: {},
        create: {
            id: "user_2dyMTvzOf1vJbWvg7E4uSc3Hx8k",
            email: 'contractor_admin@contractor.com',
            fullName: 'Alamo Brass Contractor Admin',
            userName: 'abadmin',
            role: 'contractor_administrator'
        },
    });

    const contractor_office = await prisma.user.upsert({
        where: { email: 'office@contractor.com' },
        update: {},
        create: {
            id: "user_2dyMW1Lq2ZyILUseuopwbxxOkQf",
            email: 'office@contractor.com',
            fullName: 'Alamo Brass Contractor Office',
            userName: 'aboffice',
            role: 'contractor_office'
        },
    });

    const contractor_field = await prisma.user.upsert({
        where: { email: 'field@contractor.com' },
        update: {},
        create: {
            id: "user_2dyMY2WIgqbLT7tXzFQxhJGjN1M",
            email: 'field@contractor.com',
            fullName: 'Alamo Brass Contractor Field',
            userName: 'abfield',
            role: 'contractor_field'
        },
    });

    const contractor = await prisma.contractor.createMany({
        data: [
            { userId: "user_2dyMTvzOf1vJbWvg7E4uSc3Hx8k", contractorId: '44e9cd6d-5f29-4481-a34a-78745f753457', detailsId: 1},
            { userId: "user_2dyMW1Lq2ZyILUseuopwbxxOkQf", contractorId: '44e9cd6d-5f29-4481-a34a-78745f753457', detailsId: 1},
            { userId: "user_2dyMY2WIgqbLT7tXzFQxhJGjN1M", contractorId: '44e9cd6d-5f29-4481-a34a-78745f753457', detailsId: 1}
        ]
    });

    const contractor_details = await prisma.contractorDetails.createMany({
        data: [
            { id: 1, name: 'Alamo contractor 25' }
        ]
    });

    console.log({ admin, contractor_admin, superadmin, contractor_field, contractor_office, grunt });
    console.log({ contractor, contractor_details });

    const lookup_inventoryItems = await prisma.lookup_InventoryItems.createMany({
        data: [
            { identifier: 'wallBase', name: "Wall Base", isActive: true, order: 0, primaryUnit: 'boxes', secondaryUnit: 'tubes' },
            { identifier: 'ceilingBase', name: "Ceiling Base", isActive: true, order: 0, primaryUnit: 'boxes', secondaryUnit: 'tubes' },
            { identifier: 'topCoat', name: "Top Coat", isActive: true, order: 0, primaryUnit: 'boxes', secondaryUnit: 'tubes' },
            { identifier: 'partBWall', name: "Wall B", isActive: true, order: 0, primaryUnit: 'boxes', secondaryUnit: 'tubes' },
            { identifier: 'partBCeiling', name: "Ceiling B", isActive: true, order: 0, primaryUnit: 'boxes', secondaryUnit: 'tubes' },
            { identifier: 'crackFill', name: "Crack Fill", isActive: true, order: 0, primaryUnit: 'boxes', secondaryUnit: 'tubes' },
            { identifier: 'glass', name: "Packs of Glass", isActive: true, order: 0, primaryUnit: 'boxes', secondaryUnit: 'tubes' },
        ]
    });
    console.log({ lookup_inventoryItems });

    const warehouse = await prisma.warehouse.createMany({
        data: [
            { name: "Test WareHouse", address: "0001 Factory Rd, San Antonio, TX 78201", city: "San Antonio", state: "TX", zip: "78201" },
            { name: "Alamo Brass Warehouse", address: "0002 Warehouse Rd, San Antonio, TX 78201", city: "San Antonio", state: "TX", zip: "78201" },
        ]

    });

    const warehouse_inventory = await prisma.warehouseInventory.createMany({
        data: [
            { warehouseId: 1, inventoryItem: "crackFill", quantity: 1000},
            { warehouseId: 1, inventoryItem: "wallBase", quantity: 1000},
            { warehouseId: 1, inventoryItem: "ceilingBase", quantity: 1000},
            { warehouseId: 1, inventoryItem: "glass", quantity: 1000},
            { warehouseId: 1, inventoryItem: "topCoat", quantity: 1000},
            { warehouseId: 1, inventoryItem: "partBWall", quantity: 1000},
            { warehouseId: 1, inventoryItem: "partBCeiling", quantity: 1000},
            { warehouseId: 2, inventoryItem: "crackFill", quantity: 1000},
            { warehouseId: 2, inventoryItem: "wallBase", quantity: 1000},
            { warehouseId: 2, inventoryItem: "ceilingBase", quantity: 1000},
            { warehouseId: 2, inventoryItem: "glass", quantity: 1000},
            { warehouseId: 2, inventoryItem: "topCoat", quantity: 1000},
            { warehouseId: 2, inventoryItem: "partBWall", quantity: 1000},
            { warehouseId: 2, inventoryItem: "partBCeiling", quantity: 1000},
        ]
    });

    console.log({ warehouse, warehouse_inventory });


    const mobile_factory = await prisma.mobileFactory.createMany({
        data: [
            { name: "Mobile Factory Van", plateNumber: "ABC123", warehouseId: 1, tpId: "V1" },
            { name: "Mobile Factory Trailer", plateNumber: "GHJ456", warehouseId: 2, tpId:"T1"},
            
        ]
    });

    console.log({ mobile_factory });

    const mobile_factory_inventory = await prisma.mobileFactoryInventory.createMany({
        data: [
            { sortIndex: 1, mobileFactoryId: 1, inventoryItem: "wallBase", quantity: 20},
            { sortIndex: 2, mobileFactoryId: 1, inventoryItem: "ceilingBase", quantity: 23},
            { sortIndex: 4, mobileFactoryId: 1, inventoryItem: "topCoat", quantity: 12},
            { sortIndex: 5, mobileFactoryId: 1, inventoryItem: "partBWall", quantity: 45},
            { sortIndex: 6, mobileFactoryId: 1, inventoryItem: "partBCeiling", quantity: 40},
            { sortIndex: 0, mobileFactoryId: 1, inventoryItem: "crackFill", quantity: 100},
            { sortIndex: 3, mobileFactoryId: 1, inventoryItem: "glass", quantity: 111},
            { sortIndex: 1, mobileFactoryId: 2, inventoryItem: "wallBase", quantity: 32},
            { sortIndex: 2, mobileFactoryId: 2, inventoryItem: "ceilingBase", quantity: 45},
            { sortIndex: 4, mobileFactoryId: 2, inventoryItem: "topCoat", quantity: 23},
            { sortIndex: 5, mobileFactoryId: 2, inventoryItem: "partBWall", quantity: 84},
            { sortIndex: 6, mobileFactoryId: 2, inventoryItem: "partBCeiling", quantity: 39},
            { sortIndex: 0, mobileFactoryId: 2, inventoryItem: "crackFill", quantity: 45},
            { sortIndex: 3, mobileFactoryId: 2, inventoryItem: "glass", quantity: 75},
        ]
    });

    console.log({ mobile_factory_inventory });
};

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
