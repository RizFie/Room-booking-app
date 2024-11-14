import { prisma } from "../../../lib/prisma";
import UserButton from "@/components/user-button";

const Users = async () => {

    const users = await prisma.user.findMany();
    //console.log("fetched users:",users);

  return (
    <>
        <h1 className="font-bold text-xl text-blue-950 mx-auto max-w-[80%] mt-10">List of users</h1>
        <p className="mx-auto max-w-[80%] text-gray-600 text-sm font-medium">A list of all the users that registered including their full name, email, 
            phone number, role and creation date.</p>
        <div className="bg-white mx-auto max-w-[80%] mb-10 mt-4 rounded-lg shadow-[0px_4px_54px_-18px_#73a8ff] overflow-auto">
            <table className="table-auto text-sm h-full w-full border-collapse rounded-lg">
                <thead>
                    <tr className="text-left bg-gray-200 text-gray-600 border-b-[1px] border-gray-300">
                        <th className="p-3">Full Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Phone Number</th>
                        <th className="p-3">Role</th>
                        <th className="p-3">Created At</th>
                        <th className="p-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    { users.map( (user) => (
                        <tr className="border-b-[1px] hover:bg-gray-100" key={user.userId}>
                            <td className="p-3">{user.fullname}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">{user.phoneNum}</td>
                            <td className="p-3">{user.role}</td>
                            <td className="p-3">{user.createdAt.toLocaleDateString()}</td>
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