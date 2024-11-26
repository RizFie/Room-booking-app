"use client"
import React, {useActionState} from 'react'

interface props {
  userId: string | "";
  placeId: string | "";
}

const DateTimeForm = ({userId,placeId}:props) => {

  //console.log("Date Time userId: ",userId);
  //console.log("Date Time placeId: ",placeId);



  return (
    <form className='w-full mt-4 text-blue-950'>

        <div className='flex flex-col'>
            <label htmlFor='date' className='text-md font-medium block mb-2 bg-blue-950 text-white px-2 w-40 text-center rounded-md'>Reservation Date</label>
            <input name='date' id='date' type='date' className='p-2 border-[1.4px] rounded-sm border-blue-950 shadow-inner active:outline-1
            outline-blue-500'/>
        </div>

        <div className='flex flex-col mt-6'>
            <label htmlFor='startTime' className='text-md font-medium block mb-2 bg-blue-950 text-white px-2 w-40 text-center rounded-md'>Start Time</label>
            <input name='startTime' id='startTime' type='time' className='p-2 border-[1.4px] rounded-sm border-blue-950 shadow-inner active:outline-1
            outline-blue-500'/>
        </div>

        <div className='flex flex-col mt-6'>
            <label htmlFor='endTime' className='text-md font-medium block mb-2 bg-blue-950 text-white px-2 w-40 text-center rounded-md'>End Time</label>
            <input name='endTime' id='endTime' type='time' className='p-2 border-[1.4px] rounded-sm border-blue-950 shadow-inner active:outline-1
            outline-blue-500'/>
        </div>

        <div className='flex flex-col mt-6'>
            <label htmlFor='purpose' className='text-md font-medium block mb-2 bg-blue-950 text-white px-2 w-40 text-center rounded-md'>Purpose</label>
            <textarea name='purpose' id='purpose' maxLength={150} className='p-2 border-[1.4px] rounded-sm border-blue-950 shadow-inner active:outline-1
            outline-blue-500'/>
        </div>

        <button type='submit' className='w-full my-6 p-1 rounded-md bg-blue-500 text-white font-medium shadow hover:scale-105
        transition-all active:scale-95'>Place Booking</button>
                
    </form>
  )
}

export default DateTimeForm