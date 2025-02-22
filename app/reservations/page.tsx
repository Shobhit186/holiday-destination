import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import Reservations from "./Reservations";

const ReservationsPage = async() => {
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
            <EmptyState title="No Reservations Found" subtitle="Looks like you have no reservations"/>
        )
    }

  return (
    <Reservations  reservations={reservations} currentUser={currentUser}/>
  )
}

export default ReservationsPage