"use client"

import Link from "next/link"
import { signUpCredentials } from "@/lib/action"
import { useFormState } from "react-dom"

const FormRegister = () => {

    const [state, formAction] = useFormState(signUpCredentials, null);

  return (
    <form action={formAction} className="mt-4 mb-4">
        <div className="mt-6">
            <label htmlFor="fullname" className="block mb-2 text-md font-medium text-gray-600">Full Name</label>
            <input type="text" name="fullname" className="p-1 text-sm bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
            <div aria-live="polite" aria-atomic="true">
                <span className="text-sm text-red-500">{state?.error?.fullname}</span>
            </div>
        </div>

        <div className="mt-4">
            <label htmlFor="email" className=" block mb-2 text-md font-medium text-gray-600">Email</label>
            <input type="email" name="email" className="p-1 text-sm bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
            <div aria-live="polite" aria-atomic="true">
                <span className=" text-sm text-red-500 mt-2">{state?.error?.email}</span>
            </div>
        </div>

        <div className="mt-4">
            <label htmlFor="phone" className=" block mb-2 text-md font-medium text-gray-600">Phone Number</label>
            <input type="tel" name="phone" className="p-1 text-sm bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
            <div aria-live="polite" aria-atomic="true">
                <span className=" text-sm text-red-500 mt-2">{state?.error?.phone}</span>
            </div>
        </div>

        <div className="mt-4">
            <label htmlFor="department" className=" block mb-2 text-md font-medium text-gray-600">Department</label>
            <input type="text" name="department" className="p-1 text-sm bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
            <div aria-live="polite" aria-atomic="true">
                <span className=" text-sm text-red-500 mt-2">{state?.error?.department}</span>
            </div>
        </div>

        <div className="mt-4">
            <label htmlFor="password" className=" block mb-2 text-md font-medium text-gray-600">Password</label>
            <input type="password" name="password" className="p-1 text-sm bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
            <div aria-live="polite" aria-atomic="true">
                <span className=" text-sm text-red-500 mt-2">{state?.error?.password}</span>
            </div>
        </div>

        <div className="mt-4">
            <label htmlFor="confirmPass" className=" block mb-2 text-md font-medium text-gray-600">Confirm Password</label>
            <input type="password" name="confirmPass" className="p-1 text-sm bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
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