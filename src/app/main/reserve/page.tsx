import { auth } from '@/auth';
import RoomCard from '@/components/room-card'
import React from 'react'

const ReservePage = async () => {

    const session = await auth();
    const role = session?.user.role

  return (
    <>
    <div className='mx-auto w-full mt-10 text-center mb-10  p-3 text-white'>
      <h1 className="font-bold text-3xl"><span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-red-600 '>Haven't reserve a room yet?</span></h1>
      <p className='text-blue-950 mt-2 font-medium'>Start your booking process now and secure your spot!</p>
    </div>

    <div className='mb-10 flex flex-row justify-center items-center gap-2'>
      <div className='rounded-full bg-gradient-to-r from-fuchsia-700 to-red-600 aspect-square w-14 flex 
      justify-center items-center shadow-sm'>
        <h2 className='text-center text-2xl font-semibold text-gray-100'>1</h2>
      </div>
      <h2 className='text-center text-2xl font-semibold'><span className='text-transparent bg-clip-text
      bg-gradient-to-r from-gray-600 to-gray-500'>Select your room/place</span></h2>
    </div>
    

    <RoomCard role={role}/>
 
    
    </>
    
  )
}

export default ReservePage