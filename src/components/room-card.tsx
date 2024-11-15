import { prisma } from "@/lib/prisma";
import Image from "next/image";

interface prop {
    role: string | undefined
}

const RoomCard = async (role: prop) => {

    const places = await prisma.place.findMany({
        include: {
            picture: true,
        }
    });

    //console.log("Retrieved Places: ",places);

  return (
    <div className="bg-yellow-100 mx-auto max-w-[80%] mb-10 mt-6 flex justify-between">
        {places.map( (place) => (
            <div key={place.placeId} className="bg-white rounded-xl shadow-[0px_4px_54px_-18px_#73a8ff] hover:scale-110 
            hover:shadow-[0px_4px_63px_-12px_#5e9bff] transition-all w-[300px]">
                <div className="container aspect-video rounded-xl rounded-b-none">
                    {place.picture.map( (singlePic) => (
                        <Image src={singlePic.picLink} height={169} width={300} alt="Room Picture" className="rounded-xl rounded-b-none" priority/>
                    ))}
                </div>

                <div className="w-full p-3 pb-0">
                    <h1 className="text-lg font-bold text-blue-950 border-l-2 border-l-blue-900 p-1 bg-blue-50 rounded-md rounded-l-none">{place.placeName}</h1>
                    <p className="text-sm font-medium text-gray-700 mt-2">{place.placeDesc}</p>
                </div>
                
                <div className="w-auto flex p-3">
                    <div className="text-sm font-semibold border-r-[2px] border-r-blue-800 pr-3 bg-blue-50 p-2 rounded-l-sm">
                        <h3 className="text-blue-800">Place Type</h3>
                        <p className="text-gray-600">{place.placeType}</p>
                    </div>
                    <div className="text-sm font-semibold text-left bg-blue-50 p-2 pl-3 rounded-r-sm">
                        <h3 className="text-blue-800">Capacity</h3>
                        <p className="text-gray-600">{place.placeCapacity} people</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default RoomCard