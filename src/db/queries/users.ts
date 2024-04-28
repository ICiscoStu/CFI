'use server';

import { db } from "@/db";
import type { SubmittedJobs, User } from "@prisma/client";
import { currentUser } from '@clerk/nextjs';


export async function getFieldUsersByContractor() {
    const user = await currentUser();
    try {
        if (!user) {
            throw new Error('User not found');
        }

        const role: string = user!.publicMetadata.role as string;
        const contractorId: string = user!.privateMetadata.contractorId as string;

        if (contractorId && role === 'contractor_administrator' || role === 'contractor_office') {
            const result = await db.contractor.findMany({
                where: {
                    contractorId: contractorId
                },
                include: {
                    User: true
                }
            });

            const results = result.filter((user) => {
                return user.User.role === 'contractor_field';
            })

            return results;

        }
    } catch (error) {
        console.error(error);
        throw error;
    }

}