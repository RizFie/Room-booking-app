import { auth } from '@/auth';
import RoomCard from '@/components/room-card'
import React from 'react'

const ReservePage = async () => {

    const session = await auth();
    const role = session?.user.role

  return (
    <>
    <div className='mx-auto w-full mt-10 text-center mb-7  p-3 text-white'>
      <h1 className="font-bold text-3xl"><span className='text-transparent bg-clip-text bg-gradient-to-r 
      from-blue-700 via-purple-700 to-red-600'>Haven't reserve a room yet?</span></h1>
      <p className='text-blue-950 mt-2 font-medium'>Start your booking process now and secure your spot!</p>
    </div>

    <div className='mb-10 flex flex-row justify-center items-center gap-2'>
      <h2 className='text-center text-2xl font-semibold rounded-full bg-gradient-to-r from-purple-700 to-red-600 
      w-80 p-3 shadow-md'>
      <span className='text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white'>
        Select your room/place
      </span></h2>
    </div>
    

    <RoomCard role={role}/>
 
    
    </>
    
  )
}

export default ReservePage