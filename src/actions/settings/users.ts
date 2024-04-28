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
    role: string
): Promise<any> {

    const user = await currentUser();
    const dbUser = await db.user.findUnique({
        where: {
            id: user!.id
        },
        select: {
            userName: true,
        }
    });
    const newUser = await db.user.create({
        data: {
            email: email,
            fullName: fullName,
            userName: userName,
            role: role
        }
    });

    return newUser;
}