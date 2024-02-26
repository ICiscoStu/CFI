'use server';

import { db } from '@/db';
import type { purchaseOrder } from '@prisma/client';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


import { currentUser } from "@clerk/nextjs";


export async function createPurchaseOrder(
    userId: string,
    potentialJobId: number,
    mobileFactoryId: number,
    wallSqFt: number,
    ceilingSqFt: number,
    totalSqFt: number,
): Promise<purchaseOrder> {
    const user = await currentUser();

    if (!user) {
        throw new Error('User not found');
    }

    const dbUser = await db.user.findUnique({
        where: {
            id: user.id
        },
        select: {
            userName: true,
        }
    });

    const purchaseOrder = await db.purchaseOrder.create({
        data: {
            status: 'Active',
            approvedToId: userId,
            assignedMobileFactoryId: mobileFactoryId,
            potentialJobId: potentialJobId,
            approvedByName: dbUser!.userName,
            wallSqFt: wallSqFt.toFixed(2),
            ceilingSqFt: ceilingSqFt.toFixed(2),
            totalSqFt: totalSqFt.toFixed(2),
            price: 0, //TODO: Pending Calculation
        }
    });

    await revalidatePath(`/admin/potential-jobs/details/${potentialJobId}`);

    return purchaseOrder;
}
