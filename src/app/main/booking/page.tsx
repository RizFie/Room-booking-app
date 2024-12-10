import { auth } from "@/auth";
import CancelButton from "@/components/cancel-booking-button";
import { prisma } from "@/lib/prisma";
import { MdDateRange, MdOutlineAccessTimeFilled } from "react-icons/md";

const BookingPage = async () => {

    const session = await auth();
    const userId = session?.user.userId;

    const userBookings = await prisma.booking.findMany({
        where: {
            userId: userId
        },
        include: {
            place: true,
        }
    });

    //console.log(userBookings);

  return (
    <div className="max-w-[80%] mx-auto mt-10 text-blue-950">
        <h1 className="text-3xl font-bold animate-fade-right animate-once animate-ease-out mb-3">Booking</h1>
        <span className="text-sm font-medium bg-gray-200 p-2 bg-opacity-75">You may view your reservation details here,
        page refresh will happen if the admin <b>confirm</b> or <b>cancel</b> your reservation.</span>

        <div className="container flex flex-row my-7 flex-wrap gap-7">
            {userBookings.map((booking) => (
                <div key={booking.bookingId} className="bg-white max-w-[270px] h-[373px] rounded-md shadow-md hover:scale-105 transition-all">
                    <h1 className="font-semibold text-lg my-0 pt-2 pb-1 bg-gradient-to-r from-purple-800 to-red-700 w-full 
                    text-slate-100 px-2 rounded-t-md">
                    {booking.place.placeName}</h1>
                    <div className="text-sm mx-4 my-2 font-bold h-5 flex flex-row gap-3 justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <MdDateRange/>
                            <h2>{booking.date.toLocaleDateString()}</h2>
                        </div>
                        {booking.confirm ? (
                            <div className="bg-green-500 text-white p-1 rounded-md text-xs text-center w-[70] flex items-center justify-center">
                                <h3>Confirmed</h3>
                            </div>
                        ) : (
                            <div className="bg-red-500 text-white p-1 rounded-md text-xs text-center w-16 flex items-center justify-center">
                                <h3>Pending</h3>
                            </div>
                        )}
                    </div>
                    <div className="text-sm m-4 mt-1 mb-2 font-bold flex flex-row items-center gap-2 h-5">
                        <MdOutlineAccessTimeFilled/>
                        <h2>{booking.startTime.toLocaleTimeString()} - {booking.endTime.toLocaleTimeString()}</h2>
                    </div>
                    <div className="p-2 pt-0 text-[14px] w-full">
                        <h3 className="font-semibold bg-gray-100 p-1 my-1">Purpose/Agenda</h3>
                        <h2 className="text-justify p-2 text-sm rounded-md bg-gray-100 shadow-inner h-[156px]">{booking.purpose}</h2>
                    </div>

                    {booking.cancel ? (
                        <div className="bg-red-700 text-white mx-2 mt-2 p-1 rounded-md text-xs text-center w-16 flex items-center justify-center">
                            <h3>Cancelled</h3>
                        </div>
                    ) : (
                        <CancelButton bookingId={booking.bookingId}/>
                    )}
                </div>
            ))}
        </div>
    </div>
  )
}

export default BookingPage