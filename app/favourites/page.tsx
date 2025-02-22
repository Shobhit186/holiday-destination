import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavouriteListings from "../actions/getFavourite";
import Favourites from "./Favourites";

const FavouritePage = async () => {
    const listings = await getFavouriteListings();
    const user = await getCurrentUser();
    if (listings?.length === 0) {
        return (
            <EmptyState title="No Favourites" subtitle="Looks like you have no favourites" />
        )
    }
    return (
      <Favourites listings={listings} currentUser={user}/>
    )
}

export default FavouritePage