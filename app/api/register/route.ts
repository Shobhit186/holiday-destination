import bcrypt from 'bcrypt';
import prisma from "@/app/libs/prismadb"
import { NextResponse } from 'next/server';
export async function POST(
    request: Request
){
    const body = await request.json();;
    const {email,password,name} = body;
    const hashedpassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
         data: {
            email,
            name,
            hashedpassword,
            createdAt: new Date(),
            updatedAt: new Date(),
         }
    });
    return NextResponse.json(user);
}