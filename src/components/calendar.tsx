"use client";

import React from "react";
import {
  Week, Month, Agenda, ScheduleComponent, ViewsDirective, ViewDirective, EventSettingsModel, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop,
  TimelineViews
} from '@syncfusion/ej2-react-schedule';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('ORg4AjUWIQA/Gnt2UlhhQlVMfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX9SdE1jWH5WdH1VQGZd');

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
  place: Place;
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
    };
  });

  //console.log(schedulerData)

  //cell template
  const template = (props: any) => {
    return (
      <div className="p-[0.4px] h-full w-auto overflow-hidden mt-1">
        <h3 className="text-xs font-medium truncate w-32">{props.placeName}</h3>
      </div>
    );
  };

  //Header template
  const headerTemplate = (props: any) => {
    return(
      <div className="bg-gradient-to-r from-fuchsia-600 to-blue-800 rounded-t-md">
        <h1 className="p-2 text-xl font-medium text-white">{props.placeName}</h1>
      </div>
    )
  }

  //Content template
  const contentTemplate = (props: any) => {
    return(
      <div className="">
        <p className="text-lg text-gray-600">{props.placeName}</p>
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
