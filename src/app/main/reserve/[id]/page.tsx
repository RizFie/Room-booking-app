
import { auth } from '@/auth';
import Carousel from '@/components/user-carousel';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import React from 'react';

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
    <div className='mx-auto max-w-[80%] my-10'>
        <div className='bg-white p-5 shadow-md rounded-lg max-w-[60%]'>
            <div className='flex flex-row items-center justify-between'>
                <h1 className='text-2xl font-bold text-blue-950'>Complete your booking for,</h1>
                <Link href={'/main/reserve'}><button  className='p-2 border-2 rounded-md shadow-sm bg-gray-600
                border-gray-400 text-white font-medium hover:scale-110 active:scale-95 transition-all'>Back</button></Link>
            </div>
        
            <Carousel placePic={placePic || []}/>

            <div className=''>
                <h2 className='font-semibold text-2xl text-blue-950 border-t-2 border-l-2 border-blue-500 py-1 pl-[5px]
                bg-white rounded-tl-sm rounded-br-sm mb-5'>{placeData?.placeName}</h2>
                <h3 className='font-semibold text-xl text-blue-950 '>{placeData?.placeType}</h3>
                <h2 className='font-medium text-xs bg-blue-950 w-20 text-center p-1 text-white rounded-md mt-1'>Room Type</h2>
                
            </div>


        </div>
    </div>
    
  )
}

export default CompleteBooking