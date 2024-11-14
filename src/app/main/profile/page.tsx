
import { auth } from "@/auth"
import ProfileForm from "@/components/profile-form"
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import illustration from "../../../../public/illustration/iilustration_1.png"

const ProfilePage = async () => {

    const session = await auth();
    const userId = session?.user.id;
    //console.log("returned from session user id:",userId);

    const userData = await prisma.user.findUnique({
        where: {userId: userId}
    });

  return (
    <div className="grid grid-cols-2 bg-white mx-auto max-w-[80%] my-10 rounded-lg shadow-[0px_4px_54px_-18px_#73a8ff]">
      <div className="p-5">
        <h1 className="font-bold text-xl text-blue-950">My Profile</h1>
        <p className="border-b-blue-200 border-b-2 pb-2 text-sm font-medium text-gray-700 mt-2">You may edit your account information here</p>
        <ProfileForm userData={userData}/>
      </div>
      <div id="innerBg" className="rounded-r-lg w-full h-auto">
        <div className="container w-full h-full">
          <Image className="object-contain w-full h-full" src={illustration} alt={"illustration"}/>
        </div>
      </div> 
    </div>
    
  )
}

export default ProfilePage