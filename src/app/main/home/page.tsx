import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const Home = async () => {

  const session = await auth();
  const fullname = session?.user.name;

  return (
    <div className="grid grid-rows-2 my-10 mx-auto max-w-[80%]">
      
    <div>
      <h1 className="text-2xl font-semibold mb-2 animate-fade-right animate-duration-[1100ms] animate-ease-linear
      text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-300">Welcome,</h1>
      <h1 className="text-3xl font-bold animate-fade-left animate-duration-[1300ms] animate-ease-linear
      text-transparent bg-clip-text bg-gradient-to-tr from-blue-900 to-blue-600">{fullname}</h1>
    </div>

    </div>
  )
}

export default Home