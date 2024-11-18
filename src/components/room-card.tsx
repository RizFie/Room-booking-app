import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { MdMeetingRoom } from "react-icons/md";

interface prop {
    role: string | undefined
}

const RoomCard = async ({role}: prop) => {

    const places = await prisma.place.findMany({
        include: {
            picture: true,
        }
    });

    //console.log("Retrieved Places: ",places);

  return (
    <div className="mx-auto max-w-[80%] mb-10 mt-6 flex justify-between flex-wrap">
        {places.map( (place) => (
            <div key={place.placeId} className="bg-white rounded-xl shadow-[0px_4px_54px_-18px_#73a8ff] hover:scale-110 
            hover:shadow-[0px_4px_63px_-12px_#5e9bff] transition-all max-w-[320px]">

                {place.picture.length > 0 && (
                    <div className="container rounded-xl rounded-b-none w-[320px] h-[169px] overflow-hidden">
                        <Image
                            priority
                            src={place.picture[0].picLink}
                            width={320}
                            height={169}
                            alt="Room Picture"
                            className="w-[320px] h-[169px] rounded-xl rounded-b-none object-cover"
                        />
                    </div>
                )}
                
                <div className="w-full p-3 pb-0">
                    <h1 className="text-lg font-bold text-blue-950 border-l-2 border-l-blue-900 p-1 bg-blue-50 rounded-md rounded-l-none">{place.placeName}</h1>
                    <p className="text-sm font-normal text-gray-700 mt-2 text-justify">{place.placeDesc}</p>
                </div>
                
                
                <div className="flex justify-between">
                    <div className="w-auto flex flex-row p-3 gap-1">
                        <div className="text-sm font-semibold text-left p-2 flex flex-row items-center border-2 border-gray-500 justify-center">
                            <MdMeetingRoom className="text-gray-500 scale-150 m-1"/>
                            <p className="text-gray-500">{place.placeType}</p>
                        </div>
                        
                        <div className="text-sm font-semibold text-left p-2 flex flex-row items-center border-2 border-gray-500 justify-center">
                            <h3 className="text-white font-bold">Capacity:</h3>
                            <p className="text-white text-xs">{place.placeCapacity} people</p>
                        </div>
                    </div>

                    { role == "admin" ? (
                        <div className="flex flex-col flex-3 w-[84px] p-3 items-center justify-center">
                        <Link className="w-full h-full" href={`/admin/places/${place.placeId}`}>
                            <button className="w-full h-full rounded-lg bg-blue-500 hover:bg-blue-700 
                            transition-all text-white active:scale-90 shadow-md">Edit</button>
                        </Link> 
                        </div>
                    ) : (
                        <div className="flex flex-col flex-3 w-[84px] p-3 items-center justify-center">
                        <Link className="w-full h-full" href={`/main/reserve/${place.placeId}`}>
                            <button className="w-full h-full rounded-lg bg-blue-500 hover:bg-blue-700 
                            transition-all text-white active:scale-90">Book</button>
                        </Link> 
                        </div>
                    )}
                    

                </div>
            </div>
        ))}
    </div>
  )
}

export default RoomCard