import FormRegister from "@/components/auth/form-register";

const Register = () => {
  return (
    <div className="grid grid-cols-2 overflow-hidden grid-flow-col">
      <div className="container rounded-l-lg h-full self-center">
        <img
          className="max-w-full h-full max-h-full object-cover rounded-l-lg"
          src="https://i.ibb.co/jvpyC0p/login-mdr.jpg"
          alt="login-mdr"
        />
      </div>
      <div className="container">
        <h1 className="text-2xl font-bold text-gray-600 pl-5 pt-5">Register</h1>
        <div className="px-5">
          <FormRegister/>
        </div>
      </div>
    </div>
  );
}

export default Register