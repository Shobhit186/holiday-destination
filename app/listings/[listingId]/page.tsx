import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import EmptyState from '@/app/components/EmptyState';
import React from 'react';
import ListingClient from './ListingClient';
import getReservations from '@/app/actions/getReservations';

interface IParams {
    listingId?: string;
}



const ListingPage = async ({params}: {params: Promise<IParams>}) => {
  const resolvedParams = await params;
    const listing = await getListingById(resolvedParams);
    const reservations = await getReservations(resolvedParams);
    const currentUser = await getCurrentUser();
    if(!listing){
        return(
            <EmptyState />
        )
    }
  return (
    <>
      <ListingClient listing={listing} currentUser={currentUser} reservation={reservations} />
    </>
  )
}

export default ListingPage;