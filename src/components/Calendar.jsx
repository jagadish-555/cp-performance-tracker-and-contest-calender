// Calendar.jsx
import React from 'react';

const Calendar = () => {
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <iframe
        src="https://calendar.google.com/calendar/u/0/embed?src=iu1iul1u3n8ic3s78f4df15u4o@group.calendar.google.com"
        style={{ border: 0 }}
        width="800"
        height="600"
        frameBorder="0"
        scrolling="no"
        title="Google Calendar"
      ></iframe>
    </div>
  );
};

export default Calendar;  // Default export
