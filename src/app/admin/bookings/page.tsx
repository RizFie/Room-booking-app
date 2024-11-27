import Calendar from "@/components/calendar";
import {prisma} from "../../../lib/prisma"

const BookingPageAdmin = async () => {

    const bookingDatas = await prisma.booking.findMany();

  return (
    <div className="w-full h-full">
        <Calendar data={bookingDatas}/>
    </div>
  )
}

export default BookingPageAdmin