import { auth } from '@/auth'
import { prisma } from '@/lib/prisma';
import React from 'react'
import { FaUserCircle, FaBook } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";

const Dashbaord = async () => {

  const session = await auth();
  const fullname = session?.user.name;

  const numOfUser = await prisma.user.count();
  const numOfPlace = await prisma.place.count();
  const numOfBooking = await prisma.booking.count();

  return (
    <div className='mx-auto max-w-[80%] mt-10 '>
      <div className='flex flex-col'>
        <p className='text-[26px] text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-950 font-semibold 
        animate-fade-right animate-duration-[2500ms] animate-delay-100'>Hello,</p>
        <h1 className='text-[46px] font-bold animate-fade-left animate-duration-[2500ms] animate-delay-500 
        text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600'>{fullname}</h1>
      </div>

      <div className='container mt-3 grid grid-cols-3 gap-3 text-blue-950'>

        <div className='flex flex-row bg-white items-center p-3 rounded-md gap-5 justify-center shadow-sm'>
          <FaUserCircle className='text-5xl' />
          <div>
            <p className='text-3xl font-semibold'>{numOfUser}</p>
            <p className='text-lg'>Total Users</p>
          </div>
        </div>

        <div className='flex flex-row bg-white items-center p-3 rounded-md gap-5 justify-center shadow-sm'>
          <MdMeetingRoom className='text-5xl' />
          <div>
            <p className='text-3xl font-semibold'>{numOfPlace}</p>
            <p className='text-lg'>Total Place</p>
          </div>
        </div>

        <div className='flex flex-row bg-white items-center p-3 rounded-md gap-5 justify-center shadow-sm'>
          <FaBook className='text-4xl' />
          <div>
            <p className='text-3xl font-semibold'>{numOfBooking}</p>
            <p className='text-md'>Total User Reservations</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Dashbaord