import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import Properties from "./Properties";


const PropertiesPage = async() => {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return(
            <EmptyState title="Unauthorized" subtitle="Please login" />
        )
    }
    const reservations = await getListings({
        userId: currentUser.id
    });

    if(reservations.length === 0){
        return(
            <EmptyState title="No Properties" subtitle="You don't have any trips to display"/>
        )
    }
  return (
    <Properties
      listings={reservations}
      currentUser={currentUser}
    />
  )
}

export default PropertiesPage