'use server';

import { db } from '@/db';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { currentUser } from "@clerk/nextjs";

export  async function ApproveJob(
    submittedJobId: number,
    ): Promise<any> {

        const user = await currentUser();

        try {
            if (!user) {
                throw new Error('User not found');
            }

            const result = await db.$transaction(async (tx) => {
                //get potential job info
                const submittedJob = await db.submittedJobs.findUnique({
                    where: {
                        id: submittedJobId
                    }
                });
    
                const approvedJob = await db.approvedJobs.create({
                    data: {
                        approvedById: user.id,
                        contractorId: submittedJob!.contractorId,
                        jobDetailsId: submittedJob!.jobDetailsId,
                    }
                });

                const clearSubmittedJob = await db.submittedJobs.delete({
                    where: {
                        id: submittedJobId
                    }
                });

                return approvedJob;

            });
            
        } catch (error) {
            console.error(error);
        }

        await revalidatePath(`/admin/submitted-jobs/details/${submittedJobId}`);
        redirect('/admin/submitted-jobs/list');
        
    }