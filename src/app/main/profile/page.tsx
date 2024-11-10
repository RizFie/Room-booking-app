
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
    <div className="bg-white shadow-md mx-auto max-w-[90%] p-3 my-10 rounded-lg">
        Profile Page
        <ProfileForm userData={userData}/>
    </div>
    
  )
}

export default ProfilePage