'use server';

import { db } from "@/db";
import type { MobileFactory, MobileFactoryInventory } from "@prisma/client";
import { currentUser } from '@clerk/nextjs';



export async function getMobileFactories(): Promise<IMobileFactory[]> {
    const mobileFactories = await db.mobileFactory.findMany({
        select: {
            id: true,
            name: true,
            tpId: true,
            plateNumber: true,
            warehouseId: true
        }
    });

    return mobileFactories;
}

export async function getMobileFactory(id: string): Promise<any> {
    const mobileFactory = await db.mobileFactory.findUnique({
        where: {
            tpId: id
        },
        include: {
            mobileFactoryInventory: {
                orderBy: {
                    sortIndex: 'asc'
                }
            }
        },


    });

    return mobileFactory;
}   