
import { auth } from "@/auth"
import ProfileForm from "@/components/profile-form"
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import illustration from "../../../../public/illustration/iilustration_1.png"

const ProfilePage = async () => {

    const session = await auth();
    const userId = session?.user.id;
    const role = session?.user.role;
    //console.log("returned from session user id:",userId);

    const userData = await prisma.user.findUnique({
        where: {userId: userId}
    });

  return (
    <div className="grid grid-cols-2 bg-white mx-auto max-w-[80%] my-10 rounded-lg shadow-lg
    animate-fade-down animate-once animate-duration-[1000ms] animate-ease-out animate-alternate
    max-sm:flex max-sm:flex-col">

      <div className="p-5">
        <div className="flex flex-row justify-between border-b-blue-200 border-b-[1px]">
          <div className="flex-2">
            <h1 className="font-bold text-xl text-blue-950">My Profile</h1>
            <p className=" pb-2 max-sm:text-[12px]
            text-sm font-medium text-gray-700">You may edit your account information here</p>
          </div>
          <div className="w-[30%] text-right ml-3">
            <label
                htmlFor="fullname"
                className="text-sm font-medium text-gray-600"
              >
                Created At
            </label>
            <p className="text-sm font-semibold">{userData?.createdAt.toLocaleDateString()}</p>
          </div>
        </div>
        <ProfileForm sessionRole={role} userData={userData}/>
      </div>

      <div id="innerBg" className="rounded-r-lg w-full h-auto max-sm:order-first max-sm:rounded-t-lg max-sm:rounded-b-none">
        <div className="container w-full h-full">
          <Image className="object-contain w-full h-full" src={illustration} alt={"illustration"}/>
        </div>
      </div> 
    </div>
  )
}

export default ProfilePage