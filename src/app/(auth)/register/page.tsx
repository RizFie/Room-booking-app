import FormRegister from "@/components/auth/form-register";

const Register = () => {
  return (
    <div className="grid grid-cols-2 overflow-hidden grid-flow-col gap-5">
      <div className="container rounded-lg h-[90%] self-center w-full mx-7">
        <img
          className="max-w-full h-full max-h-full object-cover rounded-lg"
          src="https://i.ibb.co/jvpyC0p/login-mdr.jpg"
          alt="login-mdr"
        />
      </div>
      <div className="container">
        <h1 className="text-2xl font-bold text-gray-600 pl-7 mt-7">Register</h1>
        <div className="px-7 mb-7">
          <FormRegister/>
        </div>
      </div>
    </div>
  );
}

export default Register