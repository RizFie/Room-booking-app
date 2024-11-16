import { auth } from '@/auth';
import RoomCard from '@/components/room-card'
import React from 'react'

const ReservePage = async () => {

    const session = await auth();
    const role = session?.user.role

  return (
    <div>
        <RoomCard role={role}/>
    </div>
  )
}

export default ReservePage