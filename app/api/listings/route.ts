import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,description,imageSrc,category,roomcount,bathroomcount,guestcount,location,price
    } = body
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.keys(body).forEach((value:any) => {
        if(!body[value]){
            NextResponse.error();
        }
    });

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomcount,
            bathroomcount,
            guestcount,
            locationValue: location.value,
            price: parseInt(price,10),
            userId: currentUser.id,
            createdAt: new Date()
        }
    });

    const serializedListing = {
        ...listing,
        bathroomcount: listing.bathroomcount.toString(), // If `id` is BigInt
        price: listing.price.toString(), // If `price` is BigInt
        roomcount: listing.roomcount.toString(),
        guestcount: listing.guestcount.toString(),
    };

    return NextResponse.json(serializedListing);
}