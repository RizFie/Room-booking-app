"use client"

import Link from "next/link";
import { signUpCredentials } from "@/lib/action";
import toast from "react-hot-toast";
import { useActionState, useEffect} from "react";

const AddNewAcc = () => {

    const [state, formAction] = useActionState(signUpCredentials, null);

    useEffect(() => {
        if(state?.code == 500){
            toast.error(state.message);
            state.code = 0;
        }
        else if((state?.code == 200)){
          toast.success(state.message);
          state.code = 0;
        }
    },[state?.code]);

  return (
    <>
    <div className="mx-auto max-w-[50%] mt-10">
        <h1 className="font-bold text-xl text-blue-950">Add a new user to the system</h1>
    </div>
    <div className="bg-white mx-auto max-w-[50%] mt-4 rounded-lg shadow-[0px_4px_54px_-18px_#73a8ff] p-3">
        <form action={formAction}>
            <div>
                <label htmlFor="fullname" className="block mb-2 text-md font-medium text-gray-600">Full Name</label>
                <input id="fullname" type="text" name="fullname" className="p-1 text-sm bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
                <div aria-live="polite" aria-atomic="true">
                    <span className="text-sm text-red-500">{state?.error?.fullname}</span>
                </div>
            </div>

            <div className="mt-4">
                <label htmlFor="email" className=" block mb-2 text-md font-medium text-gray-600">Email</label>
                <input id="email" type="email" name="email" className="p-1 text-sm bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
                <div aria-live="polite" aria-atomic="true">
                    <span className=" text-sm text-red-500 mt-2">{state?.error?.email}</span>
                </div>
            </div>

            <div className="mt-4">
                <label htmlFor="phone" className=" block mb-2 text-md font-medium text-gray-600">Phone Number</label>
                <input id="phone" type="tel" name="phone" className="p-1 text-sm bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
                <div aria-live="polite" aria-atomic="true">
                    <span className=" text-sm text-red-500 mt-2">{state?.error?.phone}</span>
                </div>
            </div>

            <div className="mt-4">
                <label htmlFor="password" className=" block mb-2 text-md font-medium text-gray-600">Password</label>
                <input id="password" type="password" name="password" className="p-1 text-sm bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
                <div aria-live="polite" aria-atomic="true">
                    <span className=" text-sm text-red-500 mt-2">{state?.error?.password}</span>
                </div>
            </div>

            <div className="mt-4">
                <label htmlFor="confirmPass" className=" block mb-2 text-md font-medium text-gray-600">Confirm Password</label>
                <input id="confirmPass" type="password" name="confirmPass" className="p-1 text-sm bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
                <div aria-live="polite" aria-atomic="true">
                    <span className="text-sm text-red-500 mt-2">{state?.error?.confirmPass}</span>
                </div>
            </div>

            <div className="flex flex-row gap-2">
                <div className="w-[50%]">
                    <button type="submit" className="mt-4 w-full text-center text-white font-medium 
                    bg-blue-600 p-1 rounded-lg uppercase border-blue-600 border-2 hover:bg-blue-800 active:scale-95">Add New</button>
                </div>
                <div className="w-[50%]">
                    <Link href="/admin/users">
                        <button type="submit" className="mt-4 w-full text-center text-gray-500 border-gray-500 hover:text-gray-800 font-medium 
                        bg-white p-1 rounded-lg uppercase hover:border-gray-950 border-2 active:scale-95">Back</button>
                    </Link>
                </div>
            </div>
        
        </form>
    </div>
    </>
    )
}

export default AddNewAcc