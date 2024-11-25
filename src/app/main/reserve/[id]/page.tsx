
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
    <div className='mx-auto max-w-[80%] my-10 flex flex-row gap-4'>
        <div className='bg-white p-5 shadow-md rounded-lg max-w-[60%] min-h-[486px]'>
            <div className='flex flex-row items-center justify-between'>
                <h1 className='text-2xl font-bold text-blue-950'>Complete your booking,</h1>
            </div>
        
            <Carousel placePic={placePic || []}/>

            <div className=''>
                <h2 className='font-semibold text-2xl text-blue-950 border-t-2 border-l-2 border-blue-500 py-1 pl-[5px]
                bg-white rounded-tl-sm rounded-br-sm mb-5'>{placeData?.placeName}</h2>
                <div className='flex flex-row gap-10'>
                    <div>
                        <h3 className='font-semibold text-xl text-blue-950 '>{placeData?.placeType}</h3>
                        <h2 className='font-medium text-xs bg-blue-950 w-[76px] text-center p-1 text-white rounded-md mt-1'>Room Type</h2>
                    </div>
                    <div>
                        <h3 className='font-semibold text-xl text-blue-950 '>{placeData?.placeCapacity} people</h3>
                        <h2 className='font-medium text-xs bg-blue-950 w-20 text-center p-1 text-white rounded-md mt-1'>Capacity</h2>
                    </div>
                </div>
                <p className='mt-4 text-justify text-blue-950 font-medium border-t-2 pt-2 border-t-blue-500'>{placeData?.placeDesc}</p>
                
                
            </div>
        </div>
        <div className='container max-w-[40%] min-h-[486px] bg-white p-5 shadow-md rounded-lg'>
            <div className='flex justify-end'>
                <Link href={'/main/reserve'}><button className='border-2 rounded-md shadow-sm bg-blue-950 h-[32px] w-[54px]
                border-gray-400 text-white font-medium hover:scale-110 active:scale-95 transition-all'>Back</button></Link>
            </div>
            
            <form className='w-full mt-4 text-blue-950'>

                <div className='flex flex-col'>
                    <label htmlFor='date' className='text-lg font-medium block mb-2'>Reservation Date</label>
                    <input name='date' type='date' className='p-2 border-2 rounded-sm border-blue-950 shadow-inner active:outline-1
                    outline-blue-500'/>
                </div>

                <div className='flex flex-col mt-6'>
                    <label htmlFor='startTime' className='text-lg font-medium block mb-2'>Start Time</label>
                    <input name='startTime' type='time' className='p-2 border-2 rounded-sm border-blue-950 shadow-inner active:outline-1
                    outline-blue-500'/>
                </div>

                <div className='flex flex-col mt-6'>
                    <label htmlFor='endTime' className='text-lg font-medium block mb-2'>End Time</label>
                    <input name='endTime' type='time' className='p-2 border-2 rounded-sm border-blue-950 shadow-inner active:outline-1
                    outline-blue-500'/>
                </div>
                
            </form>
        </div>
    </div>
    
  )
}

export default CompleteBooking