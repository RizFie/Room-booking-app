import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

const RoomsPage = async () => {

    const places = await prisma.place.findMany({
        include: {
            picture: true,
        }
    });

    //console.log("Retrieved Places: ",places);

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

        <div className="bg-yellow-100 mx-auto max-w-[80%] mb-10 mt-6 flex">
            {places.map( (place) => (
                <div key={place.placeId} className="bg-white rounded-xl shadow-[0px_4px_54px_-18px_#73a8ff] hover:scale-110 
                hover:shadow-[0px_4px_63px_-12px_#5e9bff] transition-all">
                    <div className="container aspect-video rounded-xl">
                        {place.picture.map( (singlePic) => (
                            <Image src={singlePic.picLink} height={169} width={300} alt="Room Picture" className="rounded-xl"/>
                        ))}
                    </div>
                </div>
            ))}

            
        </div>
    </>
    
  )
}

export default RoomsPage