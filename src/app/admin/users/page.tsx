import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import UserButton from "@/components/user-button";

const Users = async () => {

    const users = await prisma.user.findMany();
    //console.log("fetched users:",users);

  return (
    <>  
        <div className="flex flex-row mx-auto max-w-[80%] mt-10 items-center justify-between">
            <div>
                <h1 className="font-bold text-3xl text-blue-950">List of users</h1>
                <p className="font-medium text-gray-700 text-sm my-1 bg-gray-200 bg-opacity-75 p-2">A list of all the users that had registered including their full name, email, 
                    phone number, role and creation date.</p>
            </div>
            <div>
                <Link href="/admin/users/add">
                    <button className="font-semibold text-sm p-1 rounded-md 
                     border-2 bg-blue-400 text-white border-blue-400
                    transition-all shadow-md w-full h-full
                    hover:scale-110 active:scale-95">Add New</button>
                </Link>
            </div>
        </div>
        
        <div className="bg-white mx-auto max-w-[80%] mb-10 mt-4 rounded-lg shadow-md overflow-auto">
            <table className="table-auto text-sm h-full w-full border-collapse rounded-lg">
                <thead>
                    <tr className="text-left bg-blue-500 text-gray-100 border-b-[1px] border-gray-300">
                        <th className="p-3 w-[280px]">Full Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Phone Number</th>
                        <th className="p-3">Role</th>
                        <th className="p-3 w-[200px]">Created At</th>
                        <th className="p-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    { users.map( (user) => (
                        <tr className="border-b-[1px] hover:bg-gray-100 hover:shadow-inner transition-all" key={user.userId}>
                            <td className="p-3">{user.fullname}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">{user.phoneNum}</td>
                            <td className="p-3">{user.role}</td>
                            <td className="p-3">{`${user.createdAt.toLocaleDateString()}, ${user.createdAt.toLocaleTimeString()}`}</td>
                            <td className="p-3">
                                <UserButton role={user.role} id={user.userId}/>
                            </td>
                        </tr>
                    )) }
                </tbody>
                <tbody>

                </tbody>
            </table>
        </div>
    </>
    
  )
}

export default Users