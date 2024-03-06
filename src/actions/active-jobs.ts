'use server';

import { db } from '@/db';
import type { purchaseOrder } from '@prisma/client';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


import { currentUser } from "@clerk/nextjs";


export async function createPurchaseOrder(
    approvedToId: any,
    assignedMobileFactoryId: number,
    potentialJobId: number,
    wallSqFt: number,
    ceilingSqFt: number,
    totalSqFt: number,
): Promise<string> {
    const user = await currentUser();

    if (!user) {
        throw new Error('User not found');
    }
    
    try {
        const dbUser = await db.user.findUnique({
            where: {
                id: user.id
            },
            select: {
                userName: true,
            }
        });
    
        const purchaseOrder = db.purchaseOrder.create({
            data: {
                status: 'Active',
                approvedToId,
                assignedMobileFactoryId,
                potentialJobId,
                approvedByName: dbUser!.userName,
                wallSqFt,
                ceilingSqFt,
                totalSqFt,
                price: 0, //TODO: Pending Calculation
            }
        }).then(async (purchaseOrder) => {
            const potentialJob = await db.potentialJob.update({
                where: {
                    id: potentialJobId
                },
                data: {
                    status: 'Approved'
                }
            });
        });
    
        
    } catch (error : unknown) {
        if (error instanceof Error) {
            console.log(error);
            return 'An error occurred while creating the work order.';
        } else {
            return  'Something went wrong'
        }
        
    }
    
    await revalidatePath(`/admin/potential-jobs/details/${potentialJobId}`);
    redirect('/admin/potential-jobs/list');
}

export async function createPurchaseOrderInventoryCount(
    data: any
): Promise<void> {

    const user = await currentUser();

    const dbUser = await db.user.findUnique({
        where: {
            id: user!.id
        },
        select: {
            userName: true,
        }
    });
    await db.purchaseOrderDetails.create({
        data: {
            purchaseOrderId: data.purchaseOrderId,
            signedOffBy: data.signOffUser,
            signedOffDate: new Date(),
            mobileFactoryId: data.mobileFactoryId,
            inventoryCreatorUserId: dbUser!.userName,
            PurchaseOrderInventory: {
                createMany: {
                    data: data.items
                }
            }
        }
    });

    await revalidatePath(`/active-jobs/details/${data.purchaseOrderId}`);
    redirect('/active-jobs/list');
}