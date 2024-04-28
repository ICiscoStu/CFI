'use server';

import { db } from '@/db';
import type { PotentialJobs, JobDetails } from '@prisma/client';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { z } from 'zod';

import { currentUser } from "@clerk/nextjs";
import moment from 'moment';

const PotentialJobInputSchema = z.object({
    vaultNumber: z.string(),
    owner: z.string(),
    city: z.string(),
    state: z.string(),
    vaultWidthFt: z.number(),
    vaultLengthFt: z.number(),
    vaultHeightFt: z.number(),
    vaultWidthIn: z.number(),
    vaultLengthIn: z.number(),
    vaultHeightIn: z.number(),
    wallSqFt: z.number(),
    ceilingSqFt: z.number(),
    totalSqFt: z.number(),
    possibleStartDate: z.string(),
});

interface PotentialJobState {
    errors: {
        vaultNumber?: string[],
        owner?: string[],
        city?: string[],
        state?: string[],
        vaultWidthFt?: string[],
        vaultLengthFt?: string[],
        vaultHeightFt?: string[],
        vaultWidthIn?: string[],
        vaultLengthIn?: string[],
        vaultHeightIn?: string[],
        wallSqFt?: string[],
        ceilingSqFt?: string[],
        totalSqFt?: string[],
        possibleStartDate?: moment.Moment[],
        _form?: string[],
    }
}

export async function createPotentialJob(
    formState: PotentialJobState,
    formData: FormData
): Promise<PotentialJobState> {

    const result = PotentialJobInputSchema.safeParse({
        vaultNumber: formData.get('vaultNumber'),
        owner: formData.get('owner'),
        city: formData.get('city'),
        state: formData.get('state'),
        vaultWidthFt: Number(formData.get('vaultWidthFt')),
        vaultLengthFt: Number(formData.get('vaultLengthFt')),
        vaultHeightFt: Number(formData.get('vaultHeightFt')),
        vaultWidthIn: Number(formData.get('vaultWidthIn')),
        vaultLengthIn: Number(formData.get('vaultLengthIn')),
        vaultHeightIn: Number(formData.get('vaultHeightIn')),
        wallSqFt: Number(formData.get('wallSqFt')),
        ceilingSqFt: Number(formData.get('ceilingSqFt')),
        totalSqFt: Number(formData.get('totalSqFt')),
        possibleStartDate: formData.get('possibleStartDate'),
    });

    if (!result.success) {
        return {
            errors: {
                ...result.error.flatten().fieldErrors,
                possibleStartDate: [] // Initialize as an empty array of Moments
            }
        }
    }

    let PotentialJobs: PotentialJobs | null = null;
    let JobDetails: JobDetails | null = null;

    try {

        const user = await currentUser();
        const contractorId: string = user!.privateMetadata.contractorId as string;

        const files = formData.getAll('files').map((file) => {
            console.log(file);
        });

        if (user) {

            try {

                JobDetails = await db.jobDetails.create({
                    data: {
                        vaultNumber: result.data.vaultNumber,
                        owner: result.data.owner,
                        city: result.data.city,
                        state: result.data.state,
                        vaultWidthFt: result.data.vaultWidthFt,
                        vaultLengthFt: result.data.vaultLengthFt,
                        vaultHeightFt: result.data.vaultHeightFt,
                        vaultWidthIn: result.data.vaultWidthIn,
                        vaultLengthIn: result.data.vaultLengthIn,
                        vaultHeightIn: result.data.vaultHeightIn,
                        wallSqFt: result.data.wallSqFt,
                        ceilingSqFt: result.data.ceilingSqFt,
                        totalSqFt: result.data.totalSqFt,
                        possibleStartDate: new Date(result.data.possibleStartDate),
                    }
                });

                PotentialJobs = await db.potentialJobs.create({
                    data: {
                        jobDetailsId: JobDetails.id,
                        createdById: user.id,
                        contractorId: contractorId
                    }
                });

            } catch (error: unknown) {
                throw new Error('Entry not created: ->' + error);
            }


        } else {
            throw new Error('User not found');
        }

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error);
            return {
                errors: {
                    vaultNumber: ['An error occurred while creating the work order.']
                }
            };
        } else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    await revalidatePath('/contractor/potential-jobs/create');
    redirect('/contractor/potential-jobs/list');
}

export async function SubmitPotentialJob(
    potentialJobId: number
): Promise<any> {

    const user = await currentUser();

    try {
        if (!user) {
            throw new Error('User not found');
        }

        const result = await db.$transaction(async (tx) => {
            //get potential job info
            const potentialJob = await db.potentialJobs.findUnique({
                where: {
                    id: potentialJobId
                }
            });

            const SubmittedJob = await db.submittedJobs.create({
                data: {
                    submittedById: user.id,
                    contractorId: potentialJob!.contractorId,
                    jobDetailsId: potentialJob!.jobDetailsId
                }
            });

            const clearPotentialJob = await db.potentialJobs.delete({
                where: {
                    id: potentialJobId
                }
            });

            return SubmittedJob;

        });

    } catch (error) {

    }

    await revalidatePath(`/contractor/potential-jobs/details/${potentialJobId}`);
    redirect('/contractor/potential-jobs/list');

}

export async function updatePossibleStartDate(
    potentialJobId: number,
    possibleStartDate: string
): Promise<any> {

    const user = await currentUser();

    try {
        if (!user) {
            throw new Error('User not found');
        }

        const result = await db.$transaction(async (tx) => {
            //get potential job info
            const potentialJob = await db.potentialJobs.findUnique({
                where: {
                    id: potentialJobId
                }
            });

            const JobDetails = await db.jobDetails.update({
                where: {
                    id: potentialJob!.jobDetailsId
                },
                data: {
                    possibleStartDate: new Date(possibleStartDate)
                }
            });

            return JobDetails;

        });

    } catch (error) {

    }

    await revalidatePath(`/contractor/potential-jobs/details/${potentialJobId}`);
}