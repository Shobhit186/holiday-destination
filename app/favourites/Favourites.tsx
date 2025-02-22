import React from 'react'
import { SafeListing, SafeUser } from "../types"
import Heading from '../components/Heading';
import Container from '../components/Container';
import ListingCard from '../components/listings/ListingCard';
interface FavouritesProps {
    listings: SafeListing[]  | undefined;
    currentUser?: SafeUser | null
}
const Favourites: React.FC<FavouritesProps> = ({listings}) => {
  return (
    <Container>
    <Heading title='Favourites' subtitle='List of places you have favourited!' />
    <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
       {listings?.map((listing) => (
        <ListingCard key={listing.id} data={listing} />
       ))}
    </div>
    </Container>
  )
}

export default Favourites