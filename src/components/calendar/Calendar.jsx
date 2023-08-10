import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './Calendar.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker, PickersDay } from '@mui/x-date-pickers';

export default function StaticDatePickerLandscape() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(true);
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    fetchHolidays(selectedDate);
  }, [selectedDate]);

  const fetchHolidays = async (date) => {
    try {
      if (date) {
        const apiKey = 'f136db0a-22d9-409b-a093-0cb10c06f77f';
        const url = `https://holidayapi.com/v1/holidays?key=${apiKey}&country=AU&year=2022`;

        const response = await fetch(url);
        if (response.ok) {
          const holidayData = await response.json();
          setHolidays(holidayData.holidays);
        } else {
          console.error('Error fetching holidays. Status:', response.status);
        }
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleToggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className="calendar-container">
      <button className="toggle-button" onClick={handleToggleCalendar}>
        {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
      </button>
      <div className="calendar-wrapper">
        {showCalendar && (
          <div className="calendar">
            <h1>Calendar</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                orientation="landscape"
                value={selectedDate}
                onChange={handleDateChange}
                renderDay={(date, _, DayProps) => (
                  <PickersDay
                    {...DayProps}
                    onClick={() => handleDateChange(date)}
                    style={{
                      backgroundColor: selectedDate === date ? 'lightblue' : undefined,
                    }}
                  >
                    {date.getDate()}
                  </PickersDay>
                )}
              />
            </LocalizationProvider>
          </div>
        )}
        <div className="selected-date">
          {selectedDate && (
            <>
              <h2>Selected Date:</h2>
              <p>{format(new Date(selectedDate), 'MMMM d, yyyy')}</p>
              <h2>Holidays:</h2>
              <ul>
                {holidays
                  .filter((holiday) => holiday.date === format(new Date(selectedDate), 'yyyy-MM-dd'))
                  .map((holiday) => (
                    <li key={holiday.date}>{holiday.name}</li>
                  ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}  