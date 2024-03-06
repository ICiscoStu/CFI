'use server';
import type { PotentialJob } from "@prisma/client";
import { db } from "@/db";
import { notFound } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

export async function getPotentialJobs(): Promise<PotentialJob[]> {
    return db.potentialJob.findMany({
        orderBy: {
            updatedAt: 'desc'
        }
    });
}

export async function getPotentialJob(id: number): Promise<IPotentialJob | null> {

    const PotentialJob = await db.potentialJob.findUnique({
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
            }
        }
    });

    if (!PotentialJob) {
        throw notFound();
    }

    const formattedJobs: IPotentialJob = {
        ...PotentialJob,
        createdAt: new Date(PotentialJob.createdAt),
        updatedAt: new Date(PotentialJob.updatedAt),
        vaultWidth: Number(PotentialJob.vaultWidth),
        vaultLength: Number(PotentialJob.vaultLength),
        vaultHeight: Number(PotentialJob.vaultHeight),
        approvedAt: PotentialJob.approvedAt ? new Date(PotentialJob.approvedAt).toString() : null,
    };

    return formattedJobs;
}


export async function getPendingPotentialJobs(): Promise<IPotentialJob[] | null> {
    const PotentialJobs = await db.potentialJob.findMany({
        where: {
            status: 'Pending'
        },
        include: {
            createdBy: {
                select: {
                    fullName: true,
                    userName: true
                }
            }
        }
    });

    if (!PotentialJobs) {
        throw notFound();
    }

    const formattedJobs: IPotentialJob[] = PotentialJobs.map((job) => {
        return {
            ...job,
            createdAt: new Date(job.createdAt), // Convert createdAt to Date type
            updatedAt: new Date(job.updatedAt), // Convert updatedAt to Date type
            vaultWidth: Number(job.vaultWidth),
            vaultLength: Number(job.vaultLength),
            vaultHeight: Number(job.vaultHeight),
            approvedAt: job.approvedAt ? new Date(job.approvedAt).toString() : null, // Convert approvedAt to string type
        };
    });
    return formattedJobs;
}

export async function getPotentialJobsByUser(): Promise<IPotentialJob[]> {
    const user = await currentUser();

    if (!user) {
        throw new Error('User not found');
    }

    const jobs = await db.potentialJob.findMany({
        where: {
            createdById: user.id
        },
        include: {
            createdBy: true
        }
    });

    const formattedJobs: IPotentialJob[] = jobs.map((job) => {
        return {
            ...job,
            createdAt: new Date(job.createdAt), // Convert createdAt to Date type
            updatedAt: new Date(job.updatedAt), // Convert updatedAt to Date type
            vaultWidth: Number(job.vaultWidth),
            vaultLength: Number(job.vaultLength),
            vaultHeight: Number(job.vaultHeight),
            approvedAt: job.approvedAt ? new Date(job.approvedAt).toString() : null, // Convert approvedAt to string type
        };
    });
    return formattedJobs;
}

export async function getPotentialJobsCountByUser(): Promise<number> {
    const user = await currentUser();

    if (!user) {
        throw new Error('User not found');
    }

    const jobsCount = await db.potentialJob.count({
        where: {
            createdById: user.id,
            status: 'Pending'
        },
    });
    return jobsCount;

}

export async function getMobileFactories(): Promise<IMobileFactory[]> {
    const mobileFactories = await db.mobileFactory.findMany({
        select: {
            id: true,
            name: true,
            plateNumber: true,
            warehouseId: true
        }
    });

    return mobileFactories;
}
