
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
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

  return (
    <div className='mx-auto max-w-[60%] my-10 '>
        <h1>Complete your booking for,</h1>
        <h3>{placeData?.placeName}</h3>
    </div>
  )
}

export default CompleteBooking