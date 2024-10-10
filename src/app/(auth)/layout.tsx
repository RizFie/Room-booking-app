const AuthLayout = ( {children}:{children: React.ReactNode} ) => {
  return (
    <div className="bg-gray-100">
      <div
        className="flex flex-col items-center justify-between px-6 py-8 
                    mx-auto h-screen"
      >
        <div id="authShadow"
          className="w-[70%] bg-white rounded-lg mt-0"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout