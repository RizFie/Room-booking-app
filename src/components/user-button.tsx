"use client"

import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

interface UserButtonProps {
    id: string;
}

const UserButton: React.FC<UserButtonProps> = ({id}) => {

    const router = useRouter()

    const handleRedirect = () => {
        router.push(`/admin/users/${id}`);
    }

  return (
    <div className="flex flex-col">
        <button onClick={handleRedirect} className="bg-blue-100 text-blue-700 rounded-sm m-1 p-1 shadow-sm">Edit</button>
        <button className="bg-red-100 text-red-700 rounded-sm m-1 p-1 shadow-sm">Delete</button>
    </div>
  )
}

export default UserButton