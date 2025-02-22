/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(params: IParams){
    try{
    const {
        listingId,
        userId,
        authorId
    } = await params;
    const query:any = {};

    if(listingId){
        query.listingId = listingId
    }
    if(userId){
        query.userId = userId
    }
    if(authorId){
        query.authorId = authorId
    }
    const reservations = await prisma.reservation.findMany({
        where: query,
        include: {
            listing: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const safeReservations = reservations.map((reservation:any) => ({
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        listing: {
            ...reservation.listing,
            createdAt: reservation.listing.createdAt.toISOString(),
        }
    })
);
    return safeReservations;
} catch(error: any){
    throw new Error(error);
}
    
}