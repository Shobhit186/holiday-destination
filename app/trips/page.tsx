import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import Trips from "./Trips";

const TripsPage = async() => {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return(
            <EmptyState title="Unauthorized" subtitle="Please login" />
        )
    }
    const reservations = await getReservations({
        userId: currentUser.id
    });

    if(reservations.length === 0){
        return(
            <EmptyState title="No Trips" subtitle="You don't have any trips to display"/>
        )
    }
  return (
    <Trips
      reservations={reservations}
      currentUser={currentUser}
    />
  )
}

export default TripsPage