import RoomFormUpdate from "@/components/update-room-form";
import { prisma } from "@/lib/prisma";
import { MdModeEditOutline } from "react-icons/md";
import { TbAlertOctagonFilled } from "react-icons/tb";

const EditPlace = async ({ params }: { params: { id: string } }) => {

    const {id} = await params;

    const placeData = await prisma.place.findUnique({
        where: {
            placeId: id,
        },
        include: {
            picture: true,
        }
    })

  return (
    <>
    <div className="mx-auto max-w-[60%] mt-10 border-b-2 pb-3 border-b-blue-400">
        <div className="flex flex-row items-center my-1">
            <h1 className="text-3xl font-bold">Edit Place</h1>
            <MdModeEditOutline className="ml-3 w-[30px] h-[30px]"/>
        </div>
        <div className="p-2 bg-red-100 border-red-400 rounded-md border-2 w-[600px] flex flex-row gap-5 items-center">
            <TbAlertOctagonFilled className="ml-3 w-[26px] h-[26px] text-red-700 scale-150"/>
            <p className="font-semibold text-gray-700
            ">In this page, you may update the places information.<br/>
            However, place picture are not allowed to be changed or updated. <br/>
            </p>
        </div>
        
    </div>
    <RoomFormUpdate placeData={placeData}/>
    </>
  )
}

export default EditPlace