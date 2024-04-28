'use server';

import { db } from "@/db";
import type { SubmittedJobs } from "@prisma/client";
import { currentUser } from '@clerk/nextjs';

export async function getSubmittedJobs(): Promise<SubmittedJobs[]> {

    const user = await currentUser();
    try {
        if (!user) {
            throw new Error('User not found');
        }

        const role: string = user!.publicMetadata.role as string;
        const contractorId: string = user!.privateMetadata.contractorId as string;

        if (contractorId && role === 'contractor_administrator' || role === 'contractor_office') {
            const result = await db.submittedJobs.findMany({
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
            return await db.submittedJobs.findMany({
                orderBy: {
                    updatedAt: 'desc',
                },
                include: {
                    jobDetails: true,
                    submittedBy: true,
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

export async function getSubmittedJob(id: number): Promise<SubmittedJobs | null> {
    try {
        const result = await db.submittedJobs.findUnique({
            where: {
                id: id
            },
            include: {
                jobDetails: true,
                submittedBy: true,
            }
        });

        return result;

    } catch (error) {
        console.error(error);
        throw error;
    }
}
