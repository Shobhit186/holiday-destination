import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";


export async function DELETE(request: Request, { params }: { params: Promise<{ listingId: string }> }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const listingId = (await params).listingId;
    if (!listingId || typeof listingId !== "string") {
        throw new Error("Invalid ID");
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id 
        },

    });
    return NextResponse.json(listing);
}