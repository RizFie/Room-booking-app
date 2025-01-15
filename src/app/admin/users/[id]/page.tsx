import { auth } from "@/auth";
import ProfileForm from "@/components/profile-form";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

const EditUser = async ({ params }: { params: Promise<{ id: string }> }) => {

    const session = await auth();
    const role = session?.user.role;
    const id = (await params).id;

    const userData = await prisma.user.findUnique({
      where: {userId: id},
  });

  return (
    <div className="mx-auto max-w-[80%] mt-10 bg-white shadow-sm p-4 mb-5 rounded-md">
      <h1 className="font-bold text-3xl text-blue-950">User Edit Page</h1>
      <p className="text-gray-600 text-sm font-medium">You may only edit the user full name, email and phone number. </p>
      <ProfileForm userData={userData} sessionRole={role}/>
      <Link href="/admin/users">
        <button type="submit" className="w-[10%] text-center text-gray-500 hover:text-blue-800 font-medium 
        p-1 rounded-lg border-[1px] active:scale-95 transition-all flex flex-row gap-2 items-center
        bg-gray-300 hover:bg-blue-400"><IoIosArrowBack/>Back</button>
      </Link>
    </div>
  )
}

export default EditUser