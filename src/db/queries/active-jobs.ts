'use server';

import { db } from "@/db";
import type { ActiveJobs } from "@prisma/client";
import { currentUser } from '@clerk/nextjs';

export async function getActiveJobs(): Promise<ActiveJobs[]> {

    const user = await currentUser();
    try {
        if (!user) {
            throw new Error('User not found');
        }

        const role: string = user!.publicMetadata.role as string;
        const contractorId: string = user!.privateMetadata.contractorId as string;

        if (contractorId && role === 'contractor_administrator' || role === 'contractor_office') {
            const result = await db.activeJobs.findMany({
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
        } else if(contractorId && role === 'contractor_field' ){
            const result = await db.activeJobs.findMany({
                where: {
                    contractorId: contractorId,
                    assignedToId: user.id,
                    status: {
                        in: ['Active', 'Started', 'Completed']
                    }
                },
                orderBy: {
                    updatedAt: 'desc',
                },
                include: {
                    jobDetails: true,
                }
            });

            return result;

        } else if (role === 'cfi_super' || role === 'cfi_admin') {
            return await db.activeJobs.findMany({
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

export async function getActiveJob(id: number): Promise<any | null> {

    const user = await currentUser();

    const role: string = user!.publicMetadata.role as string;
    const contractorId: string = user!.privateMetadata.contractorId as string;
    try {
        if (!user) {
            throw new Error('User not found');
        }

        const ActiveJob = await db.activeJobs.findUnique({
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
            status: ActiveJob.status,
            createdAt: new Date(ActiveJob.createdAt),
            updatedAt: new Date(ActiveJob.updatedAt),
            MobileFactoryId: ActiveJob.mobileFactoryId,
            startedAt: ActiveJob.startedAt ? new Date(ActiveJob.startedAt) : null,
            completedAt: ActiveJob.completedAt ? new Date(ActiveJob.completedAt) : null,
            vaultWidthFt: Number(ActiveJob.jobDetails.vaultWidthFt),
            vaultLengthFt: Number(ActiveJob.jobDetails.vaultLengthFt),
            vaultHeightFt: Number(ActiveJob.jobDetails.vaultHeightFt),
            vaultWidthIn: Number(ActiveJob.jobDetails.vaultWidthIn),
            vaultLengthIn: Number(ActiveJob.jobDetails.vaultLengthIn),
            vaultHeightIn: Number(ActiveJob.jobDetails.vaultHeightIn)
        };

        console.log(formattedJobs);

        return formattedJobs;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getPendingDispatchJobs(): Promise<any[]> {
    const user = await currentUser();
    try {
        if (!user) {
            throw new Error('User not found');
        }

        const role: string = user!.publicMetadata.role as string;

        if (role === 'cfi_super' || role === 'cfi_admin') {
            const result = await db.activeJobs.findMany({
                where: {
                    status: 'Pending_Dispatch'
                },
                orderBy: {
                    updatedAt: 'desc',
                },
                include: {
                    jobDetails: true,
                }
            });

            return result;

            // should only be available to cfi    
        } else {
            throw new Error('Unauthorized');
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getPendingDispatchJob(id: number): Promise<any | null> {

    const user = await currentUser();

    const role: string = user!.publicMetadata.role as string;
    try {
        if (!user) {
            throw new Error('User not found');
        }

        if (role === 'cfi_super' || role === 'cfi_admin') {
            const job = await db.activeJobs.findUnique({
                where: {
                    id,
                    status: 'Pending_Dispatch'
                },
                include: {
                    jobDetails: true
                }
            });

            if (!job) {
                throw new Error('Job not found');
            }

            const formattedJobs = {
                ...job.jobDetails,
                createdAt: new Date(job.createdAt),
                updatedAt: new Date(job.updatedAt),
                MobileFactoryId: job.mobileFactoryId,
                possibleStartDate: job.jobDetails.possibleStartDate ,
                vaultWidthFt: Number(job.jobDetails.vaultWidthFt),
                vaultLengthFt: Number(job.jobDetails.vaultLengthFt),
                vaultHeightFt: Number(job.jobDetails.vaultHeightFt),
                vaultWidthIn: Number(job.jobDetails.vaultWidthIn),
                vaultLengthIn: Number(job.jobDetails.vaultLengthIn),
                vaultHeightIn: Number(job.jobDetails.vaultHeightIn)
            };


            return formattedJobs;
        } else {
            throw new Error('Unauthorized');
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
}