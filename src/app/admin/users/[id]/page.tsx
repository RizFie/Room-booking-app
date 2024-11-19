import ProfileForm from "@/components/profile-form";
import { prisma } from "@/lib/prisma";
import Link from "next/link";


const EditUser = async ({ params }: { params: { id: string } }) => {

    const {id} = await params;

    const userData = await prisma.user.findUnique({
      where: {userId: id}
  });

  return (
    <>
      <div className="mx-auto max-w-[80%] mt-10">
        <h1 className="font-bold text-3xl text-blue-950">User Edit Page</h1>
        <p className="text-gray-600 text-sm font-medium">You may only edit the user full name, email and phone number. </p>
      </div>

      <div className="bg-white shadow-[0px_4px_54px_-18px_#73a8ff] mx-auto max-w-[80%] my-3 p-4 rounded-md">
        <ProfileForm userData={userData}/>
        <Link href="/admin/users">
          <button type="submit" className="w-full text-center text-gray-500 border-gray-500 hover:text-gray-800 font-medium 
          bg-white p-1 rounded-lg uppercase hover:border-gray-950 border-2 active:scale-95 transition-all">Back</button>
        </Link>
      </div>
    </>
    
  )
}

export default EditUser