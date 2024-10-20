import Link from "next/link"
import Image from "next/image"

const Navbar = () => {
  return (
    <nav className="bg-white border-b-2 border-b-blue-700 shadow-md">
      <div className="max-w-full flex items-center justify-between p-2">
        <div className="flex items-center gap-3">
          <div className="container bg-gray-400 w-[40px] h-[40px] rounded-full border-blue-700 border-2">
            <Image
              src=""
              alt="avatar"
              width={40}
              height={40}
              className="rounded-full"
              priority
            />
          </div>
          <h2 className="font-semibold justify-self-center text-blue-950">
            Username
          </h2>
        </div>
        <ul className="flex-1 justify-center flex items-center gap-6 mr-5 font-bold text-blue-950 py-1">
          <li className="hover:border-b-4 hover:border-blue-700">
            <Link href="/main">Home</Link>
          </li>
          <li className="hover:border-b-4 hover:border-blue-700">Cancelled</li>
          <li className="hover:border-b-4 hover:border-blue-700">Bookings</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar