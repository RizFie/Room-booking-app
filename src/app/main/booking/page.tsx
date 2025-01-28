import { auth } from "@/auth";
import AllBookingCard from "@/components/bookings/allBookingCard"
import { prisma } from "@/lib/prisma";

const BookingPage = async () => {

    const session = await auth();
    const userId = session?.user.id;
    //console.log(userId);

    const userBookings = await prisma.booking.findMany({
        where: {
            userId: userId
        },
        include: {
            place: true,
        },
        orderBy: {
            date: 'desc'
        }
    });

    //console.log(userBookings);

  return (
    <div className="max-w-[80%] mx-auto mt-10 text-blue-950">
        <h1 className="text-3xl font-bold animate-fade-right animate-once animate-ease-out mb-3">Booking</h1>
        <span className="text-sm font-medium bg-gray-200 p-2 bg-opacity-75 max-sm:text-[12px]">You may view your reservation details here.</span>

        <h3 className="mt-10 text-lg font-semibold w-36 bg-blue-200 text-center rounded-sm">All reservation</h3>
        <AllBookingCard userBookings={userBookings}/>

    </div>
  )
}

export default BookingPage