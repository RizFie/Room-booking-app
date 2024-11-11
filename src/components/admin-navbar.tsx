"use client"

import Link from "next/link"
import Image from "next/image"
import logoEtempah from "../../public/logo/etempah.png"
import SignOut from "@/lib/action"
import { usePathname } from "next/navigation"
import logoMdr from "../../public/logo/Mdr.svg"
import { useRef} from "react"
import exclamation from "../../public/icons/exclamation.png"

interface User {
  name: string | undefined | null;
  role: string | undefined
}

//ADD MORE NAVBAR ITEMS
const items = [
  {
    id: 1,
    title: "Dashboard",
    url: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Bookings",
    url: "/admin/bookings",
  },
  {
    id: 3,
    title: "Rooms",
    url: "/admin/rooms",
  },
  {
    id: 4,
    title: "Users",
    url: "/admin/users",
  },
]

const AdminNavbar = ({name, role}: User) => {

  const pathname = usePathname();

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleOpen = () => {
    dialogRef.current?.showModal();
  }

  const handleClose = () => {
    dialogRef.current?.close();
  }

  return (
    <nav className="bg-white border-b-2 border-blue-700 shadow-md">
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
          {items.map( (item) => (
            <li key={item.id} className={`hover:cursor-pointer hover:text-blue-400 ${pathname === item.url ? "text-blue-800" : ""}`}>
              <Link href={item.url}>{item.title}</Link>
            </li>
          ) )}
        </ul>

        {/*Item 3 LOGOUT BUTTON*/}
        <div className="flex-2 justify-end flex items-center text-blue-950 py-1 gap-3">

          <div className="flex flex-col justify-self-center text-blue-950 text-right border-r-2 pr-2 border-gray-300">
            <h2 className="flex-0 font-bold">{name}</h2>
            <h2 className="flex-1 font-semibold text-gray-800">{role}</h2>
          </div>

        <button onClick={SignOut} className="border-2 border-red-500 transition-all text-black text-base font-medium px-2 py-1 rounded-md hover:bg-red-600 hover:text-white">Logout</button>

        </div>
        
      </div>
    </nav>
  );
}

export default AdminNavbar

