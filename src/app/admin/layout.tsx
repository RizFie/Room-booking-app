import { auth } from "@/auth"
import Sidebar from "@/components/sidebar";

const AdminLayout = async ({children}:{children: React.ReactNode}) => {

  const session = await auth();
  const fullname = session?.user.name;
  const role = session?.user.role

  return (
    <div>
        <Sidebar name={fullname} role={role} children={children}/>
        {children}
    </div>
  )
}

export default AdminLayout