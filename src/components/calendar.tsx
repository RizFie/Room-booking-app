"use client";

import React, {useActionState, useEffect, useTransition,} from "react";
import { useRouter } from "next/navigation";
import {
  Week, Month, Agenda, ScheduleComponent, ViewsDirective, ViewDirective, EventSettingsModel, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop,
  TimelineViews,
  Day
} from '@syncfusion/ej2-react-schedule';
import toast from "react-hot-toast";
import { registerLicense } from '@syncfusion/ej2-base';
import { IoPerson } from "react-icons/io5";
import { MdEmail, MdDateRange } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdTimer } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { TiTick, TiCancel  } from "react-icons/ti";
import { cancelBooking, confirmReserve, deleteBooking } from "@/lib/action";

registerLicense('ORg4AjUWIQA/Gnt2UlhhQlVMfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX9SdE1jWH5WdH1VQGZd');

interface User {
  userId: string;
  fullname: string;
  email: string;
  phoneNum: string;
}

interface Place {
  placeId: string;
  placeName: string;
  placeDesc: string;
  placeCapacity: number;
  placeType: string;
}

interface BookingProps {
  bookingId: string;
  startTime: Date;
  endTime: Date;
  date: Date;
  purpose: string;
  userId: string;
  placeId: string;
  confirm: boolean;
  past: boolean;
  cancel: boolean;
  place: Place;
  user: User;
}

interface CalendarProps {
  data: BookingProps[];
  role: string | undefined;
}

