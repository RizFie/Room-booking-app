"use client"

const FormRegister = () => {
  return (
    <form action="" className="mt-4 mb-4">
        <div className="mt-6">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-600">Username</label>
            <input type="text" name="username" className="block bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
            <div aria-live="polite" aria-atomic="true">
                <span className="text-sm text-red-500">message</span>
            </div>
        </div>

        <div className="mt-4">
            <label htmlFor="email" className=" block mb-2 text-sm font-medium text-gray-600">Email</label>
            <input type="email" name="email" className="bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
            <div aria-live="polite" aria-atomic="true">
                <span className=" text-sm text-red-500 mt-2">message</span>
            </div>
        </div>

        <div className="mt-4">
            <label htmlFor="phone" className=" block mb-2 text-sm font-medium text-gray-600">Phone Number</label>
            <input type="tel" name="phone" className="bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
            <div aria-live="polite" aria-atomic="true">
                <span className=" text-sm text-red-500 mt-2">message</span>
            </div>
        </div>

        <div className="mt-4">
            <label htmlFor="department" className=" block mb-2 text-sm font-medium text-gray-600">Department</label>
            <input type="text" name="department" className="bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
            <div aria-live="polite" aria-atomic="true">
                <span className=" text-sm text-red-500 mt-2">message</span>
            </div>
        </div>

        <div className="mt-4">
            <label htmlFor="password" className=" block mb-2 text-sm font-medium text-gray-600">Password</label>
            <input type="text" name="password" className="bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
            <div aria-live="polite" aria-atomic="true">
                <span className=" text-sm text-red-500 mt-2">message</span>
            </div>
        </div>

        <div className="mt-4">
            <label htmlFor="confirmPass" className=" block mb-2 text-sm font-medium text-gray-600">Confirm Password</label>
            <input type="text" name="confirmPass" className="bg-blue-100 rounded-sm text-gray-600 w-full focus:outline-blue-400"/>
            <div aria-live="polite" aria-atomic="true">
                <span className="text-sm text-red-500 mt-2">message</span>
            </div>
        </div>
    </form>
  )
}

export default FormRegister