/** @format */

import * as React from 'react';
import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export default function StaticDatePickerLandscape() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [reminder, setReminder] = useState('');
  
  useEffect(() => {
    // if (selectedDate) {
    // }
  }, [selectedDate]);
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleReminderChange = (e) => {
    setReminder(e.target.value);
  };

  const handleSaveReminder = () => {
    
  };

  return (
    <div>
        <h1>Calendar</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          orientation='landscape'
          value={selectedDate}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
      {selectedDate && (
        <div>
          <h3>Reminder for {selectedDate.format('MMMM D, YYYY')}</h3>
          <textarea value={reminder} onChange={handleReminderChange} />
          <button onClick={handleSaveReminder}>Save Reminder</button>
        </div>
      )}
    </div>
  );
}
