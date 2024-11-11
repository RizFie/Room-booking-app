import { auth } from "@/auth";
import AdminNavbar from "@/components/admin-navbar";
const AdminLayout = async ({children}:{children: React.ReactNode}) => {

  const session = await auth();
  const fullname = session?.user.name;
  const role = session?.user.role

  return (
    <div>
      <AdminNavbar name={fullname} role={role}/>
      {children}
    </div>
  )
}

export default AdminLayout