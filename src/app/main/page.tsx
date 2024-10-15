import { auth } from "@/auth"
import { prisma } from "@/lib/prisma";

const Main = async () => {

    const session = await auth();
    console.log(session);

  return (
    <div className="bg-yellow-100">
        Welcome back: <span>{session?.user?.email}</span>
    </div>
  )
}

export default Main