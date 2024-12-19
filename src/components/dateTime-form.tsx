"use client"
import { createBooking } from '@/lib/action';
import React, {useActionState, useEffect} from 'react';
import toast from 'react-hot-toast';

interface props {
  userId: string | "";
  placeId: string | "";
}

const DateTimeForm = ({userId,placeId}:props) => {

  //console.log("Date Time userId: ",userId);
  //console.log("Date Time placeId: ",placeId);

  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];
  //console.log("Formatted Date: ",formattedDate);

  const createBookingWithIds = createBooking.bind(null,{
    place: placeId,
    user: userId,
  })
  const [state,formAction] = useActionState(createBookingWithIds,null);

  useEffect(() => {
    if(state?.code==200){
      toast.success(state.message);
    }
    else if(state?.code==500){
      toast.error(state.message,{duration: 6000});
    }
  },[state]);

  return (
    <form action={formAction} className='w-full mt-4 text-blue-950'>

        <div className='flex flex-col'>
            <label htmlFor='date' className='text-md font-medium block mb-2 bg-blue-950 text-white px-2 w-40 text-center rounded-md'>Reservation Date</label>
            <input required min={formattedDate} name='date' id='date' type='date' className='p-2 border-[1.4px] rounded-sm border-gray-300 shadow-inner active:outline-1
            outline-blue-500'/>
        </div>

        <div className='flex flex-col mt-6'>
            <label htmlFor='startTime' className='text-md font-medium block mb-2 bg-blue-950 text-white px-2 w-40 text-center rounded-md'>Start Time</label>
            <input required name='startTime' id='startTime' type='time' className='p-2 border-[1.4px] rounded-sm border-gray-300 shadow-inner active:outline-1
            outline-blue-500'/>
        </div>

        <div className='flex flex-col mt-6'>
            <label htmlFor='endTime' className='text-md font-medium block mb-2 bg-blue-950 text-white px-2 w-40 text-center rounded-md'>End Time</label>
            <input required name='endTime' id='endTime' type='time' className='p-2 border-[1.4px] rounded-sm border-gray-300 shadow-inner active:outline-1
            outline-blue-500'/>
        </div>

        <div className='flex flex-col mt-6'>
            <label htmlFor='purpose' className='text-md font-medium block bg-blue-950 text-white px-2 w-40 text-center rounded-md'>Purpose</label>
            <span className='text-[12px] font-medium my-2 text-gray-600'>Maximum of 200 characters allowed</span>
            <textarea required name='purpose' id='purpose' maxLength={200} className='p-2 border-[1.4px] rounded-sm border-gray-300 shadow-inner active:outline-1
            outline-blue-500'/>
        </div>

        <button type='submit' className='w-full my-6 p-1 rounded-md bg-blue-500 text-white font-medium shadow hover:scale-100
        transition-all active:scale-95'>Place Booking</button>
                
    </form>
  )
}

export default DateTimeForm