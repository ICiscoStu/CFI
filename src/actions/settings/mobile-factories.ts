'use server';
import { db } from '@/db';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { clerkClient } from '@clerk/nextjs';
import { currentUser } from "@clerk/nextjs";

export async function removeMobileFactory(): Promise<any> {
    //const users = await clerkClient.users.banUser(userId);
}

interface IMobileFactoryProps {
    createdAt: Date;
    id: number;
    name: string;
    plateNumber: string;
    warehouseId: number;
}

export async function getMobileFactoryList(): Promise<IMobileFactoryProps[]> {
    const user = await currentUser();

    const dbUser = await db.user.findUnique({
        where: {
            id: user!.id
        },
        select: {
            userName: true,
        }
    });
    const mobileFactories = await db.mobileFactory.findMany()

    return mobileFactories;
}

export async function createMobileFactory(
    name: string,
    plateNumber: string,
    warehouseId: number
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
    const mobileFactory = await db.mobileFactory.create({
        data: {
            name: name,
            plateNumber: plateNumber,
            warehouseId: warehouseId
        }
    });

    return mobileFactory;
}