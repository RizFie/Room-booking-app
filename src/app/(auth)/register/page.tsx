import FormRegister from "@/components/auth/form-register";
import logo from "../../../../public/logo/etempah.png";
import Image from "next/image";
import loginLogo from "../../../../public/illustration/login-mdr.jpg";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-5">
      <div className="h-[100px] rounded-lg bg-none max-w-[30%] animate-fade-down animate-once animate-ease-out animate-alternate">
        <Image src={logo} alt="e-tempah" className="h-[100px] object-cover overflow-hidden max-sm:scale-[2.5]"/>
      </div>

      <div className="grid grid-cols-2 overflow-hidden grid-flow-col max-w-[50%] bg-white rounded-lg max-h-[50%] shadow-lg
      animate-fade-up animate-once animate-ease-out animate-alternate max-sm:flex max-sm:flex-col max-sm:max-w-[80%]">
        <div className="container rounded-lg rounded-r-none h-full self-center w-full">
          <Image
            className="max-w-full h-full max-h-full w-full object-cover rounded-lg rounded-r-none
            max-sm:rounded-b-none max-sm:rounded-t"
            src={loginLogo}
            alt="register-mdr"
          />
        </div>
        <div className="container">
          <h1 className="text-2xl font-bold text-gray-600 pl-7 mt-7">Register</h1>
          <div className="px-7 mb-7">
            <FormRegister/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register