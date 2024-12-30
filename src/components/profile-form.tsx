"use client"

import React, { useEffect, useState, } from 'react'
import { useRouter } from 'next/navigation'
import { userDataType } from '@/lib/types/types'
import { useActionState } from 'react'
import { updateProfile } from '@/lib/action'
import toast from 'react-hot-toast'
import { MdEmail } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { FaPhone, FaLock, FaLockOpen } from "react-icons/fa6";

interface ProfileFormProps {
    userData: userDataType;
    sessionRole: string | undefined;
}

const ProfileForm = ({userData, sessionRole}: ProfileFormProps ) => {

    const [open, setOpen] = useState<boolean>(false);
    const [disable, setDisable] = useState<boolean>(true);
    const router = useRouter();

    const handleOpen = () => {
      setOpen(!open);
      setDisable(!disable)
    }

    console.log("prop id:",userData?.userId);

    if(!userData?.userId){
        throw Error("User ID is invalid");
    }

    const updateProfileWithId = updateProfile.bind(null,userData.userId);
    const [state, formAction] = useActionState(updateProfileWithId,null);

    useEffect(() => {
        if(state?.code == 200){
            toast.success(state.message, {duration: 2000});
            state.code = 0;

        }
        else if(state?.code == 500){
            toast.error(state?.message);
            state.code = 0;
        }
    },[state?.message]);

  return (
    <div className="flex flex-col">
      <form action={formAction}>
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <label
              htmlFor="fullname"
              className="text-md font-medium text-gray-600 mr-2"
            >
              Full Name
            </label>
            <IoPersonCircle className="text-gray-600 scale-125" />
          </div>
          <input
            disabled={disable}
            defaultValue={userData?.fullname}
            id="fullname"
            type="text"
            name="fullname"
            className="shadow-sm border-[1px] border-gray-200 p-2 text-sm rounded-md text-gray-800 w-full focus:outline-blue-400"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500">
              {state?.error?.fullname}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center mb-2">
            <label
              htmlFor="email"
              className="text-md font-medium text-gray-600 mr-2"
            >
              Email
            </label>
            <MdEmail className="text-gray-600" />
          </div>
          <input
            disabled={disable}
            defaultValue={userData?.email}
            id="email"
            type="email"
            name="email"
            className="shadow-sm border-[1px] border-gray-200 p-2 text-sm rounded-md text-gray-800 w-full focus:outline-blue-400"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {state?.error?.email}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center mb-2">
            <label
              htmlFor="phone"
              className="text-md font-medium text-gray-600 mr-2"
            >
              Phone Number
            </label>
            <FaPhone className="text-gray-600 scale-95" />
          </div>
          <input
            disabled={disable}
            defaultValue={userData?.phoneNum}
            id="phone"
            type="tel"
            name="phone"
            className="shadow-sm border-[1px] border-gray-200 p-2 text-sm rounded-md text-gray-800 w-full focus:outline-blue-400"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {state?.error?.phone}
            </span>
          </div>
        </div>

        {sessionRole == "admin" ? (
          <div className="mt-4">
            <div className="flex items-center mb-2">
              <label
                htmlFor="role"
                className="text-md font-medium text-gray-600 mr-2"
              >
                Role
              </label>
              <IoPersonCircle className="text-gray-600 scale-125" />
            </div>
            <select
              disabled={disable}
              defaultValue={userData?.role}
              id="role"
              name="role"
              required
              className="shadow-sm border-[1px] border-gray-200 p-2 text-sm rounded-md text-gray-800 w-full focus:outline-blue-400"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500">
                {state?.error?.role}
              </span>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div className='grid grid-cols-2 gap-3'>
          {open == false ? (
            <button onClick={handleOpen} type='button' className="my-6 bg-red-300 p-2 w-full mx-auto rounded-xl text-lg text-red-700 font-semibold 
            flex items-center justify-center gap-2 hover:bg-red-700 hover:text-white active:scale-95 transition-all">
              <FaLock />
              Edit Profile
            </button>
          ) : (
            <button onClick={handleOpen} type='button' className="my-6 bg-green-300 p-2 w-full mx-auto rounded-xl text-lg transition-all
            active:scale-95 text-green-700 font-semibold flex items-center justify-center gap-2 hover:bg-green-700 hover:text-white">
              <FaLockOpen />
              Edit Profile
            </button>
          )}
          
          { disable==true ? (
            <button
            disabled={disable}
            type="submit"
            className="my-6 bg-gray-400 p-2 w-full mx-auto rounded-xl text-lg text-gray-700 font-semibold transition-all"
          >
            Update
          </button>
          ) : (
          <button
            disabled={disable}
            type="submit"
            className="my-6 bg-blue-500 p-2 w-full mx-auto rounded-xl text-lg text-white font-semibold transition-all 
            hover:bg-blue-700 active:scale-95"
          >
            Update
          </button>
          )}
        </div>
        
      </form>
    </div>
  );
}

export default ProfileForm