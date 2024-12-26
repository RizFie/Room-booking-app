import { auth } from "@/auth";
import RoomCard from "@/components/room-card";
import Link from "next/link";
import { FaCircleExclamation } from "react-icons/fa6";

const RoomsPage = async () => {

    const session = await auth();
    const role = session?.user.role;

  return (
    <>
        <div className="flex flex-row mx-auto max-w-[80%] mt-10 items-center justify-between h-auto">
            <div className="flex flex-col">
                <h1 className="font-bold text-3xl text-blue-950 animate-fade-right animate-duration-[1000ms] animate-delay-500">Room/Place</h1>
                <div className="flex gap-2 items-center my-2 border-[1px] p-2 rounded-md bg-blue-100 border-blue-500 z-10
                animate-fade animate-once animate-ease-in animate-normal">
                    <FaCircleExclamation className="text-2xl text-blue-500"/>
                    <p className="text-blue-600 text-sm font-medium">View all the room and place that are in the system.</p>
                </div>
            </div>

            {/* 
            
                <div className="h-full flex flex-col">
                    <div></div>
                    <Link className="" href="/admin/rooms/add">
                        <button className="font-semibold text-sm p-1 rounded-md 
                        border-2 bg-blue-400 text-white border-blue-400
                        transition-all shadow-md h-[40px]
                        hover:scale-110 active:scale-95">Add New</button>
                    </Link>
                </div>
            
            */}
            
        </div>

        <RoomCard role={role}/>


    </>
    
  )
}

export default RoomsPage