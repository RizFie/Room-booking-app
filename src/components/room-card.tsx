import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { MdMeetingRoom } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";

interface prop {
    role: string | undefined
}

const RoomCard = async ({role}: prop) => {

    const places = await prisma.place.findMany({
        include: {
            picture: true,
        }
    });

    let justify;
    if(role=="admin"){
        justify = "justify-left";
    } else if(role == "user"){
        justify = "justify-center";
    }

    //console.log("Retrieved Places: ",places);
    //shadow-[0px_4px_54px_-18px_#73a8ff]

  return (
    <div className={`mx-auto max-w-[80%] mt-5 mb-10 flex gap-7 ${justify} flex-wrap`}>
        {places.map( (place) => (
            <div key={place.placeId} className="bg-gradient-to-t from-gray-50 to-white rounded-xl shadow-2xl hover:scale-105 
            hover:shadow-[0px_1px_26px_-3px_#4073ff] transition-all max-w-[320px] max-h-[483px] h-[483px]
            animate-fade-up animate-once animate-ease-in animate-alternate">

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
                
                <div className="w-full p-3 pb-0 text-ellipsis">
                    <h1 className="text-xl font-bold text-blue-950 border-l-4 border-l-blue-900 p-1 bg-blue-50 rounded-md rounded-l-none">{place.placeName}</h1>
                    <p className="text-sm font-medium text-gray-700 mt-2 text-justify mb-2 max-h-[140px] min-h-[140px]">{place.placeDesc}</p>
                </div>
                
                
                <div className="flex justify-between border-t-[2px]">
                    <div className="w-auto flex flex-row p-3 gap-1">
                        <div>
                            <div className="font-semibold text-left flex flex-row items-center justify-left gap-2">
                                <MdMeetingRoom className="text-blue-950 scale-[1.5] m-1"/>
                                <p className="text-blue-950">{place.placeType}</p>
                            </div>
                            
                            <div className="font-semibold text-left flex flex-row items-center justify-left gap-2 mt-1">
                                <IoIosPeople className="text-blue-950 scale-[1.5] m-1"/>
                                <p className="text-blue-950">{place.placeCapacity} people</p>
                            </div>
                        </div>
                    </div>

                    { role == "admin" ? (
                        <div className="flex flex-col flex-3 h-auto w-[80px] p-3 items-center justify-center aspect-square">
                        <Link className="w-full h-full" href={`/admin/places/${place.placeId}`}>
                            <button className="w-full h-full rounded-lg bg-blue-500 hover:bg-blue-800
                            transition-all text-white active:scale-75 font-semibold">Edit</button>
                        </Link> 
                        </div>
                    ) : (
                        <div className="flex flex-col flex-3 h-auto w-[80px] p-3 items-center justify-center aspect-square">
                        <Link className="w-full h-full" href={`/main/reserve/${place.placeId}`}>
                            <button className="w-full h-full rounded-lg bg-blue-500 hover:bg-blue-800
                            transition-all text-white active:scale-75 font-semibold hover:shadow-md">Book</button>
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