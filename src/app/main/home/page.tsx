import { prisma } from "@/lib/prisma";

const Home = async () => {

  return (
    <div className="h-auto w-full">
      <div className="grid grid-rows-2 my-10 mx-auto max-w-[70%] bg-white rounded-lg p-3 shadow-md">
        {/*row 1*/}
        <h1 className="font-bold text-xl mb-2">Room Status Currently</h1>
        {/*row 2*/}
        <div className="flex gap-4">
          <div className="">cubaan</div>
          <div>testing</div>
        </div>
      </div>
    </div>
    //room status div
    
  )
}

export default Home