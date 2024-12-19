"use client"

import Link from "next/link"
import Image from "next/image"
import logoEtempah from "../../public/logo/etempah.png"
import SignOut from "@/lib/action"
import { usePathname } from "next/navigation"
import logoMdr from "../../public/logo/Mdr.svg"
import { useRef, useTransition } from "react"
import exclamation from "../../public/icons/exclamation.png"
import { useFormStatus } from "react-dom"

interface User {
  name: string | undefined
  role: string | undefined
}

const Navbar = ({name, role}: User) => {

  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await SignOut();
    })
  }

  const {pending} = useFormStatus();
  //console.log(pending);

  const pathname = usePathname();

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleOpen = () => {
    dialogRef.current?.showModal();
  }

  const handleClose = () => {
    dialogRef.current?.close();
  }

  return (
    <nav className="bg-white border-b-2 border-blue-700 shadow-[0px_4px_21px_0px_rgba(59,_130,_246,_0.5)]
    animate-fade-down animate-ease-in-out">
      <div className="max-w-full flex items-center justify-between p-2">

        {/*Item 1*/}
          <div className="flex-0 container w-[180px] h-[60px] overflow-hidden flex justify-center ">
            <Image
              src={logoEtempah}
              alt="e-tempah"
              className="object-cover w-full h-auto"
              priority
            />
          </div>
          <div className="flex-0 container w-[60px] h-[60px] flex justify-center ">
            <Image
              src={logoMdr}
              alt="Logo Majlis Daerah Raub"
              className="w-full h-auto scale-[1.7]"
              priority
            />
          </div>

        {/*Item 2*/}
        <ul className="flex-1 justify-center flex items-center gap-6 font-bold text-blue-950 py-1">
          <li id="li1" className={`hover:cursor-pointer hover:text-blue-400 transition-all ${pathname.startsWith("/main/home") ? "text-blue-800" : ""}`}>
            <Link href="/main/home">Home</Link>
          </li>
          <li id="li2" className={`hover:cursor-pointer hover:text-blue-400 transition-all ${pathname.startsWith("/main/reserve") ? "text-blue-800" : ""}`}>
            <Link href="/main/reserve">Reserve</Link>
          </li>
          <li id="li3" className={`hover:cursor-pointer hover:text-blue-400 transition-all ${pathname.startsWith("/main/booking") ? "text-blue-800" : ""}`}>
            <Link href="/main/booking">Booking</Link>
          </li>
          <li id="li4" className={`hover:cursor-pointer hover:text-blue-400 transition-all ${pathname.startsWith("/main/profile") ? "text-blue-800" : ""}`}>
            <Link href="/main/profile">Profile</Link>
          </li>
        </ul>

        {/*Item 3 LOGOUT BUTTON*/}
        <div className="flex-2 justify-end flex items-center text-blue-950 py-1 gap-3 min-w-[240px]">

          <div className="flex flex-col justify-self-center text-blue-950 text-right border-r-2 pr-2 border-gray-300">
            <h2 className="flex-0 font-bold">{name}</h2>
            <h2 className="flex-1 font-semibold text-gray-800">{role}</h2>
          </div>

        <button onClick={handleOpen} className="border-2 border-red-500 text-red-500 transition-all text-base font-medium px-2 py-1 
        rounded-md hover:bg-red-600 hover:text-white active:scale-95">Logout</button>

        </div>
        
      </div>

      <dialog id="dialog" ref={dialogRef} className="bg-white rounded-lg shadow w-[500px] h-[460px] backdrop:backdrop-blur-md">
        <div className="container w-[160px] h-[160px] mt-9 mx-auto">
          <Image src={exclamation} alt={"exclamation mark"} className="object-contain w-auto h-[160px]"/>
        </div>
        <div className="my-6">
          <h1 className="font-bold text-3xl text-center mb-3 mt-0">Hang On a Sec!</h1>
          <h2 className="font-semibold text-center mb-6 text-gray-700">Are you sure you want to log out?<br/>
          Have you made a reservation yet?
          </h2>
          <div className="grid grid-flow-col justify-evenly">
            <form action={SignOut}>
              <button onClick={handleLogout} type="submit" className="border-red-500 border-2 bg-red-500 p-5 w-36 text-white 
              font-semibold rounded-xl hover:bg-red-700 active:scale-95 transition-all h-[87.4]" disabled={isPending}>
                {isPending ? "Logging out..." : "Logout"}
              </button>
            </form>
            <button onClick={handleClose} className="border-gray-400 border-2 p-5 w-36 text-gray-500 font-semibold rounded-xl 
            hover:border-blue-950 hover:text-blue-950 h-[87.4]">Cancel</button>
          </div>
        </div>
      </dialog>
    </nav>
  );
}

export default Navbar