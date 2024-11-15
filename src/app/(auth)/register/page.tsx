import FormRegister from "@/components/auth/form-register";
import logo from "../../../../public/logo/etempah.png";
import Image from "next/image";
import loginLogo from "../../../../public/illustration/login-mdr.jpg";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-5">
      <div className="h-[100px] rounded-lg bg-none max-w-[30%]">
        <Image src={logo} alt="e-tempah" className="h-[100px] object-cover overflow-hidden"/>
      </div>
      <div className="grid grid-cols-2 overflow-hidden grid-flow-col gap-5 max-w-[50%] bg-white rounded-lg max-h-[50%] shadow-[0px_4px_54px_-18px_#73a8ff]">
        <div className="container rounded-lg h-[90%] self-center w-full mx-7">
          <Image
            className="max-w-full h-full max-h-full w-full object-cover rounded-lg"
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