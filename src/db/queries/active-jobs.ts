'use server';
import type { MobileFactoryInventory, purchaseOrder } from "@prisma/client";
import { db } from "@/db";
import { notFound } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

export async function getActiveJobsByUser(): Promise<any[]> {
    const user = await currentUser();

    if (!user) {
        throw new Error('User not found');
    }

    // const jobs = await db.purchaseOrder.findMany({
    //     where: {
    //         createdById: user.id
    //     },
    //     include: {
    //         createdBy: true
    //     }
    // });

    // const formattedJobs: IPotentialJob[] = jobs.map((job) => {
    //     return {
    //         ...job,
    //         createdAt: new Date(job.createdAt), // Convert createdAt to Date type
    //         updatedAt: new Date(job.updatedAt), // Convert updatedAt to Date type
    //         vaultWidth: Number(job.vaultWidth),
    //         vaultLength: Number(job.vaultLength),
    //         vaultHeight: Number(job.vaultHeight),
    //         approvedAt: job.approvedAt ? new Date(job.approvedAt).toString() : null, // Convert approvedAt to string type
    //     };
    // });
    // return formattedJobs;
    return [];
}