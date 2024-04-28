'use server';

import { db } from "@/db";

export async function getInventoryItems(): Promise<any[]> {
    const inventoryItems = await db.lookup_InventoryItems.findMany({
        where: {
            isActive: true
        },
    });

    return inventoryItems;
}   