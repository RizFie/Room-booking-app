import { auth } from '@/auth';
import Calendar from '@/components/calendar';
import RoomCard from '@/components/room-card'
import { prisma } from '@/lib/prisma';
import React from 'react'

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
      animate-fade-right animate-once animate-delay-1000 animate-ease-linear animate-alternate'>1. Select your room/place</h2>
      <h2 className='text-center text-sm font-semibold bg-gradient-to-r from-purple-700 to-red-600 
      p-3 shadow-md text-white w-[300px]
      animate-fade-right animate-once animate-delay-[2000ms] animate-ease-linear animate-alternate'>2. Select your reservation date</h2>
      <h2 className='text-center text-sm font-semibold bg-gradient-to-r from-purple-700 to-red-600 
      p-3 shadow-md text-white w-[300px]
      animate-fade-right animate-once animate-delay-[3000ms] animate-ease-linear animate-alternate'>3. Done, your booking will be confirmed</h2>
    </div>
    
    <RoomCard role={role}/>
    
    <p className='text-blue-800 mt-2 font-semibold text-center bg-blue-100 max-w-[80%] mx-auto
    py-2 rounded-md border-2 border-blue-500'>This Calendar may help you incase there is a reservation<br/>
    already have been made for your choosen date and time.</p>

    <Calendar data={bookingDatas} role={role}/>

    </>
    
  )
}

export default ReservePage