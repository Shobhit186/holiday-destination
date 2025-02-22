import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getFavouriteListings() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return [];
        }

        const favouriteListings = await prisma.listing.findMany({
            where: {
                id: {
                in: [...currentUser.favouriteIds || []],
                },
            },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const safeFavourites = favouriteListings.map((listing:any) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));
        return safeFavourites;
        } catch (error) {
        console.log(error);
    }
}