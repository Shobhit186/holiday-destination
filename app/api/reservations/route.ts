import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }
    const body = await request.json();

    const {listingId,startDate,endDate,totalPrice} = body;

    if(!listingId || !startDate || !endDate) {
        return NextResponse.error();
    }

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
           reservation: {
            create: {
                userId: currentUser.id,
                startDate,
                endDate,
                price: Number(totalPrice),
                createdAt: new Date(),
            }
           }
        }
    });

       // Convert BigInt fields to string
       const serializeListing = JSON.parse(JSON.stringify(listingAndReservation, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
    ));


    return NextResponse.json(serializeListing);
}