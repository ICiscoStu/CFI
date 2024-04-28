'use server';
import { db } from '@/db';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { clerkClient } from '@clerk/nextjs';
import { currentUser } from "@clerk/nextjs";

export async function removeUser(): Promise<any> {
    //const users = await clerkClient.users.banUser(userId);
}

interface IUserProps {
    id: string;
    email: string;
    fullName: string | null;
    userName: string;
    role: string;
    status: string
}

export async function getUserList(): Promise<IUserProps[]> {
    const user = await currentUser();

    const dbUser = await db.user.findUnique({
        where: {
            id: user!.id
        },
        select: {
            userName: true,
        }
    });
    const users = await db.user.findMany()

    return users;
}

export async function createUser(
    email: string,
    fullName: string,
    userName: string,
    role: string,
    type: string
): Promise<any> {

    const user = await currentUser();
    let newUser = null;

    const clerkUser = await clerkClient.users.createUser({
        emailAddress: [email],
        username: userName,
        firstName: fullName,
        publicMetadata: {
            role: role
        },
        privateMetadata: { 
            contractorId: '1234'
         }
    });

    if(clerkUser) {
        newUser = await db.user.create({
            data: {
                id: clerkUser.id,
                email: email,
                fullName: fullName,
                userName: userName,
                role: role
            }
        });

        if(type = 'contractor') {
            const contractor = await db.contractor.create({
                data: {
                    userId: clerkUser.id,
                }
            });

            if(contractor) {
            
                await clerkClient.users.updateUser(clerkUser.id, {
                    privateMetadata: { 
                        contractorId: contractor.contractorId
                    }
                });
            }
        }
    }

    return newUser;
}