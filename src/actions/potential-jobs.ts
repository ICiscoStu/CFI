'use server';

import { db } from '@/db';
import type { PotentialJob } from '@prisma/client';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { z } from 'zod';

import { currentUser } from "@clerk/nextjs";

const PotentialJobInputSchema = z.object({
    vaultNumber: z.string(),
    owner: z.string(),
    city: z.string(),
    state: z.string(),
    vaultWidth: z.number(),
    vaultLength: z.number(),
    vaultHeight: z.number(),
    widthUnit: z.string(),
    lengthUnit: z.string(),
    heightUnit: z.string(),
    wallSqFt: z.number(),
    ceilingSqFt: z.number(),
    totalSqFt: z.number(),
});

interface PotentialJobState {
    errors: {
        vaultNumber?: string[],
        owner?: string[],
        city?: string[],
        state?: string[],
        vaultWidth?: string[],
        vaultLength?: string[],
        vaultHeight?: string[],
        widthUnit?: string[],
        lengthUnit?: string[],
        heightUnit?: string[],
        wallSqFt?: string[],
        ceilingSqFt?: string[],
        totalSqFt?: string[],
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
        vaultWidth: Number(formData.get('vaultWidth')),
        vaultLength: Number(formData.get('vaultLength')),
        vaultHeight: Number(formData.get('vaultHeight')),
        widthUnit: formData.get('widthUnit'),
        lengthUnit: formData.get('lengthUnit'),
        heightUnit: formData.get('heightUnit'),
        wallSqFt: Number(formData.get('wallSqFt')),
        ceilingSqFt: Number(formData.get('ceilingSqFt')),
        totalSqFt: Number(formData.get('totalSqFt')),
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let PotentialJob: PotentialJob | null = null;

    try {

        const user = await currentUser();

        const files = formData.getAll('files').map((file) => {
            console.log(file);
        });
        
        if(user) {
            PotentialJob = await db.potentialJob.create({
                data: {
                    createdBy: { connect: { id: user.id } },
                    vaultNumber: result.data.vaultNumber,
                    owner: result.data.owner,
                    city: result.data.city,
                    state: result.data.state,
                    vaultWidth: result.data.vaultWidth,
                    vaultLength: result.data.vaultLength,
                    vaultHeight: result.data.vaultHeight,
                    vaultWidthUnit: result.data.widthUnit, 
                    vaultHeightUnit: result.data.heightUnit, 
                    vaultLengthUnit: result.data.lengthUnit , 
                    wallSqFt: result.data.wallSqFt,
                    ceilingSqFt: result.data.ceilingSqFt,
                    totalSqFt: result.data.totalSqFt,
                }
            });
        } else {
            throw new Error('User not found');
        }
        
    } catch (error : unknown) {
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
    
    await revalidatePath('/potential-jobs/create');
    redirect('/active-jobs/list');
}