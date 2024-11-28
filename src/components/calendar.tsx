"use client";

import React from "react";
import {
  Week, Month, Agenda, ScheduleComponent, ViewsDirective, ViewDirective, EventSettingsModel, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop,
  TimelineViews
} from '@syncfusion/ej2-react-schedule';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('ORg4AjUWIQA/Gnt2UlhhQlVMfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX9SdE1jWH5WdH1VQGZd');

interface BookingProps {
  bookingId: string;
  startTime: Date;
  endTime: Date;
  date: Date;
  purpose: string;
  userId: string;
  placeId: string;
}

interface CalendarProps {
  data: BookingProps[];
}

const Calendar = ({ data }: CalendarProps) => {

  const dateVariable = new Date();

  //Data
  const schedulerData = data.map((booking) => {

    const splitDate = booking.date.toISOString().split("T")[0];
    const splitStartTime = booking.startTime.toISOString().split('T')[1];
    const splitEndTime = booking.endTime.toISOString().split('T')[1];

    console.log(splitEndTime)

    const New = new Date(`${splitDate}T${splitStartTime}`)
    console.log("New date: ",New)

    return {
      Id: booking.bookingId,
      Subject: booking.purpose,
      StartTime: new Date(`${splitDate}T${splitStartTime}`),
      EndTime: new Date(`${splitDate}T${splitEndTime}`),
    };
  });

  console.log(schedulerData)

  //template
  const template = () => {
    return (
      <div>
        <h1>Hi</h1>
      </div>
    )
    
    
  }

  const eventSettings: EventSettingsModel = { dataSource: schedulerData, allowAdding: false, allowEditing: false,  }
  
  return (
    <div className="w-[80%] mx-auto my-10 rounded-md">
      <ScheduleComponent width='100%' height='550px' currentView='Month' selectedDate={dateVariable} eventSettings={eventSettings}>
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
