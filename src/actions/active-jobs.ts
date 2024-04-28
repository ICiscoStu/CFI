'use server';

import { db } from '@/db';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


import { currentUser } from "@clerk/nextjs";


export async function ActivateJob(
    approvedJobId: number,
    mobileFactoryId: string,
    assignedToId: string,
    possibleStartDate: string,
) {
    const user = await currentUser();
    try {
        if (!user) {
            throw new Error('User not found');
        }

        const role: string = user!.publicMetadata.role as string;
        const contractorId: string = user!.privateMetadata.contractorId as string;

        if (contractorId && role === 'contractor_administrator' || role === 'contractor_office') {

            const approvedJob = await db.approvedJobs.findUnique({
                where: {
                    id: approvedJobId
                }
            });

            const activeJob = await db.activeJobs.create({
                data: {
                    assignedToId: assignedToId,
                    contractorId: approvedJob!.contractorId,
                    jobDetailsId: approvedJob!.jobDetailsId,
                    mobileFactoryId: mobileFactoryId
                }
            });

            if (possibleStartDate !== null) {
                const JobDetails = await db.jobDetails.update({
                    where: {
                        id: activeJob!.jobDetailsId
                    },
                    data: {
                        possibleStartDate: new Date(possibleStartDate)
                    }
                });
            }

            const clearApprovedJob = await db.approvedJobs.delete({
                where: {
                    id: approvedJobId
                }
            });
        };

        revalidatePath(`/contractor/approved-jobs/list`);

    } catch (error) {
        console.error(error);
        throw error;
    }

    redirect('/contractor/approved-jobs/list');
}

export async function dispatchJob(
    activeJobId: number
) {
    const user = await currentUser();
    try {
        if (!user) {
            throw new Error('User not found');
        }

        const role: string = user!.publicMetadata.role as string;

        if (role === 'cfi_super' || role === 'cfi_admin') {

            const activeJob = await db.activeJobs.findUnique({
                where: {
                    id: activeJobId
                }
            });

            const updatedActiveJob = await db.activeJobs.update({
                where: {
                    id: activeJobId
                },
                data: {
                    status: "Active"
                }
            });
        };

    } catch (error) {
        console.error(error);
        throw error;
    }

    await revalidatePath(`/admin/pending-jobs/details/${activeJobId}`);
    redirect('/admin/pending-jobs/list');
}

export async function startJob(jobId: number): Promise<any> {
    const user = await currentUser();
    try {
        if (!user) {
            throw new Error('User not found');
        }

        const updatedActiveJob = await db.activeJobs.update({
            where: {
                id: Number(jobId)
            },
            data: {
                startedAt: new Date(),
                status: "Started"
            }
        });

        return updatedActiveJob;

    } catch (error) {
        console.error(error);
        throw error;
    }

    await revalidatePath(`/admin/active-jobs/details/${jobId}`);
    redirect('/admin/active-jobs/list');
}

export async function completeJob(jobId: string) {
    const user = await currentUser();
    try {
        if (!user) {
            throw new Error('User not found');
        }

        const updatedActiveJob = await db.activeJobs.update({
            where: {
                id: Number(jobId)
            },
            data: {
                status: "Completed"
            }
        });

    } catch (error) {
        console.error(error);
        throw error;
    }

    await revalidatePath(`/admin/active-jobs/details/${jobId}`);
    redirect('/admin/active-jobs/list');
}