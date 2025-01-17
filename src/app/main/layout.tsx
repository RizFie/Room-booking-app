import { auth } from "@/auth"
import Navbar from "@/components/navbar";
import { updatePastStatus } from "@/lib/action";

const MainLayout = async ({children}:{children: React.ReactNode}) => {

    const session = await auth();
    const fullname = session?.user.name;
    const role = session?.user.role;
    const today = new Date();

    const splitName = fullname?.split(/(\s+)/);
    const secName = splitName?.[2];
    console.log(secName);

    await updatePastStatus();

  return (
    <div className="h-screen w-screen">
        <Navbar name={secName} role={role}/>
        {children}
    </div>
  )
}

export default MainLayout