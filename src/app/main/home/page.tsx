import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const Home = async () => {

  const today = new Date();
  const session = await auth();
  const fullname = session?.user.name;
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = dayNames[today.getDay()];

  return (
    <div className="grid grid-rows-2 my-10 mx-auto max-w-[80%]">
      
    <div>
      <h1 className="text-2xl font-semibold mb-2 animate-fade-right animate-duration-[1100ms] animate-ease-linear
      text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-300">Welcome,</h1>
      <h1 className="text-3xl font-bold animate-fade-left animate-duration-[1300ms] animate-ease-linear
      text-transparent bg-clip-text bg-gradient-to-tr from-blue-900 to-blue-600">{fullname}</h1>
    </div>

    <div className="w-auto px-0 bg-white flex flex-row items-center h-8 p-3 rounded-md shadow-sm my-2 text-center text-blue-950">
      <h3 className="text-sm">It's <b>{day},<br/>{today.toLocaleDateString("en-MY")}</b></h3>
    </div>
    </div>
  )
}

export default Home