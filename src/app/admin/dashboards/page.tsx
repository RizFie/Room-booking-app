import { auth } from '@/auth';
import Wrapper from '@/components/client-wrapper';
import { prisma } from '@/lib/prisma';
import React from 'react';
import { FaUserCircle, FaBook } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";

const Dashboard = async () => {
  const session = await auth();
  const fullname = session?.user.name;
  const today = new Date();

  const numOfUser = await prisma.user.count();
  const numOfPlace = await prisma.place.count();
  const numOfBooking = await prisma.booking.count();

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December',
  ];

  const bookings = await prisma.booking.groupBy({
    by: ['date'],
    _count: {
      _all: true,
    },
    where: {
      date: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
    orderBy: {
      date: 'asc',
    },
  });

  const totalCurrentMonthBooking = await prisma.booking.count({
    where: {
      date: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });

 
  const bookingData = bookings.map(booking => ({
    date: booking.date.toISOString().split('T')[0],
    value: booking._count._all,
  }));

  //console.log(bookingData);

  const placesWithBookingCount: {placeId: string, placeName: string; bookingCount: number}[] = 
  await prisma.$queryRaw`SELECT p.placeId , p.placeName, count(b.bookingId) as bookingCount FROM booking b JOIN place p ON p.placeId = b.placeId GROUP BY placeName`;
  
  //console.log(placesWithBookingCount);

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

      <div className='container my-5 flex flex-row justify-center gap-3 max-h-[300px]'>
        <div className='col-span-1 bg-white rounded-md shadow-sm animate-fade animate-once
        animate-duration-[1400ms] animate-ease-linear justify-center w-[300px]'>
          <h2 className='text-2xl font-semibold text-blue-950 mb-1 pl-3 pt-2'>{totalCurrentMonthBooking} Reservations</h2>
          <h2 className='text-md  text-blue-950 mb-6 pl-3'>{months[today.getMonth()]} Booking Overview</h2>
          <Wrapper data={bookingData}/>
        </div>

        <div className='col-span-2 bg-white p-3 rounded-md shadow-sm animate-fade animate-once
        animate-duration-[1400ms] animate-ease-linear w-full'>
          <h2 className='text-2xl font-semibold text-blue-950 mb-1'>Place Reservations Number</h2>
          <table className='w-full rounded-md mt-4 border-separate border-spacing-0'>
            <thead>
              <tr className='bg-gray-100 text-left h-9'>
                <th className='px-2'>Place</th>
                <th className='px-2'>Number of Reservations</th>
              </tr>
            </thead>
            <tbody>
              {placesWithBookingCount.map((place) => (
                <tr key={place.placeId} className='text-sm'>
                  <td className='px-2'>{place.placeName}</td>
                  <td className='px-2'>{place.bookingCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
