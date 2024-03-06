'use server';
import type { purchaseOrder } from "@prisma/client";
import { db } from "@/db";
import { notFound } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

export async function getActiveJobsByUser(): Promise<any[]> {
    const user = await currentUser();

    if (!user) {
        throw new Error('User not found');
    }

    const jobs = await db.purchaseOrder.findMany({
        where: {
            approvedToId: user.id
        },
        select: {
            id: true,
            approvedToId: true,
            potentialJob: {
                select: {
                    vaultNumber: true,
                    owner: true,
                    city: true,
                    state: true,
                    vaultWidth: true,
                    vaultLength: true,
                    vaultHeight: true,
                    wallSqFt: true,
                    ceilingSqFt: true,
                    totalSqFt: true,
                }
            },
            assignedMobileFactory: {
                select: {
                    id: true,
                    name: true,
                    plateNumber: true,
                }
            }
        },
    });
    return jobs;
}


export async function getActiveJobDetail(id: number): Promise<IActiveJobWithMobileFactory> {
    const user = await currentUser();

    if (!user) {
        throw new Error('User not found');
    }

    const job = await db.purchaseOrder.findUnique({
        where: {
            id: id
        },
        select: {
            potentialJob: {
                select: {
                    vaultNumber: true,
                    owner: true,
                    city: true,
                    state: true,
                    vaultWidth: true,
                    vaultLength: true,
                    vaultHeight: true,
                    wallSqFt: true,
                    ceilingSqFt: true,
                    totalSqFt: true,
                }
            },
            assignedMobileFactory: {
                select: {
                    id: true,
                    name: true,
                    plateNumber: true,
                }
            }
        },
    });

    if (!job) {
        throw notFound();
    }

    const formattedJob: IActiveJobWithMobileFactory = {
        ...job,
        potentialJob: {
            ...job.potentialJob,
            vaultWidth: Number(job.potentialJob.vaultWidth),
            vaultLength: Number(job.potentialJob.vaultLength),
            vaultHeight: Number(job.potentialJob.vaultHeight),
            wallSqFt: Number(job.potentialJob.wallSqFt),
            ceilingSqFt: Number(job.potentialJob.ceilingSqFt),
            totalSqFt: Number(job.potentialJob.totalSqFt),
        },
    }
    return formattedJob;
}

export async function getBaseInventoryItems(): Promise<any[]> {
    const items = await db.lookup_InventoryItems.findMany({
        where: {
            order: 0
        }
    });
    return items;
}

export async function getExtraInventoryItems(): Promise<any[]> {
    const items = await db.lookup_InventoryItems.findMany({
        where: {
            order: 1
        }
    });
    return items;
}