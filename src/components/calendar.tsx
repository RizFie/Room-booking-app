"use client";

import React from "react";
import {
  Week, Month, Agenda, ScheduleComponent, ViewsDirective, ViewDirective, EventSettingsModel, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop,
  TimelineViews
} from '@syncfusion/ej2-react-schedule';
import { registerLicense } from '@syncfusion/ej2-base';
import { IoPerson } from "react-icons/io5";
import { MdEmail, MdDateRange } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdTimer } from "react-icons/io";

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
  past: boolean;
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

    //console.log(splitEndTime)

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
      start: booking.startTime,
      end: booking.endTime
    };
  });

  //console.log(schedulerData)

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

    const start = props.start

    return(
      <div className="mt-3">
        
        { props.past == true ? (
          <h2 className="p-1 bg-red-100 text-red-600 font-medium border-l-red-600 border-l-4 my-2 rounded-sm">This booking is already past</h2>
        ) : (
          <h2></h2>
        )}

        { role == "admin" ? (
          <h2 className="text-[16px] bg-blue-950 p-1 rounded-sm text-white text-justify">{props.Subject}</h2>
        ) : (
          <h2 className="text-[16px] bg-blue-950 p-1 rounded-sm text-white text-justify">Only admin may view the agenda/purpose of
          the booking</h2>
        )}
        
        <div className="flex flex-row justify-between">
          <div className="my-3 flex flex-row items-center text-[16px] text-blue-950 gap-3 border-[1px] w-auto px-2
          rounded-sm border-blue-950 bg-gray-100">
            <MdDateRange/>
            <h2 className="font-semibold">{props.date.toString()}</h2>
          </div>
          <div className="my-3 flex flex-row items-center text-[16px] text-blue-950 gap-3 border-[1px] w-auto px-2
          rounded-sm border-blue-950 bg-gray-100">
            <IoMdTimer/>
            <h2 className="font-semibold">{props.start.toString().split(" ")[4]} - {props.end.toString().split(" ")[4]}</h2>
          </div>
        </div>
        
        <div className="text-blue-950 flex justify-between mt-1">
          <div className="flex flex-row gap-2 items-center">
            <IoPerson/>
            <h2 className="text-[14px]">{props.fullname}</h2>
          </div>
          <div className="flex flex-row gap-2 justify-left items-center">
            <MdEmail />
            <a className="text-[14px]" href={`mailto:${props.email}`}>{props.email}</a>
          </div>
        </div>
        
      </div>
    )
  }

  //quick info template object
  const quickTemplate = {
    header: headerTemplate,
    content: contentTemplate,
  }

  const eventSettings: EventSettingsModel = { dataSource: schedulerData, allowAdding: false, allowEditing: false, template: template }
  
  return (
    <div className="w-[80%] mx-auto my-10 p-3 rounded-md bg-white flex items-center justify-center shadow-lg border-t-8 rounded-t-md border-t-blue-700">
      <ScheduleComponent className="border-none rounded-lg" width='100%' height='550px' currentView='Month' selectedDate={dateVariable} eventSettings={eventSettings}
      quickInfoTemplates={quickTemplate}>
        <ViewsDirective>
          <ViewDirective option='Week' />
          <ViewDirective option='Month' />
          <ViewDirective option='Agenda' />
        </ViewsDirective>
        
        <Inject services={[Week, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  )
};

export default Calendar;
