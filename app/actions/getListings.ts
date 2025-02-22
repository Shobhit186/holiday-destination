/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
    userId?: string;
    guestcount?: number;
    bathroomcount?: number;
    roomcount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}
export default async function getListings(params: IListingsParams) {
    try {
        const {userId,guestcount,bathroomcount,roomcount,startDate,endDate,locationValue,category} = params;
        // eslint-disable-next-line prefer-const
        let query:any = {};

        if(userId) {
            query.userId = userId;
        }
        if(category){
            query.category = category;
        }
        if(roomcount){
            query.roomCount = {
                gte: +roomcount
            };
        }
        if(guestcount){
            query.guestCount = {
                gte: +guestcount
            };
        }
        if(bathroomcount){
            query.bathroomCount = {
                gte: +bathroomcount
            };
        }
        if(locationValue){
            query.locationValue = locationValue;
        }
        if(startDate && endDate){
            query.NOT = {
                reservation: {
                    some: {
                       OR: [
                        {
                          endDate: {gte: startDate},
                          startDate: {lte: startDate},  
                        },
                        {
                            startDate: {lte: endDate},
                            endDate: {gte: endDate}
                        }
                       ] 
                    }
                }
            }
        }
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const safeListings = listings.map((listing:any) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }))
        return safeListings;
    } catch (error:any) {
        throw new Error(error)
    }
}