import { auth } from "@/auth";
import RoomCard from "@/components/room-card";
import Link from "next/link";

const RoomsPage = async () => {

    const session = await auth();
    const role = session?.user.role;

  return (
    <>
        <div className="flex flex-row mx-auto max-w-[80%] mt-10 items-center justify-between h-16">
            <div>
                <h1 className="font-bold text-xl text-blue-950">Room/Place</h1>
                <p className="text-gray-600 text-sm font-medium">View all the room and place that are in the system.<br/>
                More room can be added</p>
            </div>
            <div className="h-full">
                <Link href="/admin/rooms/add">
                    <button className="font-semibold text-sm p-1 rounded-md 
                     border-2 bg-blue-400 text-white border-blue-400
                    transition-all shadow-md h-full
                    hover:scale-110 active:scale-95">Add New</button>
                </Link>
            </div>
        </div>

        <RoomCard role={role}/>


    </>
    
  )
}

export default RoomsPage