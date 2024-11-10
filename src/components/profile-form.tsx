"use client"

import React, { useEffect } from 'react'
import { userDataType } from '@/lib/types/types'
import { useActionState } from 'react'
import { updateProfile } from '@/lib/action'
import toast from 'react-hot-toast'

interface ProfileFormProps {
    userData: userDataType
}

const ProfileForm = ({userData}: ProfileFormProps) => {

    console.log("prop id:",userData?.userId);

    if(!userData?.userId){
        throw Error("User ID is invalid");
    }

    const updateProfileWithId = updateProfile.bind(null,userData.userId);
    const [state, formAction] = useActionState(updateProfileWithId,null);

    useEffect(() => {
        if(state?.code == 200){
            toast.success(state.message);
            state.code = 0;
        }
        else if(state?.code == 500){
            toast.error(state?.message);
            state.code = 0;
        }
    },[state?.message]);

  return (
    <div className='flex flex-col'>
        <form action={formAction}>
            
            <div className="mt-4">
                <label htmlFor="fullname" className="block mb-2 text-md font-medium text-gray-600">Full Name</label>
                <input defaultValue={userData?.fullname} id="fullname" type="text" name="fullname" className="p-1 text-sm bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
                <div aria-live="polite" aria-atomic="true">
                    <span className="text-sm text-red-500">{state?.error?.fullname}</span>
                </div>
            </div>

            <div className="mt-4">
                <label htmlFor="email" className=" block mb-2 text-md font-medium text-gray-600">Email</label>
                <input defaultValue={userData?.email} id="email" type="email" name="email" className="p-1 text-sm bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
                <div aria-live="polite" aria-atomic="true">
                    <span className=" text-sm text-red-500 mt-2">{state?.error?.email}</span>
                </div>
            </div>

            <div className="mt-4">
                <label htmlFor="phone" className=" block mb-2 text-md font-medium text-gray-600">Phone Number</label>
                <input defaultValue={userData?.phoneNum} id="phone" type="tel" name="phone" className="p-1 text-sm bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
                <div aria-live="polite" aria-atomic="true">
                    <span className=" text-sm text-red-500 mt-2">{state?.error?.phone}</span>
                </div>
            </div>

            <button type='submit' className='my-6 bg-blue-500 p-2 w-full mx-auto rounded-xl text-lg text-white font-semibold hover:border-blue-950 hover:bg-green-500'>Update</button>

        </form>
    </div>
    
  )
}

export default ProfileForm