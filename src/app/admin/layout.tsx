import { auth } from "@/auth";
const AdminLayout = async ({children}:{children: React.ReactNode}) => {

  const session = await auth();
  const fullname = session?.user.name;
  const role = session?.user.role

  return (
    <div>
      {children}
    </div>
  )
}

export default AdminLayout