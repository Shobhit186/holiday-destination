/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "@/app/components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";

interface HomeProps {
  searchParams: Promise<IListingsParams>;
}
const Home = async({searchParams}: HomeProps) => {
  const params = await searchParams;
  const listings = await getListings(params);
  const currentUser = await getCurrentUser();

  // const isEmpty = true;

  if(listings.length === 0){
    return(
      <EmptyState showReset/>
    )
  }
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
         {listings.map((listing:any) => {
          return (
            <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
          )
         })}
      </div>
    </Container>
  );
}
export default Home;
