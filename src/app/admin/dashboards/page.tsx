import { auth } from '@/auth'
import React from 'react'

const Dashbaord = async () => {

  const session = await auth();
  const fullname = session?.user.name;

  return (
    <div className='mx-auto max-w-[80%] mt-10 flex flex-row justify-between'>
      <div>
        <p className='text-[26px] text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-950 font-semibold 
        animate-fade-right animate-duration-[2500ms] animate-delay-100'>Hello,</p>
        <h1 className='text-[46px] font-bold animate-fade-left animate-duration-[2500ms] animate-delay-500 
        text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600'>{fullname}</h1>
      </div>

      <div>
        
      </div>
    </div>
  )
}

export default Dashbaord