"use client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "../types";
import { useCallback,useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface TripsProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null
}
const Trips:React.FC<TripsProps> = ({reservations, currentUser}) => {
  const router = useRouter();
  const [deletedId, setDeletedId]= useState('');

  const onCancel = useCallback((id:string) => {
     setDeletedId(id);

     axios.delete(`/api/reservations/${id}`)
     .then(() => {
        toast.success('Reservation cancelled');
        router.refresh();
     })
     .catch((error) => {
        toast.error(error?.response?.data?.error);
     })
     .finally(() => {
        setDeletedId('');
     })
  },[])
  return (
    <Container>
        <Heading title="Trips" subtitle="Where you've been and where you're going" />
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {reservations.map((reservation) => (
                <ListingCard key={reservation.id} data={reservation.listing} reservation={reservation} onAction={onCancel} disabled={deletedId === reservation.id} actionId={reservation.id} actionLabel="Cancel reservation" currentUser={currentUser} />
            ))}
        </div>
    </Container>
  )
}

export default Trips