import RoomFormUpdate from "@/components/update-room-form";
import { prisma } from "@/lib/prisma";

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
    <div>
        <h1>{id}</h1>
        <RoomFormUpdate placeData={placeData}/>
    </div>
  )
}

export default EditPlace