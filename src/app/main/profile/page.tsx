
import { auth } from "@/auth"
import ProfileForm from "@/components/profile-form"
import { prisma } from "@/lib/prisma";

const ProfilePage = async () => {

    const session = await auth();
    const userId = session?.user.id;
    //console.log("returned from session user id:",userId);

    const userData = await prisma.user.findUnique({
        where: {userId: userId}
    });

  return (
    <div className="bg-white shadow-md mx-auto max-w-[90%] p-5 my-10 rounded-lg">
        <h1 className="font-bold text-xl border-b-2 border-b-blue-100 pb-2 text-blue-950">My Profile</h1>
        <ProfileForm userData={userData}/>
    </div>
    
  )
}

export default ProfilePage