"use client"

import Link from "next/link"
import Image from "next/image"
import logoEtempah from "../../public/logo/etempah.png"
import SignOut from "@/lib/action"
import { usePathname } from "next/navigation"
import logoMdr from "../../public/logo/Mdr.svg"

interface User {
  name: string | undefined
  avatar: string | null | undefined
  role: string | undefined
}

const Navbar = ({avatar, name, role}: User) => {

  const pathname = usePathname();

  return (
    <nav className="bg-white border-b-2 border-blue-600 shadow-md">
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
        <ul className="flex-1 justify-center flex items-center gap-6 mr-5 font-bold text-blue-950 py-1">
          <li id="li1" className={`${pathname === "/main/home" ? "text-blue-800" : ""}`}>
            <Link href="/main/home">Home</Link>
          </li>
          <li id="li2" className={`${pathname === "/main/reserve" ? "text-blue-800" : ""}`}>
            <Link href="/main/reserve">Reserve</Link>
          </li>
          <li id="li3" className={`${pathname === "/main/cancel" ? "text-blue-800" : ""}`}>
            <Link href="/main/cancel">Cancel</Link>
          </li>
        </ul>

        {/*Item 3 LOGOUT BUTTON*/}
        <div className="flex-2 justify-end flex items-center text-blue-950 py-1 gap-3">

          <h2 className="font-bold justify-self-center text-blue-950 text-right">
            {name}<br/>
            {role}
          </h2>
          
          <div className="container w-[40px] h-[40px] rounded-full border-blue-700 border-2 ">
            <Image
              src={avatar || "https://i.ibb.co/V3Pd7T3/avatar.png"}
              alt="avatar"
              width={40}
              height={40}
              className="rounded-full"
              priority
            />
          </div>

          <form action={SignOut}>
            <button type="submit" className="border-2 border-red-500 transition-all text-black text-base font-medium px-2 py-1 rounded-md hover:bg-red-600 hover:text-white">Logout</button>
          </form>
        </div>
        
      </div>
    </nav>
  );
}

export default Navbar