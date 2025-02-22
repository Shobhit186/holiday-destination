'use client';
import React from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useCallback,useState } from 'react';
import { useRouter } from 'next/navigation';
import { SafeReservation, SafeUser } from '../types';
import Heading from '../components/Heading';
import Container from '../components/Container';
import ListingCard from '../components/listings/ListingCard';

interface ReservationsProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Displays a list of reservations with the option to cancel each reservation.
 * 
 * Props:
 * - reservations: An array of reservation objects that contain details about each reservation.
 * - currentUser: The current logged-in user, if available.
 * 
 * The component allows users to view their reservation listings and cancel them if necessary. 
 * When a reservation is cancelled, it makes an API request to delete the reservation and 
 * provides user feedback with a toast message indicating success or failure.
 */

/******  3ebc31a5-9e26-4155-8fc9-b19dd94a2ebb  *******/const Reservations: React.FC<ReservationsProps> = ({reservations, currentUser}) => {
    const router = useRouter();
  const [deletedId, setDeletedId]= useState('');

  const onCancel = useCallback((id:string) => {
     setDeletedId(id);

     axios.delete(`/api/reservations/${id}`)
     .then(() => {
        toast.success('Reservation cancelled');
        router.refresh();
     })
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     .catch((error) => {
        toast.error("Something Went Wrong");
     })
     .finally(() => {
        setDeletedId('');
     })
  },[router])
  return (
    <Container>
        <Heading title='Reservations' subtitle='Bookings on your properties' />
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {reservations.map((reservation) => (
            <ListingCard key={reservation.id} data={reservation.listing} reservation={reservation} onAction={onCancel} disabled={deletedId === reservation.id} actionId={reservation.id} actionLabel="Cancel guest reservation" currentUser={currentUser} />
        ))}
        </div>
    </Container>
  )
}

export default Reservations;