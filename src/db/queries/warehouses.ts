'use server';

import { db } from "@/db";



export async function getWarehouses(): Promise<any[]> {
    const warehouses = await db.warehouse.findMany({
        select: {
            id: true,
            name: true,
        }
    });

    return warehouses;
}