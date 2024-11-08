import Link from "next/link"
import Image from "next/image"
import { signOut } from "@/auth"
import logo from "../../public/logo/etempah.png"

interface User {
  name: string | undefined
  avatar: string | null | undefined
  role: string | undefined
}

const Navbar = ({avatar, name, role}: User) => {

  return (
    <nav className="bg-white border-b-2 border-black shadow-md">
      <div className="max-w-full flex items-center justify-between p-2">

        {/*Item 1*/}
          <div className="flex-0 container w-[180px] h-[60px] overflow-hidden flex justify-center items-center">
            <Image
              src={logo}
              alt="e-tempah"
              className="object-contain w-full h-auto"
              priority
            />
          </div>

        {/*Item 2*/}
        <ul className="flex-1 justify-center flex items-center gap-6 mr-5 font-bold text-blue-950 py-1">
          <li id="li1" className="hover:cursor-pointer hover:text-blue-700 transition-all">
            <Link href="/main/home">Home</Link>
          </li>
          <li id="li2" className="">Cancelled</li>
          <li id="li3" className="">Bookings</li>
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

          <form action={ async () => {
            "use server"
            await signOut({redirectTo:"/login"});
          }}>
            <button type="submit" className="border-2 border-red-500 transition-all text-black text-base font-medium px-4 py-2 rounded-md hover:bg-red-600 hover:text-white">Logout</button>
          </form>
        </div>
        
      </div>
    </nav>
  );
}

export default Navbar