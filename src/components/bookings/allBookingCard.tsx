"use client"
import CancelButton from "../cancel-booking-button";
import { MdDateRange, MdOutlineAccessTimeFilled } from "react-icons/md";
import { useState, useEffect } from "react";
import Image from "next/image";
import voidImage from "../../../public/illustration/void.svg";

interface UserBookings {
    bookingId: string,
    date: Date,
    startTime: Date,
    endTime: Date,
    purpose: string,
    confirm: boolean,
    past: boolean,
    cancel: boolean,
    place: {
        placeName: string
    }
}

interface Props {
    userBookings: UserBookings[]
}


const AllBookingCard = ({userBookings}:Props) => {

    const [filter, setFilter] = useState<string>("all");

    let [filteredBookings, setFilteredBookings] = useState<UserBookings[]>(userBookings);

    useEffect(() => {
        if(filter === "all") {
            setFilteredBookings(userBookings);
        } else if(filter === "confirmed") {
            setFilteredBookings(userBookings.filter(booking => booking.confirm === true));
        } else if(filter === "pending") {
            setFilteredBookings(userBookings.filter(booking => booking.confirm === false && booking.cancel === false && booking.past === false));
        } else if(filter === "cancelled") {
            setFilteredBookings(userBookings.filter(booking => booking.cancel === true));
        }
    }, [filter, userBookings]);


  return (
    <>
    <div className="w-full flex flex-row gap-4 mt-4">
        <button onClick={() => setFilter("all")} 
        className={`text-blue-800 p-1 rounded-md text-xs text-center w-24 flex active:bg-blue-800 active:text-white
        items-center justify-center border-separate border-[1.4px] border-blue-800 font-semibold transition-all
        hover:bg-blue-500 hover:border-blue-500 hover:text-white ${filter === "all" ? "bg-blue-800 text-white" : ""}`}>
            <h3>All</h3>
        </button>

        <button onClick={() => setFilter("confirmed")} 
        className={`text-blue-800 p-1 rounded-md text-xs text-center w-24 flex active:bg-blue-800 active:text-white
        items-center justify-center border-separate border-[1.4px] border-blue-800 font-semibold transition-all
        hover:bg-blue-500 hover:border-blue-500 hover:text-white ${filter === "confirmed" ? "bg-blue-800 text-white" : ""}`}>
            <h3>Confirmed</h3>
        </button>

        <button onClick={() => setFilter("pending")} 
        className={`text-blue-800 p-1 rounded-md text-xs text-center w-24 flex active:bg-blue-800 active:text-white
        items-center justify-center border-separate border-[1.4px] border-blue-800 font-semibold transition-all
        hover:bg-blue-500 hover:border-blue-500 hover:text-white ${filter === "pending" ? "bg-blue-800 text-white" : ""}`}>
            <h3>Pending</h3>
        </button>

        <button onClick={() => setFilter("cancelled")} 
        className={`text-blue-800 p-1 rounded-md text-xs text-center w-24 flex active:bg-blue-800 active:text-white
        items-center justify-center border-separate border-[1.4px] border-blue-800 font-semibold transition-all
        hover:bg-blue-500 hover:border-blue-500 hover:text-white ${filter === "cancelled" ? "bg-blue-800 text-white" : ""}`}>
            <h3>Cancelled</h3>
        </button>
    </div>
    

    <div className="container flex flex-row mt-3 mb-7 gap-7 h-[392px] items-center flex-wrap justify-between overflow-auto">
        {filteredBookings.length === 0 ? (
            <div className="container m-0 bg-white w-full h-full shadow-sm rounded-md mt-3 flex flex-col justify-center items-center
            gap-6 animate-fade-down">
                <Image height={260} width={260} src={voidImage} alt="Nothing image"/>
                <h1 className="text-center text-gray-600">You have no reservation</h1>
            </div>
        ) : (
            filteredBookings.map((booking) => (
                <div key={booking.bookingId} className="bg-white w-[270px] h-[373px] rounded-md shadow-md hover:scale-105 transition-all
                animate-fade-down">
                    <h1 className="font-semibold text-lg my-0 pt-2 pb-1 bg-gradient-to-r from-purple-800 to-red-700 w-full 
                    text-slate-100 px-2 rounded-t-md min-h-[68px]">
                    {booking.place.placeName}</h1>
                    <div className="text-sm mx-4 my-2 font-bold h-5 flex flex-row gap-3 justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <MdDateRange/>
                            <h2>{booking.date.toLocaleDateString("en-MY")}</h2>
                        </div>
                        {booking.confirm ? (
                            <div className="bg-green-500 text-white p-1 rounded-md text-xs text-center w-[70] flex items-center justify-center">
                                <h3>Confirmed</h3>
                            </div>
                        ) : (
                            <div className="bg-red-500 text-white p-1 rounded-md text-xs text-center w-16 flex items-center justify-center">
                                <h3>Pending</h3>
                            </div>
                        )}
                    </div>
                    <div className="text-sm m-4 mt-1 mb-2 font-bold flex flex-row items-center gap-2 h-5">
                        <MdOutlineAccessTimeFilled/>
                        <h2>{booking.startTime.toLocaleTimeString("en-MY")} - {booking.endTime.toLocaleTimeString("en-MY")}</h2>
                    </div>
                    <div className="p-2 pt-0 text-[14px] w-full">
                        <h3 className="font-semibold bg-gray-100 p-1 my-1">Purpose/Agenda</h3>
                        <h2 className="text-justify p-2 text-sm rounded-md bg-gray-100 shadow-inner h-[156px]">{booking.purpose}</h2>
                    </div>
    
                    {booking.past ? (
                        <div className="bg-gray-200 text-gray-600 mx-2 mt-2 p-1 rounded-none text-xs text-center w-[70%] flex items-center justify-center">
                            <h3 className="font-semibold text-red-700">This booking already passed</h3>
                        </div>
                    ): 
                        booking.cancel ? (
                            <div className="bg-red-700 text-white mx-2 mt-2 p-1 rounded-md text-xs text-center w-16 flex items-center justify-center">
                                <h3>Cancelled</h3>
                            </div>
                        ) : (

                            booking.confirm ? 
                            (<h4 className="text-[11px] mx-2 font-medium bg-gray-100 p-1">The booking has been confirmed,<br/>
                            for any problem, please contact the admin.</h4> ) : (<CancelButton bookingId={booking.bookingId}/>)
                    )}

                    
                </div>
            ))
        )}
    </div>
    </>   
  )
}

export default AllBookingCard