import Calendar from "@/components/calendar";
import {prisma} from "../../../lib/prisma"
import { auth } from "@/auth";

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
        date: {gt: tomorrow}
       },
      include: {
        place: true,
        user: true,
      },
      orderBy: {
        date: 'asc'
      }
    });

    const todayBookings = await prisma.booking.findMany({
      where: { 
        date: todayStartOfDay
       },
      include: {
        place: true,
        user: true,
      },
    });

    console.log(todayBookings);

  return (
    <div className="w-full h-full container">

      <div className="max-w-[80%] mx-auto mt-10">
        <h1 className="font-bold text-3xl text-blue-950">View Users Bookings</h1>
        <p className="font-medium text-gray-700 text-sm my-1 bg-gray-200 bg-opacity-60 p-1 rounded-sm">The Scheduler Calendar will <b>display all related information</b> of a reservation, 
          you may view 3 summary card of:<br/>
        "<b className="font-semibold text-green-700">Upcoming</b>", "<b className="font-semibold text-blue-700">Today</b>" and "
        <b className="font-semibold text-red-700">Cancel</b>
        ", for a quick info of the reservations.</p>
      </div>

      <Calendar data={bookingDatas} role={role}/>

      <div className="container max-w-[80%] mx-auto my-5 grid grid-cols-3 gap-5">

        <div className="bg-green-100 container rounded-md shadow-lg p-3 border-t-8 border-t-green-600">
          <h4 className="text-gray-900 text-lg font-medium my-1">Upcoming Reservations</h4>
          <div className="container overflow-auto max-h-96">
            {upComings.length > 0 ? (
              upComings.map((upComing) => (
                <div key={upComing.bookingId} className="rounded-md bg-white shadow-md my-2 text-xs text-black p-2 flex flex-col justify-center">
                  <div className="flex flex-row justify-between font-medium my-1">
                    <h1>{upComing.user.fullname}</h1>
                    <h1 className="text-[10px] border-[2px] rounded-sm bg-gray-200">+6{upComing.user.phoneNum}</h1>
                  </div>
                  <h1 className="text-[14px] text-gray-700 font-semibold my-1 border-b-2 pb-2 border-gray-200">{upComing.place.placeName}</h1>
                  <span className="my-1 text-blue-900 font-medium shadow-inner">{upComing.date.toLocaleDateString()}, {upComing.startTime.toLocaleTimeString()} - {upComing.endTime.toLocaleTimeString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="my-1">
                <h1 className="text-sm font-medium text-gray-500">No Upcoming Reservation</h1>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-100 container rounded-md shadow-lg p-3 border-t-8 border-t-blue-600">
          <h4 className="text-gray-900 text-lg font-medium my-1">Today Reservations</h4>
          <div className="container overflow-auto max-h-96">
            {todayBookings.length > 0 ? (
              todayBookings.map((todayBook) => (
                <div key={todayBook.bookingId} className="rounded-md bg-white shadow-md my-2 text-xs text-black p-2 flex flex-col justify-center">
                  <div className="flex flex-row justify-between font-medium my-1">
                    <h1>{todayBook.user.fullname}</h1>
                    <h1 className="text-[10px] border-[2px] rounded-sm bg-gray-200">+6{todayBook.user.phoneNum}</h1>
                  </div>
                  <h1 className="text-[14px] text-gray-700 font-semibold my-1 border-b-2 pb-2 border-gray-200">{todayBook.place.placeName}</h1>
                  <span className="my-1 text-blue-900 font-medium shadow-inner">{todayBook.date.toLocaleDateString()}, {todayBook.startTime.toLocaleTimeString()} - {todayBook.endTime.toLocaleTimeString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="my-1">
                <h1 className="text-sm font-medium text-gray-500">No Reservation Today</h1>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default BookingPageAdmin