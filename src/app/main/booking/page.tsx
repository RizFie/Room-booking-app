import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

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

        <div className="container flex flex-row mt-7 overflow-auto">
            {userBookings.map((booking) => (
                <div key={booking.bookingId} className="bg-white max-w-[250px] rounded-md shadow-md">
                    <h1 className="font-semibold text-lg my-0 py-2 bg-gradient-to-r from-purple-800 to-red-700 w-full 
                    text-slate-100 px-2 rounded-t-md">
                    {booking.place.placeName}
                    </h1>
                    <h2>{booking.purpose}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default BookingPage