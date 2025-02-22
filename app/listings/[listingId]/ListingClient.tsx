'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { categories } from '@/app/components/Navbar/Categories';
import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingReservation from '@/app/components/listings/ListingReservation';
import { Range } from 'react-date-range';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};
interface ListingClientProps {
    reservation?: SafeReservation[];
    listing: SafeListing & {user: SafeUser};
    currentUser?: SafeUser | null;
}
const ListingClient: React.FC<ListingClientProps> = ({listing,currentUser,reservation=[]}) => {
    const loginModal = useLoginModal();
    const router = useRouter();
    const disabledDates = useMemo(() => {
      let dates: Date[] = [];
      reservation.forEach((reserve) => {
        const range = eachDayOfInterval({
          start: new Date(reserve.startDate),
          end: new Date(reserve.endDate),
        });

        dates =  [...dates,...range]
      });
      return dates;
    },[reservation]);

    const [isLoading,setIsLoading] = useState(false);
    const [totalPrice,setTotalPrice] = useState<Number>(Number(listing.price));
    const [dateRange,setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
       if(!currentUser){
        return loginModal.onOpen();
       }
       setIsLoading(true);

       axios.post('/api/reservations',{totalPrice,startDate:dateRange.startDate,endDate:dateRange.endDate, listingId:listing?.id})
       .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        router.push("/trips");
       })
       .catch(() => {
        toast.error('Something went wrong');
       })
       .finally(() => {
        setIsLoading(false);
       })
    },[totalPrice,dateRange,currentUser,loginModal,listing?.id,router]);

    useEffect(() => {
      if(dateRange.startDate && dateRange.endDate){
        const dayCount = differenceInCalendarDays(dateRange.endDate,dateRange.startDate);
        if(dayCount && listing.price){
          setTotalPrice(dayCount * Number(listing.price));
          }
          else{
            setTotalPrice(Number(listing.price));
          }
        }
    },[dateRange,listing.price]);
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category)
    },[listing.category]);
  return (
    <Container>
       <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-col gap-6">
             <ListingHead title={listing.title} imageSrc={listing.imageSrc} locationValue={listing.locationValue} id={listing.id} currentUser={currentUser} />
             <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
               <ListingInfo user={listing.user} category={category} description={listing.description} roomCount={Number(listing.roomcount)} locationValue={listing.locationValue} bathroomCount={Number(listing.bathroomcount)} guestCount={Number(listing.guestcount)} />
               <div className='order-first mb-10 md:order-last md:col-span-3'>
                  <ListingReservation price={Number(listing.price)} totalPrice={Number(totalPrice)} onChangeDate={(value) => setDateRange(value)} dateRange={dateRange} disabledDates={disabledDates} onSubmit={onCreateReservation} disabled={isLoading} />
               </div>
             </div>
          </div>
       </div>
    </Container>
  )
}

export default ListingClient