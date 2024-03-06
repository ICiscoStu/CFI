import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()



async function main() {

    //initial user creation in db
    const admin = await prisma.user.upsert({
        where: { email: 'developer@alamobrass.com' },
        update: {},
        create: {
            id: "user_2clz7rFrMqeDgF0kFfzSmIWrfiZ",
            email: 'developer@alamobrass.com',
            fullName: 'Alamo Brass Admin',
            userName: 'abrassa',
            role: 'administrator'
        },
    });

    const contractor_admin = await prisma.user.upsert({
        where: { email: 'developer@alamobrasstechnologies.com' },
        update: {},
        create: {
            id: "user_2cSJNbmFOl1KPAKa6T5WbBTRkcX",
            email: 'developer@alamobrasstechnologies.com',
            fullName: 'Alamo Brass Technologies Admin',
            userName: 'abtadmin',
            role: 'contractor_administrator'
        },
    });

    console.log({ admin, contractor_admin });

    const looup_inventoryItems = await prisma.lookup_InventoryItems.createMany({
        data: [
            { name: "Wall Base A", isActive: true, order: 0},
            { name: "Ceiling Base A", isActive: true, order: 0},
            { name: "Top Coat", isActive: true, order: 0 },
            { name: "Wall Base B", isActive: true, order: 0 },
            { name: "Ceiling Base B", isActive: true, order: 0 },
            { name: "Crack Fill", isActive: true, order: 0 },
            { name: "Packs of Glass", isActive: true, order: 0 },
            { name: "Green tips", isActive: true, order: 1 },
            { name: "Boxes of Gloves S", isActive: true, order: 1 },
            { name: "Boxes of Gloves M", isActive: true, order: 1 },
            { name: "Boxes of Gloves L", isActive: true, order: 1},
            { name: "Tyvek Suit S", isActive: true, order: 1 },
            { name: "Tyvek Suit M", isActive: true, order: 1 },
            { name: "Tyvek Suit L", isActive: true, order: 1 },
            { name: "Tyvek Suit XL", isActive: true, order: 1},
            { name: "Boxes of Plungers", isActive: true, order: 1}
        ]
    });
    console.log({ looup_inventoryItems });

    const warehouse = await prisma.warehouse.createMany({
        data: [
            { name: "Test WareHouse", address: "0001 Factory Rd, San Antonio, TX 78201", city: "San Antonio", state: "TX", zip: "78201" },
            { name: "Alamo Brass Warehouse", address: "0002 Warehouse Rd, San Antonio, TX 78201", city: "San Antonio", state: "TX", zip: "78201" },
        ]

    });

    const warehouse_inventory = await prisma.warehouseInventory.createMany({
        data: [
            { warehouseId: 1, inventoryItem: "Wall Base A", quantity: 1000 },
            { warehouseId: 1, inventoryItem: "Ceiling Base A", quantity: 1000 },
            { warehouseId: 1, inventoryItem: "Top Coat", quantity: 1000 },
            { warehouseId: 1, inventoryItem: "Wall Base B", quantity: 1000 },
            { warehouseId: 1, inventoryItem: "Ceiling Base B", quantity: 1000 },
            { warehouseId: 1, inventoryItem: "Crack Fill", quantity: 1000 },
            { warehouseId: 1, inventoryItem: "Packs of Glass", quantity: 1000 },
            { warehouseId: 1, inventoryItem: "Green tips", quantity: 1000 },
            { warehouseId: 1, inventoryItem: "Boxes of Gloves S", quantity: 1000 },
            { warehouseId: 1, inventoryItem: "Boxes of Gloves M", quantity: 1000 },
            { warehouseId: 1, inventoryItem: "Boxes of Gloves L", quantity: 1000 },
            { warehouseId: 1, inventoryItem: "Tyvek Suit S", quantity: 1000 },
            { warehouseId: 1, inventoryItem: "Tyvek Suit M", quantity: 1000 },
            { warehouseId: 1, inventoryItem: "Tyvek Suit L", quantity: 1000 },
            { warehouseId: 1, inventoryItem: "Tyvek Suit XL", quantity: 1000 },
            { warehouseId: 1, inventoryItem: "Boxes of Plungers", quantity: 1000 },
            { warehouseId: 2, inventoryItem: "Wall Base A", quantity: 1000 },
            { warehouseId: 2, inventoryItem: "Ceiling Base A", quantity: 1000 },
            { warehouseId: 2, inventoryItem: "Top Coat", quantity: 1000 },
            { warehouseId: 2, inventoryItem: "Wall Base B", quantity: 1000 },
            { warehouseId: 2, inventoryItem: "Ceiling Base B", quantity: 1000 },
            { warehouseId: 2, inventoryItem: "Crack Fill", quantity: 1000 },
            { warehouseId: 2, inventoryItem: "Packs of Glass", quantity: 1000 },
            { warehouseId: 2, inventoryItem: "Green tips", quantity: 1000 },
            { warehouseId: 2, inventoryItem: "Boxes of Gloves S", quantity: 1000 },
            { warehouseId: 2, inventoryItem: "Boxes of Gloves M", quantity: 1000 },
            { warehouseId: 2, inventoryItem: "Boxes of Gloves L", quantity: 1000 },
            { warehouseId: 2, inventoryItem: "Tyvek Suit S", quantity: 1000 },
            { warehouseId: 2, inventoryItem: "Tyvek Suit M", quantity: 1000 },
            { warehouseId: 2, inventoryItem: "Tyvek Suit L", quantity: 1000 },
            { warehouseId: 2, inventoryItem: "Tyvek Suit XL", quantity: 1000 },
            { warehouseId: 2, inventoryItem: "Boxes of Plungers", quantity: 1000 }
        ]
    });

    console.log({ warehouse, warehouse_inventory });

    const mobile_factory = await prisma.mobileFactory.createMany({
        data: [
            { name: "Test Mobile Factory", plateNumber: "ABC123", warehouseId: 1 },
            { name: "Mobile Factory II", plateNumber: "DEF456", warehouseId: 1 },
            { name: "Alamo Brass Mobile Factory", plateNumber: "GHJ456", warehouseId: 2 },
            { name: "Alamo Brass Mobile Factory II", plateNumber: "KLM789", warehouseId: 2 }
        ]
    });

    console.log({ mobile_factory });
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
