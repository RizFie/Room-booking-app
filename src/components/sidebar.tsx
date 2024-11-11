import Image from "next/image";
import brandLogo from "../../public/logo/etempah.png";
import { IoReorderThreeOutline } from "react-icons/io5";
import { Auth } from "@auth/core";

interface SideBarProps {
    children: React.ReactNode;
    name: string | null | undefined;
    role: string | undefined;
}

const Sidebar = ({ children, name, role }: SideBarProps) => {

    console.log("role and name sidebar: ",name,role);

  return (
    <aside className="h-screen">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
           <div className="p-4 pb-2 flex justify-between items-center">
                <Image src={brandLogo} alt="eTEMPAH" className="w-32"/>
                <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                    <IoReorderThreeOutline />
                </button>
           </div>

           <ul className="flex-1 px-3">{children}</ul>

           <div className="flex justify-between items-center w-52 ml-3">
                
           </div>
        </nav>
    </aside>
  )
}

export default Sidebar