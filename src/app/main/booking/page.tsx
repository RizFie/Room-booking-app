import AllBookingCard from "@/components/bookings/allBookingCard"
import CancelBookingCard from "@/components/bookings/cancelBookingCard"

const BookingPage = async () => {

    //console.log(userBookings);

  return (
    <div className="max-w-[80%] mx-auto mt-10 text-blue-950">
        <h1 className="text-3xl font-bold animate-fade-right animate-once animate-ease-out mb-3">Booking</h1>
        <span className="text-sm font-medium bg-gray-200 p-2 bg-opacity-75">You may view your reservation details here,
        page refresh will happen if the admin <b>confirm</b> or <b>cancel</b> your reservation.</span>

        <h3 className="mt-10 text-lg font-semibold w-36 bg-gray-200 text-center rounded-sm">All reservation</h3>
        <AllBookingCard/>

        <h3 className="mt-10 text-lg font-semibold w-52 bg-red-200 text-center rounded-sm text-red-700">Cancelled reservation</h3>
        <CancelBookingCard/>

    </div>
  )
}

export default BookingPage