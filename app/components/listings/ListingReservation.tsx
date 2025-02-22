'use client';
import React from 'react'
import {Range} from 'react-date-range'
import Calendar from '../inputs/Calendar';
import Button from '../Button';

interface ListingReservationprops {
    price: number;
    totalPrice: number;
    dateRange: Range;
    onChangeDate:(value:Range) => void;
    onSubmit: () => void;
    disabled: boolean;
    disabledDates: Date[];
}
const ListingReservation: React.FC<ListingReservationprops> = ({price,totalPrice,dateRange,onChangeDate,onSubmit,disabled,disabledDates}) => {

  return (
    <div className='bg-white border-[1px] border-neutral-200 rounded-xl overflow-hidden'>
       <div className='flex flex-row items-center gap-1 p-4'>
          <div className='text-2xl font-semibold'>$ {price}</div>
          <div className=' font-light text-neutral-600'>night</div>
       </div>
       <hr />
       <Calendar value={dateRange} disabledDates={disabledDates} onChange={(value) => onChangeDate(value.selection)} />
       <hr />
       <div className='p-4'>
          <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
       </div>
       <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
          <div>
            Total: $ {totalPrice}
          </div>
       </div>
    </div>
  )
}

export default ListingReservation