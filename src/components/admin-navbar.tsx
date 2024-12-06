"use client"

import Link from "next/link"
import Image from "next/image"
import logoEtempah from "../../public/logo/etempah.png"
import SignOut from "@/lib/action"
import { usePathname } from "next/navigation"
import logoMdr from "../../public/logo/Mdr.svg"

interface User {
  name: string | undefined | null;
  role: string | undefined
}

const AdminNavbar = ({name, role}: User) => {

  //ADD MORE NAVBAR ITEMS
  const items = [
    {
      id: 1,
      title: "Dashboard",
      url: "/admin/dashboards",
    },
    {
      id: 2,
      title: "Bookings",
      url: "/admin/bookings",
    },
    {
      id: 3,
      title: "Places",
      url: "/admin/places",
    },
    {
      id: 4,
      title: "Users",
      url: "/admin/users",
    },
  ]

  const pathname = usePathname();

  return (
    <nav className="bg-white border-b-2 border-blue-700 shadow-[0px_4px_21px_0px_rgba(59,_130,_246,_0.5)]
    animate-fade-down animate-ease-in-out">
      <div className="max-w-full flex items-center justify-between p-2 ">

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
            <li key={item.id} className={`transition-all hover:cursor-pointer hover:text-blue-400 ${pathname.startsWith(item.url) ? "text-blue-800" : ""}`}>
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

        <button onClick={SignOut} className="border-2 border-red-500 transition-all text-base font-medium px-2 py-1 rounded-md 
        hover:bg-red-600 hover:text-white active:scale-95 text-red-500">Logout</button>

        </div>
        
      </div>
    </nav>
  );
}

export default AdminNavbar

