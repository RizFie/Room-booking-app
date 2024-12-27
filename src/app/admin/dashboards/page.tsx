import { auth } from '@/auth';
import Wrapper from '@/components/client-wrapper';
import { prisma } from '@/lib/prisma';
import React from 'react';
import { FaUserCircle, FaBook, FaSun, FaMoon } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import Link from 'next/link';
import { IoAlert } from "react-icons/io5";

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

  const pendingBooking = await prisma.booking.count({
    where: {
      confirm: false,
      past: false,
    },
  });

  return (
    <div className='mx-auto max-w-[80%] mt-10 '>
      <div className='flex flex-row gap-4 items-center'>
        <div className='flex flex-col'>
          <p className='text-[26px] text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-950 font-semibold 
          animate-fade-right animate-duration-[2500ms] animate-delay-100'>Hello,</p>
          <h1 className='text-[46px] leading-[46px] font-bold animate-fade-left animate-duration-[2500ms] animate-delay-500 
          text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600'>{fullname}</h1>
        </div>
        <div>
          { today.getHours() >= 19 || today.getHours() < 6 ? 
          <FaMoon className='text-6xl animate-spin animate-infinite animate-duration-[60000ms] animate-ease-linear text-yellow-400'/> 
          : 
          <FaSun className='text-6xl animate-spin animate-infinite animate-duration-[60000ms] animate-ease-linear text-orange-400'/> }
        </div>
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
            <p className='text-lg text-center'>Total Place</p>
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

      <div className='container my-5 flex flex-row justify-center gap-3 max-h-[288px]'>
        <div className='col-span-1 bg-white rounded-md shadow-sm animate-fade animate-once
        animate-duration-[1400ms] animate-ease-linear justify-center w-[300px]'>
          <h2 className='text-2xl font-semibold text-blue-950 mb-1 pl-3 pt-2'>{totalCurrentMonthBooking} Reservations</h2>
          <h2 className='text-sm text-blue-950 mb-6 pl-3'>{months[today.getMonth()]} Booking Overview</h2>
          <Wrapper data={bookingData}/>
        </div>

        <div className='col-span-2 animate-fade animate-once
        animate-duration-[1400ms] animate-ease-linear w-full flex flex-col gap-3'>
          <div className='bg-white rounded-md shadow-sm p-3 h-full'>
            <h2 className='text-2xl font-semibold text-blue-950 mb-1'>Place Reservations Count</h2>
            <div className='overflow-auto max-h-[80px]'>
              <table className='w-full rounded-md mt-4 border-separate border-spacing-0'>
                <thead>
                  <tr className='bg-gray-200 text-left h-9'>
                    <th className='px-2'>Place</th>
                    <th className='px-2'>Number of Reservations</th>
                  </tr>
                </thead>
                <tbody>
                  {placesWithBookingCount.map((place) => (
                    <tr key={place.placeId} className='text-sm bg-gray-100'>
                      <td className='px-2'>{place.placeName}</td>
                      <td className='px-2'>{place.bookingCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='bg-white rounded-md shadow-sm p-3 flex flex-row justify-center max-h-full gap-2 items-center'>
            <div className='text-center'>
              <div className='flex flex-row'>
                <h2 className='text-2xl font-semibold text-blue-950 mb-1 w-full'>{pendingBooking < 1 ? "No" : pendingBooking} Pending {pendingBooking > 1 ? "Reservations" : "Reservation"}</h2>
                <IoIosNotifications className={pendingBooking > 0 ? "text-red-500 bg-red-200 rounded-full animate-ease-in-out animate-ping animate-infinite animate-duration-[1300ms]" 
                  : 
                "hidden"}/>
              </div>
              <h2 className='text-sm text-blue-950 mb-2'>Number of reservation awaiting confirmation</h2>
              <Link href={'/admin/bookings'} className='text-[12px] font-medium bg-blue-200 text-blue-600
              p-2 rounded-sm hover:bg-blue-400 hover:text-white transition-all'>View Bookings</Link>
            </div>
            
            <div className="w-[100px] h-[100px] overflow-hidden bg-[url('/illustration/pending.png')]
            bg-contain bg-no-repeat bg-left"></div>

            <div className='flex flex-row justify-center items-center bg-red-100 text-red-500 h-16 w-52 p-2
            rounded-sm'>
              <IoAlert className='text-8xl'/>
              <h1 className='text-[11px] font-semibold'>Pending Reservation only shows reservation that has not passed</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
