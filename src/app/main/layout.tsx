import { auth } from "@/auth"
import Navbar from "@/components/navbar";

const MainLayout = async ({children}:{children: React.ReactNode}) => {

    const session = await auth();
    const fullname = session?.user.name;
    const avatar = session?.user.image;

    const splitName = fullname?.split(/(\s+)/);
    const secName = splitName?.[2];
    console.log(secName);

  return (
    <div>
        <Navbar avatar={avatar} name={secName}/>
        {children}
    </div>
  )
}

export default MainLayout