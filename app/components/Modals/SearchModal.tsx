'use client';
import React, { useCallback, useMemo, useState } from 'react'
import Modal from './Modal'
import useSearchModal from '@/app/hooks/useSearchModal'
import { useRouter, useSearchParams } from 'next/navigation';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import CountryInput, { CountryInputValue } from '../inputs/CountryInput';
import qs from 'query-string';
import { formatISO } from 'date-fns';

import Heading from '../Heading';
import Calendar from '../inputs/Calendar';
import Counters from '../inputs/Counters';

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
} 
const SearchModal = () => {
    const router = useRouter();
    const searchModal = useSearchModal();
    const params = useSearchParams();
    const [step,setStep] = useState(STEPS.LOCATION);
    const [location,setLocation] = useState<CountryInputValue>();
    const [guestCount,setGuestCount] = useState(1);
    const [roomCount,setRoomCount] = useState(1);
    const [bathroomCount,setBathroomCount] = useState(1);
    const [dateRange,setDateRange] = useState<Range>({startDate: new Date(),endDate: new Date(),key:"selection"});

    const Map = useMemo(() => dynamic(() => import('../Map'),{ssr: false}),[location]);

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    },[]);

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    },[]);

    const onSubmit = useCallback(() => {
        if(step !== STEPS.INFO) return onNext();

        let currentQuery = {};
        if(params){
            currentQuery = qs.parse(params.toString());
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateQuery:any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount,
        }
        if(dateRange.startDate){
            updateQuery.startDate = formatISO(dateRange.startDate);
        }

        if(dateRange.endDate){
            updateQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: "/",
            query: updateQuery,
        },{skipNull: true});

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);
    },[step,location,searchModal,roomCount,dateRange,bathroomCount,guestCount,router,params,onNext]);

    const actionLabel = useMemo(() => {
        if(step === STEPS.INFO){
            return 'Search';
        }
        return 'Next';
    },[step]);

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.LOCATION){
            return undefined;
        }
        return "Back";
    },[step]);

    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading title='Where do you want to go?' subtitle='Find the perfect location!' />
            <CountryInput value={location} onChange={(value) => setLocation(value as CountryInputValue)} />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )
    if(step === STEPS.DATE){
        bodyContent = (
            <div className='flex flex-col gap-8'>
               <Heading title='When do you plan to go?' subtitle='Make sure everyone is free!' />
               <Calendar value={dateRange} onChange={(value) => setDateRange(value.selection)} />
            </div>
        )
    }

    if(step === STEPS.INFO){
        bodyContent= (
            <div className='flex flex-col gap-8'>
                <Heading title='How many people are traveling?' subtitle='Make sure you have enough space!' />
                <Counters title='Guests' subtitle='How many people are traveling?' value={guestCount} onChange={(value) => setGuestCount(value)}  />
                <Counters title='Rooms' subtitle='How many rooms do you need?' value={roomCount} onChange={(value) => setRoomCount(value)}  />
                <Counters title='Bathrooms' subtitle='How many bathrooms do you need?' value={bathroomCount} onChange={(value) => setBathroomCount(value)}  />

            </div>
        )
    }
  return (
    <Modal
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSubmit={onSubmit}
        title='Filters'
        actionLabel={actionLabel}
        secondaryLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
        body={bodyContent}
        />
  )
}

export default SearchModal