import Calendar from "@/components/calendar";
import {prisma} from "../../../lib/prisma"
import { auth } from "@/auth";

const BookingPageAdmin = async () => {

  const session = await auth();
  const role = session?.user.role;

  const today = new Date();
  const todayDate = today.toISOString()
  //console.log(todayDate);

  try {
    await prisma.booking.updateMany({
      where: {
        date: {lt: todayDate}
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

  return (
    <div className="w-full h-full">
        <Calendar data={bookingDatas} role={role}/>
    </div>
  )
}

export default BookingPageAdmin