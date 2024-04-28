'use server';

import { db } from "@/db";
import type { ApprovedJobs } from "@prisma/client";
import { currentUser } from '@clerk/nextjs';

export async function getApprovedJobs(): Promise<ApprovedJobs[]> {

    const user = await currentUser();
    try {
        if (!user) {
            throw new Error('User not found');
        }

        const role: string = user!.publicMetadata.role as string;
        const contractorId: string = user!.privateMetadata.contractorId as string;

        if (contractorId && role === 'contractor_administrator' || role === 'contractor_office') {
            const result = await db.approvedJobs.findMany({
                where: {
                    contractorId: contractorId
                },
                orderBy: {
                    updatedAt: 'desc',
                },
                include: {
                    jobDetails: true,
                }
            });

            return result;

        // should only be available to admin    
        } else if (role === 'cfi_super' || role === 'cfi_admin') {

            return await db.approvedJobs.findMany({
                orderBy: {
                    updatedAt: 'desc',
                },
                include: {
                    jobDetails: true,
                }
            });
        } else {
            throw new Error('Unauthorized');
        }

    } catch (error) {
        console.error(error);
        throw error;
    }

}

export async function getApprovedJob(id: number): Promise<any | null> {

    const user = await currentUser();

    const role: string = user!.publicMetadata.role as string;
    const contractorId: string = user!.privateMetadata.contractorId as string;
    try {
        if (!user) {
            throw new Error('User not found');
        }

        const ActiveJob = await db.approvedJobs.findUnique({
            where: {
                id,
                contractorId: contractorId
            },
            include: {
                jobDetails: true
            }
        });

        if (!ActiveJob) {
            throw new Error('Active Job not found');
        }

        const formattedJobs = {
            ...ActiveJob.jobDetails,
            createdAt: new Date(ActiveJob.createdAt),
            updatedAt: new Date(ActiveJob.updatedAt),
            vaultWidthFt: Number(ActiveJob.jobDetails.vaultWidthFt),
            vaultLengthFt: Number(ActiveJob.jobDetails.vaultLengthFt),
            vaultHeightFt: Number(ActiveJob.jobDetails.vaultHeightFt),
            vaultWidthIn: Number(ActiveJob.jobDetails.vaultWidthIn),
            vaultLengthIn: Number(ActiveJob.jobDetails.vaultLengthIn),
            vaultHeightIn: Number(ActiveJob.jobDetails.vaultHeightIn)
        };

        return formattedJobs;

    } catch (error) {
        console.error(error);
        throw error;
    }
}