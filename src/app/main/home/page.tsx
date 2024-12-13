import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { FaBook } from "react-icons/fa";
import { TiTickOutline } from "react-icons/ti";
import { MdLibraryBooks } from "react-icons/md";

const Home = async () => {
  const today = new Date();
  const session = await auth();
  const fullname = session?.user.name;
  const userId = session?.user.id;
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = dayNames[today.getDay()];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", 'September', 'October', 'November', 'December'];
  const month = monthNames[today.getMonth()];

  const allBooking = await prisma.booking.findMany({
    where: { userId: userId},
    include: { place: true }
  });

  const bookingNum = await prisma.booking.count({
    where: { userId: userId}
  });

  const activeBookingNum = await prisma.booking.count({
    where: { userId: userId, cancel: false, past: false}
  });

  const pastBookingNum = await prisma.booking.count({
    where: { userId: userId, past: true}
  });

  return (
    <div className="grid grid-rows-2 my-10 mx-auto max-w-[80%]">
      
      <div>
        <h1 className="text-2xl font-semibold mb-2 animate-fade-right animate-duration-[1100ms] animate-ease-linear
        text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-300">Welcome,</h1>
        <h1 className="text-3xl font-bold animate-fade-left animate-duration-[1300ms] animate-ease-linear
        text-transparent bg-clip-text bg-gradient-to-tr from-blue-900 to-blue-600">{fullname}</h1>
      </div>

      <div className="w-auto items-center h-8 py-3 my-1 text-blue-950">
        <h3 className="text-sm font-semibold">{day}, {today.toLocaleDateString("en-MY")}</h3>

        <div className="bg-white rounded shadow-sm grid w-full grid-cols-3 mt-8 mb-4 p-2 justify-evenly gap-2">
          <div className="flex flex-row gap-4 items-center justify-center p-1
          bg-gray-100 rounded-sm rounded-r-none animate-fade animate-once animate-duration-[1400ms] animate-ease-linear">
              <FaBook className="w-[35px] h-[35px]"/>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">Total Reservations</h3>
                <h3 className="text-xl font-bold">{bookingNum}</h3>
              </div>
          </div>

          <div className="flex flex-row gap-4 items-center justify-center p-1
          bg-gray-100 rounded-sm rounded-r-none animate-fade animate-once animate-duration-[1600ms] animate-ease-linear">
              <MdLibraryBooks className="w-[35px] h-[35px]"/>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">Active Reservations</h3>
                <h3 className="text-xl font-bold">{activeBookingNum}</h3>
              </div>
          </div>

          <div className="flex flex-row gap-4 items-center justify-center p-1
          bg-gray-100 rounded-sm animate-fade animate-once animate-duration-[1800ms] animate-ease-linear">
              <TiTickOutline className="w-[35px] h-[35px] scale-125"/>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">Past Reservations</h3>
                <h3 className="text-xl font-bold">{pastBookingNum}</h3>
              </div>
          </div>
        </div>

        <div className="bg-white p-4 mb-4 container rounded-md shadow-sm w-[65%]">
          <h2 className="text-lg font-semibold mb-2">Your Reservations</h2>
          <div className="overflow-auto mt-3">
            <table className="w-full border-collapse border-spacing-2 text-sm rounded-md overflow-auto max-h-[171px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left border-r-[1.4px] border-r-gray-200 pl-2 py-2">Place</th>
                  <th className="text-left border-r-[1.4px] border-r-gray-200 pl-2 py-2">Created At</th>
                  <th className="text-left border-r-[1.4px] border-r-gray-200 pl-2 py-2">Reserved date</th>
                  <th className="text-left pl-2 py-2">Confirmed</th>
                </tr>
              </thead>
              
              <tbody>
                {allBooking.map((booking) => (
                  <tr key={booking.bookingId} className="border-t-[1px] border-t-gray-200">
                    <td className="border-r-[1.4px] border-r-gray-200 pl-2 py-2">{booking.place.placeName}</td>
                    <td className="border-r-[1.4px] border-r-gray-200 pl-2 py-2">{booking.createdAt.toLocaleDateString("en-MY")}</td>
                    <td className="border-r-[1.4px] border-r-gray-200 pl-2 py-2">{booking.date.toLocaleDateString("en-MY")}</td>
                    <td className="pl-2">{booking.confirm ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Home