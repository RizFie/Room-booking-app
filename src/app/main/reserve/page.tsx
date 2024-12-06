import { auth } from '@/auth';
import Calendar from '@/components/calendar';
import RoomCard from '@/components/room-card'
import { prisma } from '@/lib/prisma';
import React from 'react'
import { ImNotification } from "react-icons/im";

const ReservePage = async () => {

    const session = await auth();
    const role = session?.user.role;

    const today = new Date();
    const todayStartOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

    try {
      await prisma.booking.updateMany({
        where: {
          date: {lt: todayStartOfDay}
        },
        data: {
          past: true,
        }
      });
    } catch (error) {
      throw error
    }

    const bookingDatas = await prisma.booking.findMany({
      include: {
        place: true,
        user: true
      }
    });

  return (
    <>
    <div className='mx-auto w-full mt-10 text-center mb-7 p-3 text-white'>
      <h1 className="font-bold text-3xl animate-fade-right animate-once animate-ease-linear animate-alternate"><span className='text-transparent bg-clip-text bg-gradient-to-r 
      from-blue-700 via-purple-700 to-red-600'>Haven't reserve a room yet?</span></h1>
      <p className='text-gray-700 mt-2 font-semibold'>Start your booking process now and secure your spot!</p>
    </div>

    <div className='mb-10 flex flex-row justify-center items-center gap-7'>
      <h2 className='text-center text-sm font-semibold bg-gradient-to-r from-purple-700 to-red-600 
      p-3 shadow-md text-white w-[300px] 
      animate-fade-right animate-once animate-delay-[1000ms] animate-ease-linear animate-alternate'>1. Select your room/place</h2>
      <h2 className='text-center text-sm font-semibold bg-gradient-to-r from-purple-700 to-red-600 
      p-3 shadow-md text-white w-[300px]
      animate-fade-right animate-once animate-delay-[1500ms] animate-ease-linear animate-alternate'>2. Select your reservation date</h2>
      <h2 className='text-center text-sm font-semibold bg-gradient-to-r from-purple-700 to-red-600 
      p-3 shadow-md text-white w-[300px]
      animate-fade-right animate-once animate-delay-[2000ms] animate-ease-linear animate-alternate'>3. Done, your booking will be confirmed</h2>
    </div>
    
    <RoomCard role={role}/>
    
    <div className='text-blue-800 mt-2 font-medium text-sm bg-blue-100 max-w-[80%] mx-auto
      py-2 border-l-4 border-l-blue-500 pl-2 flex flex-row gap-3 items-center'>
      <ImNotification/>
      <p>The Calendar may help you to identify reserved date and time.<br/>
      For reservation details and cancellation, please navigate to the "<b>Booking</b>" section.</p>
    </div>
 

    <Calendar data={bookingDatas} role={role}/>

    </>
    
  )
}

export default ReservePage