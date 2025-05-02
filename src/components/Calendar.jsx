import React from 'react';

const Calendar = () => {
  return (
    <div className="w-full h-[calc(100vh-60px)] p-4">
      <iframe
        src="https://calendar.google.com/calendar/u/0/embed?src=iu1iul1u3n8ic3s78f4df15u4o@group.calendar.google.com"
        className="w-full h-full border-0"
        frameBorder="0"
        scrolling="no"
        title="Google Calendar"
      ></iframe>
    </div>
  );
};

export default Calendar;
