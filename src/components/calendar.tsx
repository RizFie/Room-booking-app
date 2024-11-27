"use client";

import React from "react";

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
  data: BookingProps[]; // Expect an array of bookings
}

const Calendar = ({ data }: CalendarProps) => {
  return (
    <div>
      <h1>Bookings</h1>
      {data.map((booking) => (
        <div key={booking.bookingId} className="p-4 border-b">
          <p><strong>Purpose:</strong> {booking.purpose}</p>
          <p><strong>Start Time:</strong> {booking.startTime.toString()}</p>
          <p><strong>End Time:</strong> {booking.endTime.toString()}</p>
          <p><strong>Place:</strong> {booking.placeId}</p>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