const Calendar = ({ data, role }: CalendarProps) => {

  //console.log(role)
  const dateVariable = new Date();

  //Data
  const schedulerData = data.map((booking) => {

    const splitDate = booking.date.toISOString().split("T")[0];
    const splitStartTime = booking.startTime.toISOString().split('T')[1];
    const splitEndTime = booking.endTime.toISOString().split('T')[1];

    //console.log(booking.startTime)

    return {
      Id: booking.bookingId,
      Subject: booking.purpose,
      StartTime: new Date(`${splitDate}T${splitStartTime}`),
      EndTime: new Date(`${splitDate}T${splitEndTime}`),
      placeName: booking.place.placeName,
      fullname: booking.user.fullname,
      email: booking.user.email,
      past: booking.past,
      date: splitDate,
      isoDate: new Date(splitDate),
      phone: booking.user.phoneNum,
      confirm: booking.confirm,
      cancel: booking.cancel
    };
  });

  //cell template
  const template = (props: any) => {
    return props.past === true ? (
      <div className="p-[0.4px] h-[18px] w-auto overflow-hidden mt-1 flex flex-row gap-1 items-center">
        <h3 className="text-xs font-medium truncate w-[104px]">{props.placeName}</h3>
        <h3 className="text-[10px] p-[1px] bg-red-600 rounded-sm w-6 text-center">Past</h3>
      </div>
    ) : (
      <div className="p-[0.4px] h-full w-auto overflow-hidden mt-1">
        <h3 className="text-xs font-medium truncate w-32">{props.placeName}</h3>
      </div>
    );
  };

  //Header template
  const headerTemplate = (props: any) => {
    return(
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 rounded-t-md text-lg flex flex-row gap-1 text-left
      items-center p-2">
        <FaLocationDot className="p-1 scale-[2] text-white"/>
        <h1 className="p-2 font-medium text-white">{props.placeName}</h1>
      </div>
    )
  }

  //Content template
  const contentTemplate = (props: any) => {

    return(
      <div className="mt-3">
        
        { props.past == true ? (
          <h2 className="p-1 bg-red-100 text-red-600 font-medium border-l-red-600 border-l-4 my-2 rounded-sm">This booking already passed</h2>
        ) : (
          <h2></h2>
        )}

        { role == "admin" ? (
          <h2 className="text-[14px] bg-blue-950 p-2 rounded-sm text-white text-justify">{props.Subject}</h2>
        ) : (
          <h2></h2>
        )}
        
        <div className="flex flex-row justify-between">
          <div className="my-3 flex flex-row items-center text-[14px] text-blue-950 gap-3 w-auto px-2
          rounded-sm bg-gray-100">
            <MdDateRange/>
            <h2 className="font-semibold">{props.isoDate.toLocaleDateString("en-MY")}</h2>
          </div>
          <div className="my-3 flex flex-row items-center text-[14px] text-blue-950 gap-3 w-auto px-2
          rounded-sm bg-gray-100">
            <IoMdTimer/>
            <h2 className="font-semibold">{props.StartTime.toLocaleTimeString()} - {props.EndTime.toLocaleTimeString()}</h2>
          </div>
        </div>
        
        <div className="text-blue-950 flex justify-between mt-1">

          {role === "admin" ? (
            <div className="flex flex-row gap-2 items-center">
              <IoPerson/>
              <h2 className="max-w-40 text-[14px]">{props.fullname}</h2>
            </div>
          ) : (
            <div className="w-full p-1 bg-gray-100 shadow-inner rounded-sm">
              <h2 className="font-medium text-center">Someone already reserved this room/place<br/>
              for the shown date and time.</h2>
            </div>
          )}
          
          {role === "admin" ? (
            <div className="flex flex-row gap-2 justify-left items-center">
              <MdEmail />
              <a className="text-[14px] underline text-blue-500" href={`mailto:${props.email}`}>{props.email}</a>
            </div>
          ) : (
            <div></div>
          )}
        </div>

          {role === "admin" ? (
            <div className="flex flex-row gap-2 justify-left items-center mt-1">
              <FaPhoneAlt />
              <p className="text-[14px] text-blue-950">{props.phone}</p>
            </div>
          ) : (
            <div></div>
          )}
        
        
      </div>
    )
  }

  //Footer template
  const footerTemplate = (props: any) => {

    const router = useRouter();
    const [isPendingConfirm, startConfirmTransition] = useTransition();
    const [isPendingCancel, startCancelTransition] = useTransition();

  
    const handleConfirm = async () => {
      startConfirmTransition(async () => {
        const result = await confirmReserve(props.Id);
        if (result.code === 200) {
          toast.success(result.message);
          router.refresh();
        } else {
          toast.error(result.message);
        }
      });
    };

    const handleCancel = async () => {
      startCancelTransition(async () => {
        const result = await cancelBooking(props.Id);
        if (result.code === 200) {
          toast.success(result.message);
          router.refresh();
        } else {
          toast.error(result.message);
        }
      });
    };

    const handleDelete = async () => {
      startCancelTransition(async () => {
        const result = await deleteBooking(props.Id);
        if (result.code === 200) {
          toast.success(result.message);
          router.refresh();
        } else {
          toast.error(result.message);
        }
      });
    };
  
    return (
      <div>
        {role === "admin" && (

          <div className="container flex flex-row justify-end items-center gap-2">

            {props.cancel ? (
              <div className="w-full bg-red-100 border-l-[3px] border-l-red-500 text-red-500 p-1 text-left">
                <h2 onClick={handleDelete} className="font-medium cursor-pointer">{isPendingCancel ? "Deleting..." : "This booking has been cancelled, click to delete"}</h2>
              </div>

            ) : (

              props.past ?
                  (
                    <div className={`flex flex-row justify-center items-center py-1 px-2 rounded-full border-2 border-red-500 text-red-600
                    hover:scale-105 cursor-pointer transition-all active:scale-95`}>
                      <button disabled={isPendingCancel} onClick={handleDelete}>
                        <TiCancel className="text-xl scale-105 text-center text-red-500"/>
                        <h2 className="font-medium text-center">{isPendingCancel ? 'Deleting...' : 'Delete'}</h2>
                      </button>
                      
                    </div>
                  )
                :
                  (
                  <div>
                    <button disabled={isPendingCancel} onClick={handleCancel} className={`flex flex-row justify-center items-center py-1 px-2 rounded-full border-2 border-red-500 text-red-600
                    hover:scale-105 cursor-pointer transition-all active:scale-95`}>
                      <TiCancel className="text-xl scale-105 text-center text-red-500"/>
                      <h2 className="font-medium text-center">{isPendingCancel ? 'Cancelling...' : 'Cancel'}</h2>
                    </button>
                    
                  </div>
                  )

            )}

            {props.confirm ? (

              <div>
                <button className="flex flex-row justify-center items-center py-1 px-2 rounded-full border-2 border-green-700 text-green-600 bg-green-700" disabled>
                  <TiTick className="text-xl scale-105 text-center text-white"/>
                  <h2 className="font-medium text-center text-white">Confirmed</h2>
                </button>
                
              </div>

            ) : (

              <div>
                <button
                  onClick={handleConfirm}
                  disabled={isPendingConfirm || props.past || props.cancel}
                  className={`flex flex-row justify-center items-center py-1 px-2 rounded-full border-2 border-green-600 text-green-700
                  ${props.past || props.cancel ? '' : 'hover:scale-105 cursor-pointer transition-all active:scale-95'}`}
                >
                  <TiTick className="text-xl scale-105 text-center text-green-600"/>
                  <h2 className="font-medium text-center">{isPendingConfirm ? 'Confirming...' : 'Confirm'}</h2>
                </button>
              </div>

            )}

          </div>
        )}
      </div>
    );
  };
  

  //quick info template object
  const quickTemplate = {
    header: headerTemplate,
    content: contentTemplate,
    footer: footerTemplate,
  }

  const eventSettings: EventSettingsModel = { dataSource: schedulerData, allowAdding: false, allowEditing: false, template: template }
  
  return (
    <div className="w-[80%] mx-auto my-4 p-3 rounded-md bg-white flex items-center justify-center shadow-lg border-t-8 rounded-t-md border-t-blue-700">
      <ScheduleComponent className="border-none rounded-lg" width='100%' height='550px' currentView='Month' selectedDate={dateVariable} eventSettings={eventSettings}
      quickInfoTemplates={quickTemplate}>
        <ViewsDirective>
          <ViewDirective option='Day' />
          <ViewDirective option='Week' />
          <ViewDirective option='Month' />
          <ViewDirective option='Agenda' />
        </ViewsDirective>
        
        <Inject services={[Day ,Week, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  )
};

export default Calendar;
