"use client"

import { MdCancel } from "react-icons/md";
import { useRef } from "react";

interface props {
  bookingId: string
}

const CancelButton = ({bookingId}: props) => {

  //console.log("Booking ID:",bookingId);

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleOpen = () => {
    dialogRef.current?.showModal();
  }

  const handleClose = () => {
    dialogRef.current?.close();
  }

  return (
    <>

      <div className="w-[65px] px-2 mb-3">
        <button onClick={handleOpen} className="bg-red-700 text-white p-1 rounded-md text-xs text-center flex items-center 
         my-2 mx-auto w-[65px] gap-1 hover:scale-105 transition-all active:scale-90">
            <MdCancel/>
            <h3>Cancel</h3>
        </button>
      </div>

      <dialog ref={dialogRef} className="dialog rounded-lg shadow w-[400px] backdrop:backdrop-blur-md text-center">
        <div className="flex flex-col gap-4 p-4">
          <h1 className="text-lg font-bold">Cancel Reservation</h1>
          <p className="text-sm">Are you sure you want to cancel this reservation?</p>
          <div className="flex flex-row gap-4">
            <button onClick={handleClose} className="bg-red-700 text-white p-1 rounded-md text-xs text-center flex items-center 
            justify-center w-[65px] gap-1 hover:scale-105 transition-all active:scale-90">
              <h3>Yes</h3>
            </button>
            <button onClick={handleClose} className="bg-green-700 text-white p-1 rounded-md text-xs text-center flex items-center 
            justify-center w-[65px] gap-1 hover:scale-105 transition-all active:scale-90">
              <h3>No</h3>
            </button>
          </div>
        </div>
      </dialog>

    </>
    
  )
}

export default CancelButton