import { auth } from "@/auth"

const AdminLayout = async ({children}:{children: React.ReactNode}) => {

    const session = await auth();
    const fullname = session?.user.name;
    const avatar = session?.user.image;
    const role = session?.user.role

    const splitName = fullname?.split(/(\s+)/);
    const secName = splitName?.[2];
    console.log(secName);

  return (
    <div>
        <h2>{secName}</h2>
        <h3>{role}</h3>
        {children}
    </div>
  )
}

export default AdminLayout