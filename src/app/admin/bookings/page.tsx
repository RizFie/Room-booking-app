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
      }
    });

  return (
    <div className="w-full h-full container">

      <div className="max-w-[80%] mx-auto mt-10">
        <h1 className="font-bold text-3xl text-blue-950">View Users Bookings</h1>
        <p className="font-medium text-gray-700 text-sm my-1">Here, you may find the reservations that users had placed.<br/>
        The Scheduler Calendar will display all related information of a reservation, you may view 3 summary card of:<br/>
        "<span className="font-semibold text-green-700">Upcoming</span>", "<span className="font-semibold text-blue-700">Today</span>" and "
        <span className="font-semibold text-red-700">Cancel</span>
        ", for a quick info of the reservations.</p>
      </div>

      <Calendar data={bookingDatas} role={role}/>

      <div className="container max-w-[80%] mx-auto my-5 grid grid-cols-3">

        <div className="bg-green-100 container rounded-md shadow-lg p-3 border-t-8 border-t-green-600 max-h-96">
          <h4 className="text-blue-950 text-lg font-medium mb-2">Upcoming Reservations</h4>
          <div className="flex flex-col overflow-auto">
            {upComings.length > 0 ? (
              upComings.map((upComing) => (
                <div key={upComing.bookingId} className="rounded-md bg-white border-[1px] border-green-400 my-2 text-xs text-gray-700 p-2">
                  <div className="flex flex-row justify-between font-medium my-1">
                    <h1>{upComing.user.fullname}</h1>
                    <h1 className="text-[10px]">+6{upComing.user.phoneNum}</h1>
                  </div>
                  <h1 className="text-[18px] text-gray-700 font-semibold my-1">{upComing.place.placeName}</h1>
                  <span className="my-1 text-blue-900 font-medium">{upComing.date.toLocaleDateString()}, {upComing.startTime.toLocaleTimeString()} - {upComing.endTime.toLocaleTimeString()}
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
        
      </div>
    </div>
  )
}

export default BookingPageAdmin