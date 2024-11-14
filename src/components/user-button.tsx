"use client"

import { deleteUser, revalidateAdminUsers } from "@/lib/action";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { revalidatePath } from "next/cache";

interface UserButtonProps {
    id: string;
    role: string;
}

const UserButton: React.FC<UserButtonProps> = ({id,role}) => {

    const deleteUserWithId = deleteUser.bind(null,id);

    const [state, formAction] = useActionState(deleteUserWithId,null);

    useEffect(() => {
      if(state?.code == 400){
          toast.error(state.message);
          state.code = 0;
      }
      else if(state?.code == 200){
        toast.success(state?.message);
        state.code = 0;
        const timeoutId = setTimeout(async () => {
          await revalidateAdminUsers();
        }, 2000);
  
        return () => clearTimeout(timeoutId);
      }
    },[state?.code]);

    const router = useRouter();

    const dialogRef = useRef<HTMLDialogElement | null>(null);

    const handleRedirect = () => {
        router.push(`/admin/users/${id}`);
    }

    const handleOpen = () => {
      dialogRef.current?.showModal();
    }
  
    const handleClose = () => {
      dialogRef.current?.close();
    }

  return (
    <>
        { role == "admin" ? (
          <div className="flex flex-col">
            <button onClick={handleRedirect} className="bg-blue-100 text-blue-700 rounded-sm m-1 p-[0.5px] 
            shadow-sm border-blue-700 border-[1.5px] hover:bg-blue-200">Edit</button>
          </div>
        ) : (
          <div className="flex flex-col">
            <button onClick={handleRedirect} className="bg-blue-100 text-blue-700 rounded-sm m-1 p-[0.5px] 
            shadow-sm border-blue-700 border-[1.5px]">Edit</button>
            <button onClick={handleOpen} className="bg-red-100 text-red-700 rounded-sm m-1 p-[0.5px] shadow-sm 
            border-red-700 border-[1.5px] hover:bg-red-200">Delete</button>
          </div>
        )}
        
      


      <dialog id="dialog" ref={dialogRef} className=" bg-white rounded-lg shadow w-[500px] h-[440px] backdrop:backdrop-blur-md">
        <div className="container w-full h-[160px] mt-9">
          
        </div>
        <div className="my-6">
          <h1 className="font-bold text-2xl text-center mb-3 mt-0">Confirm User Account Deletion?</h1>
          <h2 className="font-semibold text-center mb-6 text-gray-700">Are you sure you want to delete the user account?<br/>
          </h2>
          <div className="grid grid-flow-col justify-evenly">
            <form action={formAction}>
              <button onClick={handleClose} type="submit" className="border-red-500 border-2 bg-red-500 p-5 w-36 text-white font-semibold rounded-xl hover:bg-red-700">Delete</button>
            </form>
            <button onClick={handleClose} className="border-gray-400 border-2 p-5 w-36 text-grey-400 font-semibold rounded-xl hover:border-blue-950 hover:text-blue-950">Cancel</button>
          </div>
        </div>
      </dialog>
    </>
    


  )
}

export default UserButton