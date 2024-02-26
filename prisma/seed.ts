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
            { name: "Wall Base A" },
            { name: "Ceiling Base A" },
            { name: "Top Coat" },
            { name: "Wall Base B" },
            { name: "Ceiling Base B" },
            { name: "Crack Fill" },
            { name: "Packs of Glass" },
            { name: "Green tips" },
            { name: "Boxes of Gloves S" },
            { name: "Boxes of Gloves M" },
            { name: "Boxes of Gloves L" },
            { name: "Tyvek Suit S" },
            { name: "Tyvek Suit M" },
            { name: "Tyvek Suit L" },
            { name: "Tyvek Suit XL" },
            { name: "Boxes of Plungers" }
        ]
    });

    const Lookup_BaseMobileFactoryInventory = await prisma.lookup_BaseMobileFactoryInventory.createMany({
        data: [
            { inventoryItem: "Wall Base A", quantity: 100 },
            { inventoryItem: "Ceiling Base A", quantity: 100 },
            { inventoryItem: "Top Coat", quantity: 100 },
            { inventoryItem: "Wall Base B", quantity: 100 },
            { inventoryItem: "Ceiling Base B", quantity: 100 },
            { inventoryItem: "Crack Fill", quantity: 100 },
            { inventoryItem: "Packs of Glass", quantity: 100 },
            { inventoryItem: "Green tips", quantity: 100 },
            { inventoryItem: "Boxes of Gloves S", quantity: 100 },
            { inventoryItem: "Boxes of Gloves M", quantity: 100 },
            { inventoryItem: "Boxes of Gloves L", quantity: 100 },
            { inventoryItem: "Tyvek Suit S", quantity: 100 },
            { inventoryItem: "Tyvek Suit M", quantity: 100 },
            { inventoryItem: "Tyvek Suit L", quantity: 100 },
            { inventoryItem: "Tyvek Suit XL", quantity: 100 },
            { inventoryItem: "Boxes of Plungers", quantity: 100 },
        ]
    });
    console.log({ looup_inventoryItems, Lookup_BaseMobileFactoryInventory });

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

    const mobile_factory_inventory = await prisma.mobileFactoryInventory.createMany({
        data: [
            { mobileFactoryId: 1, inventoryItem: "Wall Base A", quantity: 20 },
            { mobileFactoryId: 1, inventoryItem: "Ceiling Base A", quantity: 22 },
            { mobileFactoryId: 1, inventoryItem: "Top Coat", quantity: 12 },
            { mobileFactoryId: 1, inventoryItem: "Wall Base B", quantity: 3 },
            { mobileFactoryId: 1, inventoryItem: "Ceiling Base B", quantity: 30 },
            { mobileFactoryId: 1, inventoryItem: "Crack Fill", quantity: 12 },
            { mobileFactoryId: 1, inventoryItem: "Packs of Glass", quantity: 4 },
            { mobileFactoryId: 1, inventoryItem: "Green tips", quantity: 7 },
            { mobileFactoryId: 1, inventoryItem: "Boxes of Gloves S", quantity: 19 },
            { mobileFactoryId: 1, inventoryItem: "Boxes of Gloves M", quantity: 10 },
            { mobileFactoryId: 1, inventoryItem: "Boxes of Gloves L", quantity: 12 },
            { mobileFactoryId: 1, inventoryItem: "Tyvek Suit S", quantity: 12 },
            { mobileFactoryId: 1, inventoryItem: "Tyvek Suit M", quantity: 20 },
            { mobileFactoryId: 1, inventoryItem: "Tyvek Suit L", quantity: 24 },
            { mobileFactoryId: 1, inventoryItem: "Tyvek Suit XL", quantity: 32 },
            { mobileFactoryId: 1, inventoryItem: "Boxes of Plungers", quantity: 12 },
            { mobileFactoryId: 2, inventoryItem: "Wall Base A", quantity: 10 },
            { mobileFactoryId: 2, inventoryItem: "Ceiling Base A", quantity: 11 },
            { mobileFactoryId: 2, inventoryItem: "Top Coat", quantity: 9 },
            { mobileFactoryId: 2, inventoryItem: "Wall Base B", quantity: 3 },
            { mobileFactoryId: 2, inventoryItem: "Ceiling Base B", quantity: 0 },
            { mobileFactoryId: 2, inventoryItem: "Crack Fill", quantity: 5 },
            { mobileFactoryId: 2, inventoryItem: "Packs of Glass", quantity: 20 },
            { mobileFactoryId: 2, inventoryItem: "Green tips", quantity: 1 },
            { mobileFactoryId: 2, inventoryItem: "Boxes of Gloves S", quantity: 14 },
            { mobileFactoryId: 2, inventoryItem: "Boxes of Gloves M", quantity: 14 },
            { mobileFactoryId: 2, inventoryItem: "Boxes of Gloves L", quantity: 17 },
            { mobileFactoryId: 2, inventoryItem: "Tyvek Suit S", quantity: 1 },
            { mobileFactoryId: 2, inventoryItem: "Tyvek Suit M", quantity: 1 },
            { mobileFactoryId: 2, inventoryItem: "Tyvek Suit L", quantity: 3 },
            { mobileFactoryId: 2, inventoryItem: "Tyvek Suit XL", quantity: 1 },
            { mobileFactoryId: 2, inventoryItem: "Boxes of Plungers", quantity: 10 }
        ]
    });

    console.log({ mobile_factory, mobile_factory_inventory });
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
