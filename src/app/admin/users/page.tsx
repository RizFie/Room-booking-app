import { prisma } from "../../../lib/prisma";

const Users = async () => {

    const users = await prisma.user.findMany();
    //console.log("fetched users:",users);

  return (
    <>
        <h1 className="font-bold text-xl text-blue-950 mx-auto max-w-[70%] mt-10">List of users</h1>
        <p className="mx-auto max-w-[70%] text-gray-700 text-sm">A list of all the users in registered including their full name, email, 
            phone number, role and creation date.</p>
        <div className="bg-white mx-auto max-w-[70%] mb-10 mt-4 rounded-lg shadow-[0px_4px_54px_-18px_#73a8ff] overflow-auto">
            <table className="table-auto text-sm h-full w-full border-collapse rounded-lg">
                <thead>
                    <tr className="text-left bg-gray-100 text-blue-950">
                        <th className="p-3">Full Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Phone Number</th>
                        <th className="p-3">Role</th>
                        <th className="p-3">Created At</th>
                        <th className="p-3"></th>
                    </tr>
                </thead>
                <tbody>
                    { users.map( (user) => (
                        <tr key={user.userId}>
                            <td className="p-3">{user.fullname}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">{user.phoneNum}</td>
                            <td className="p-3">{user.role}</td>
                            <td className="p-3">{user.createdAt.toLocaleDateString()}</td>
                            <td className="p-3">
                                <div className="flex flex-col">
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </div>
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