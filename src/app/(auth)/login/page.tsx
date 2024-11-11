import FormLogin from "@/components/auth/form-login"
import logo from "../../../../public/logo/etempah.png"
import Image from "next/image"

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center w-full flex-col">
      <div className="h-[100px] rounded-lg bg-none max-w-[30%]">
        <Image src={logo} alt="e-tempah" className="h-[100px] object-cover overflow-hidden"/>
      </div>
      <div className="grid grid-cols-2 overflow-hidden grid-flow-col gap-1 rounded-lg shadow-xl bg-white max-w-[40%]">
        <div className="container rounded-lg h-[90%] self-center w-full justify-self-center ml-7">
          <img
            className="max-w-full h-full max-h-full w-full object-cover rounded-lg"
            src="https://i.ibb.co/jvpyC0p/login-mdr.jpg"
            alt="login-mdr"
          />
        </div>
        <div className="container">
          <h1 className="text-2xl font-bold text-gray-600 pl-7 mt-7">Login</h1>
          <div className="px-7 mb-7">
            <FormLogin/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login