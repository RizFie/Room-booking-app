import FormLogin from "@/components/auth/form-login"
import logo from "../../../../public/logo/etempah.png"
import Image from "next/image"
import loginLogo from "../../../../public/illustration/login-mdr.jpg"

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center w-full flex-col">
      <div className="h-[100px] rounded-lg bg-none max-w-[30%] animate-fade-down animate-once animate-ease-out animate-alternate">
        <Image src={logo} alt="e-tempah" className="h-[100px] object-cover overflow-hidden max-sm:scale-[2.5]" priority/>
      </div>

      <div className="grid grid-cols-2 overflow-hidden grid-flow-col rounded-lg bg-white max-w-[40%] shadow-lg max-sm:flex max-sm:flex-col max-sm:max-w-[80%]
      animate-fade-up animate-once animate-ease-out animate-alternate">
        <div className="container rounded-lg h-full rounded-r-none self-center w-full justify-self-center max-sm:w-full max-sm:rounded-b-none max-sm:rounded-t">
          <Image
            className="max-w-full h-full max-h-full w-full object-cover rounded-lg rounded-r-none max-sm:rounded-b-none max-sm:rounded-t"
            src={loginLogo}
            alt="login-mdr"
            priority
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