import { MdCancel } from "react-icons/md";

const CancelButton = () => {
  return (
    <div>
        <button className="bg-red-700 text-white p-1 rounded-md text-xs text-center flex items-center 
        justify-center my-2 mx-auto w-24 gap-2 hover:scale-105 transition-all active:scale-90">
            <MdCancel/>
            <h3>Cancel</h3>
        </button>
    </div>
  )
}

export default CancelButton