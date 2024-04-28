'use server';

import { db } from "@/db";
import type { PotentialJobs, JobDetails } from "@prisma/client";
import { currentUser } from '@clerk/nextjs';

export async function getPotentialJobs(): Promise<PotentialJobs[]> {

    const user = await currentUser();
    try {
        if (!user) {
            throw new Error('User not found');
        }

        const role: string = user!.publicMetadata.role as string;
        const contractorId: string = user!.privateMetadata.contractorId as string;

        if (contractorId && role === 'contractor_administrator' || role === 'contractor_office') {
            const result = await db.potentialJobs.findMany({
                where: {
                    contractorId: contractorId
                },
                orderBy: {
                    updatedAt: 'desc',
                },
                include: {
                    jobDetails: {
                        select: {
                            vaultNumber: true,
                            owner: true,
                            city: true,
                            state: true,
                        }
                    },
                }
            });

            return result;

        // should only be available to admin    
        } else if (role === 'cfi_super' || role === 'cfi_admin') {
            return await db.potentialJobs.findMany({
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

export async function getPotentialJob(id: number): Promise<IPotentialJob | null> {

    const user = await currentUser();
    try {
        if (!user) {
            throw new Error('User not found');
        }

        const PotentialJob = await db.potentialJobs.findUnique({
            where: {
                id
            },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        fullName: true,
                        userName: true
                    }
                },
                jobDetails: true
            }
        });

        if (PotentialJob?.createdById !== user.id) {
            throw new Error('Unauthorized');
        }

        if (!PotentialJob) {
            throw new Error('Potential Job not found');
        }

        const formattedJobs: IPotentialJob = {
            ...PotentialJob.jobDetails,
            createdBy: PotentialJob.createdBy,
            createdAt: new Date(PotentialJob.createdAt),
            updatedAt: new Date(PotentialJob.updatedAt),
            vaultWidthFt:  Number(PotentialJob.jobDetails.vaultWidthFt),
            vaultLengthFt: Number(PotentialJob.jobDetails.vaultLengthFt),
            vaultHeightFt: Number(PotentialJob.jobDetails.vaultHeightFt),
            vaultWidthIn:  Number(PotentialJob.jobDetails.vaultWidthIn),
            vaultLengthIn: Number(PotentialJob.jobDetails.vaultLengthIn),
            vaultHeightIn: Number(PotentialJob.jobDetails.vaultHeightIn),
            wallSqFt: Number(PotentialJob.jobDetails.wallSqFt),
            ceilingSqFt: Number(PotentialJob.jobDetails.ceilingSqFt),
            totalSqFt: Number(PotentialJob.jobDetails.totalSqFt),
            
        };

        return formattedJobs;

    } catch (error) {
        console.error(error);
        throw error;
    }
}


// export async function getPendingPotentialJobs(): Promise<IPotentialJob[] | null> {
//     const PotentialJobs = await db.potentialJobs.findMany({
//         where: {
//             status: 'Pending'
//         },
//         include: {
//             createdBy: {
//                 select: {
//                     fullName: true,
//                     userName: true
//                 }
//             }
//         }
//     });

//     if (!PotentialJobs) {
//         throw notFound();
//     }

//     const formattedJobs: IPotentialJob[] = PotentialJobs.map((job) => {
//         return {
//             ...job,
//             createdAt: new Date(job.createdAt), // Convert createdAt to Date type
//             updatedAt: new Date(job.updatedAt), // Convert updatedAt to Date type
//             vaultWidthFt:  Number(job.vaultWidthFt),
//             vaultLengthFt: Number(job.vaultLengthFt),
//             vaultHeightFt: Number(job.vaultHeightFt),
//             vaultWidthIn:  Number(job.vaultWidthIn),
//             vaultLengthIn: Number(job.vaultLengthIn),
//             vaultHeightIn: Number(job.vaultHeightIn),
//             approvedAt: job.approvedAt ? new Date(job.approvedAt).toString() : null, // Convert approvedAt to string type
//         };
//     });
//     return formattedJobs;
// }

// export async function getPotentialJobsByUser(): Promise<IPotentialJob[]> {
//     const user = await currentUser();

//     if (!user) {
//         throw new Error('User not found');
//     }

//     const jobs = await db.potentialJob.findMany({
//         where: {
//             createdById: user.id
//         },
//         include: {
//             createdBy: true
//         }
//     });

//     const formattedJobs: IPotentialJob[] = jobs.map((job) => {
//         return {
//             ...job,
//             createdAt: new Date(job.createdAt), // Convert createdAt to Date type
//             updatedAt: new Date(job.updatedAt), // Convert updatedAt to Date type
//             vaultWidthFt: Number(job.vaultWidthFt),
//             vaultLengthFt: Number(job.vaultLengthFt),
//             vaultHeightFt: Number(job.vaultHeightFt),
//             vaultWidthIn: Number(job.vaultWidthIn),
//             vaultLengthIn: Number(job.vaultLengthIn),
//             vaultHeightIn: Number(job.vaultHeightIn),
//             approvedAt: job.approvedAt ? new Date(job.approvedAt).toString() : null, // Convert approvedAt to string type
//         };
//     });
//     return formattedJobs;
// }

// export async function getPotentialJobsCountByUser(): Promise<number> {
//     const user = await currentUser();

//     if (!user) {
//         throw new Error('User not found');
//     }

//     const jobsCount = await db.potentialJob.count({
//         where: {
//             createdById: user.id,
//             status: 'Pending'
//         },
//     });
//     return jobsCount;

// }


