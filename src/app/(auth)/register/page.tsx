import Image from "next/image"


const Register = () => {
  return (
    <div className='p-6 space-y-4 grid-cols-2'>
        <h1 className='text-2xl font-bold text-gray-900'>Create an account</h1>
        <Image height={1500}
        alt="Picture of the author" 
        width={1500}
        src="https://wallpapers.com/images/featured/picture-en3dnh2zi84sgt3t.webp"/>
    </div>
  )
}

export default Register