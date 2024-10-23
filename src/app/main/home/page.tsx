import { prisma } from "@/lib/prisma";

const Home = async () => {

  

  return (
    //room status div
    <div className="grid grid-rows-2 mx-auto max-w-[90%] bg-yellow-100 my-3 rounded-lg p-3">
        {/*row 1*/}
        <h1 className="font-bold text-xl mb-2">Room Status Currently</h1>
        {/*row 2*/}
        <div className="flex gap-4">
          <div className="">cubaan</div>
          <div>testing</div>
        </div>
        
    </div>
  )
}

export default Home