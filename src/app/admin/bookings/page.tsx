import Calendar from "@/components/calendar";
import {prisma} from "../../../lib/prisma"
import { auth } from "@/auth";

const BookingPageAdmin = async () => {

  const session = await auth();
  const role = session?.user.role;

    const bookingDatas = await prisma.booking.findMany({
      include: {
        place: true
      }
    });

  return (
    <div className="w-full h-full">
        <Calendar data={bookingDatas} role={role}/>
    </div>
  )
}

export default BookingPageAdmin