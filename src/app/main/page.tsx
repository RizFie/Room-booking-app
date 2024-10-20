import { auth } from "@/auth"
import Navbar from "@/components/navbar";
import { prisma } from "@/lib/prisma";

const Main = async () => {

    const session = await auth();
    const fullname = session?.user.name;
    const avatar = session?.user.image;

    const splitName = fullname?.split(/(\s+)/);
    const secName = splitName?.[2];
    console.log(secName);

  return (
    <>
      <Navbar avatar={avatar} name={secName}/>
      <div className="bg-yellow-100">
          Welcome back: <span>{session?.user.name}</span>
      </div>
    </>
  )
}

export default Main