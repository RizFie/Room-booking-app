
import { auth } from '@/auth';
import Carousel from '@/components/user-carousel';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import React from 'react'

const CompleteBooking = async ({ params }: { params: { id: string } }) => {

    const session = await auth();
    const userId = session?.user.userId;

    const {id} = await params;
    
    const placeData = await prisma.place.findUnique({
        where: {
            placeId: id,
        },
        include: {
            picture: true,
        }
    });

    const placePic = placeData?.picture;

  return (
    <div className='mx-auto max-w-[60%] my-10 '>
        <div className='flex flex-row items-center justify-between'>
            <h1 className='text-2xl font-bold text-blue-950'>Complete your booking for,</h1>
            <Link href={'/main/reserve'}><button  className='p-2 border-2 rounded-md shadow-sm bg-gray-600
            border-gray-400 text-white font-medium hover:scale-110 active:scale-95 transition-all'>Back</button></Link>
        </div>
        
        <Carousel placePic={placePic || []}/>
        <div></div>
    </div>
  )
}

export default CompleteBooking