import AllBookingCard from "@/components/bookings/allBookingCard"

const BookingPage = async () => {

    //console.log(userBookings);

  return (
    <div className="max-w-[80%] mx-auto mt-10 text-blue-950">
        <h1 className="text-3xl font-bold animate-fade-right animate-once animate-ease-out mb-3">Booking</h1>
        <span className="text-sm font-medium bg-gray-200 p-2 bg-opacity-75">You may view your reservation details here,
        page refresh will happen if the admin <b>confirm</b> or <b>cancel</b> your reservation.</span>

        <h3 className="mt-10 text-lg font-semibold border-l-2">All booking</h3>
        <AllBookingCard/>
    </div>
  )
}

export default BookingPage