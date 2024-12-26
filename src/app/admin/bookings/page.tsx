import Calendar from "@/components/calendar";
import {prisma} from "../../../lib/prisma"
import { auth } from "@/auth";
import Image from "next/image";
import nothing from "../../../../public/illustration/nothing.svg";
import { TiPin } from "react-icons/ti";

const BookingPageAdmin = async () => {

  const session = await auth();
  const role = session?.user.role;

  const today = new Date();
  const todayStartOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

  //console.log(tomorrow)

  try {
    await prisma.booking.updateMany({
      where: {
        date: {lt: todayStartOfDay}
      },
      data: {
        past: true,
      }
    });
  } catch (error) {
    throw error
  }

    const bookingDatas = await prisma.booking.findMany({
      include: {
        place: true,
        user: true
      }
    });

    const upComings = await prisma.booking.findMany({
      where: { 
        date: {gt: todayStartOfDay},
        past: false
       },
      include: {
        place: true,
        user: true,
      },
      orderBy: {
        date: 'asc'
      }
    });

    //console.log("upcomings: ",upComings)

    const pastBookings = await prisma.booking.findMany({
      where: { 
        past: true
       },
      include: {
        place: true,
        user: true,
      },
      orderBy: {
        date: 'desc'
      }
    });


  return (
    <div className="w-full h-full container mx-auto">

      <div className="max-w-[80%] mx-auto mt-10">
        <h1 className="font-bold text-3xl text-blue-950 animate-fade-left animate-duration-[1000ms] animate-delay-500">View Users Bookings</h1>
        <p className="font-medium text-gray-700 text-sm my-1 bg-gray-200 bg-opacity-75 p-2 animate-fade animate-once animate-ease-in animate-normal">The Scheduler Calendar will <b>display all related information</b> of a reservation.
        <br/>Quick info of
        "<b className="font-semibold text-green-700">Upcoming</b>" and "
        <b className="font-semibold text-red-700">Past</b>
        " reservations is also available.</p>
      </div>

      <Calendar data={bookingDatas} role={role}/>

      <div className="container max-w-[80%] mx-auto my-5 grid grid-cols-2 gap-3">

        {/* Upcoming Reservations */}
        <div className="bg-green-100 container rounded-md shadow-lg p-3 border-t-8 border-t-green-600 h-[400px]">
          <div className="text-lg font-medium mb-1 text-center flex flex-row gap-2 items-center justify-center">
            <TiPin className="text-green-800"/>
            <h4 className="text-gray-700">Upcoming Reservations</h4>
          </div>
          <div className="container overflow-auto max-h-[340px]">
            {upComings.length > 0 ? (
              upComings.map((upComing) => (
                <div key={upComing.bookingId} className="rounded-md bg-white shadow-md my-2 text-xs text-black p-2 
                flex flex-col items-center w-[300px] mx-auto">
                  <div className="flex flex-row justify-between font-medium my-1 items-center w-full">
                    <h1 className="">{upComing.user.fullname}</h1>
                    <h1 className="text-[10px] p-1 rounded-sm bg-gray-100">+6{upComing.user.phoneNum}</h1>
                  </div>
                  <h1 className="text-[14px] text-gray-700 font-semibold my-1 border-b-[1px] pb-2 border-gray-200
                  w-full">{upComing.place.placeName}</h1>
                  <span className="my-1 text-blue-900 font-medium shadow-inner w-full">
                    {upComing.date.toLocaleDateString()}, {upComing.startTime.toLocaleTimeString()} - {upComing.endTime.toLocaleTimeString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex flex-col gap-2 justify-center items-center my-10">
                <Image src={nothing} width={250} height={250} alt="No Reservation Today" className="
                mt-2"/>
                <h1 className="text-sm font-medium text-gray-500 text-left mt-2">No Upcoming Reservation</h1>
              </div>
            )}
          </div>
        </div>

        {/* Past Reservations */}
        <div className="bg-red-100 container rounded-md shadow-lg p-3 border-t-8 border-t-red-600 h-[400px]">
          <div className="text-lg font-medium mb-1 text-center flex flex-row gap-2 items-center justify-center">
            <TiPin className="text-red-800"/>
            <h4 className="text-gray-700">Past Reservations</h4>
          </div>
          <div className="container overflow-auto max-h-[340px]">
            {pastBookings.length > 0 ? (
              pastBookings.map((pastBook) => (
                <div key={pastBook.bookingId} className="rounded-md bg-white shadow-md my-2 text-xs text-black p-2 
                flex flex-col justify-center items-center w-[300px] mx-auto">
                  <div className="flex flex-row justify-between font-medium my-1 items-center w-full">
                    <h1>{pastBook.user.fullname}</h1>
                    <h1 className="text-[10px] rounded-sm bg-gray-100 p-1">+6{pastBook.user.phoneNum}</h1>
                  </div>
                  <h1 className="text-[14px] text-gray-700 font-semibold my-1 border-b-[1px] pb-2 border-gray-200 w-full">
                    {pastBook.place.placeName}
                  </h1>
                  <span className="my-1 text-blue-900 font-medium shadow-inner w-full">
                    {pastBook.date.toLocaleDateString()}, {pastBook.startTime.toLocaleTimeString()} - {pastBook.endTime.toLocaleTimeString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="my-1 flex flex-col gap-2 justify-center items-center">
                <Image src={nothing} width={250} height={250} alt="No Reservation Today" className="
                mt-2"/>
                <h1 className="text-sm font-medium text-gray-500 text-left mt-2">No Past Reservation</h1>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default BookingPageAdmin