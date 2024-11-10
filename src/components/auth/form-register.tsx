"use client"

import Link from "next/link"
import { signUpCredentials } from "@/lib/action"
import toast from "react-hot-toast"
import { useActionState, useEffect} from "react"
import { redirect } from "next/navigation"


const FormRegister = () => {

    const [state, formAction] = useActionState(signUpCredentials, null);

    //useEffect to monitor changes of code returned from formAction 
    useEffect(() => {
        if(state?.code == 500){
            toast.error(state.message);
            state.code = 0;
        }
        else if((state?.code == 200)){
          toast.success(state.message);
          state.code = 0;
          redirect("/login");
        }
    },[state?.code]);

  return (
    
    <form action={formAction} className="mt-4 mb-4">

        <div className="mt-4">
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

        <button type="submit" className="mt-4 w-full text-center text-white font-medium bg-blue-600 p-1 rounded-lg uppercase hover:bg-blue-800">Register</button>
        <p className="text-sm text-gray-600 mt-2">Already have an account? <Link className="font-semibold text-blue-600" href="/login">Sign In here</Link> </p>
    </form>
    )
}

export default FormRegister