import { auth } from "@/auth"
import Navbar from "@/components/navbar";

const MainLayout = async ({children}:{children: React.ReactNode}) => {

    const session = await auth();
    const fullname = session?.user.name;
    const avatar = session?.user.image;
    const role = session?.user.role

    const splitName = fullname?.split(/(\s+)/);
    const secName = splitName?.[2];
    console.log(secName);

  return (
    <div>
        <Navbar avatar={avatar} name={secName} role={role}/>
        {children}
    </div>
  )
}

export default MainLayout