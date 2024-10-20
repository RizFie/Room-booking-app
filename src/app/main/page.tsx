import { auth } from "@/auth"
import Navbar from "@/components/navbar";
import { prisma } from "@/lib/prisma";

const Main = async () => {

    const session = await auth();
    console.log(session);

  return (
    <>
      <Navbar/>
      <div className="bg-yellow-100">
          Welcome back: <span>{session?.user.name}</span>
      </div>
    </>
  )
}

export default Main