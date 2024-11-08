"use client"

import Link from "next/link"
import { signInCredentials } from "@/lib/action"
import toast from "react-hot-toast"
import { useActionState, useEffect } from "react"


const FormLogin = () => {

    const [state, formAction] = useActionState(signInCredentials, null);

    //useEffect to monitor changes of code returned from formAction 
    useEffect(() => {
        if(state?.message){
            toast.error(state.message);
            state.message = "";
        }
    },[state?.message]);

  return (
    
    <form action={formAction} className="mt-4 mb-4">

        <div className="mt-4">
            <label htmlFor="email" className=" block mb-2 text-md font-medium text-gray-600">Email</label>
            <input id="email" type="email" name="email" className="p-1 text-sm bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
            <div aria-live="polite" aria-atomic="true">
                <span className=" text-sm text-red-500 mt-2">{state?.error?.email}</span>
            </div>
        </div>

        <div className="mt-4">
            <label htmlFor="password" className=" block mb-2 text-md font-medium text-gray-600">Password</label>
            <input id="password" type="password" name="password" className="p-1 text-sm bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
            <div aria-live="polite" aria-atomic="true">
                <span className=" text-sm text-red-500 mt-2">{state?.error?.password}</span>
            </div>
        </div>

        <button type="submit" className="mt-4 w-full text-center text-white font-medium bg-blue-600 p-1 rounded-lg uppercase hover:bg-blue-800">Login</button>
        <p className="text-sm text-gray-600 mt-2">Do not have an account? <Link className="font-semibold text-blue-600" href="/register">Sign Up here</Link> </p>
    </form>
    )
}

export default FormLogin