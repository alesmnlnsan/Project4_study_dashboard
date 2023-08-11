import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reminder.css'; 
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';

export default function Reminder({ user_id }) {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');
  const [showReminders, setShowReminders] = useState(false);

  useEffect(() => {
    fetchReminders();
  }, []); 

  const fetchReminders = () => {
    axios
      .get('/api/reminders', {
        params: { user_id },
      })
      .then((res) => {
        setReminders(res.data);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  const addReminder = () => {
    if (newReminder.trim() === '') return;

    const reminderData = {
      reminder: newReminder,
      user_id: user_id,
      reminder_date: new Date().toISOString(),
    };

    axios
      .post('/api/reminders', reminderData)
      .then((res) => {
        setReminders([...reminders, res.data]);
        setNewReminder('');
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };

  const toggleReminders = () => {
    setShowReminders(!showReminders);
  };

  return (
    <div className="reminder">
      <button className="toggle-button" onClick={toggleReminders}>
        {showReminders ? <FaToggleOff /> : <FaToggleOn />} REMINDERS
      </button>

      {showReminders && (
      <h2>Reminders</h2>
      )}
        <ul>
          {reminders.map((reminder) => (
            <li key={reminder.reminder_id}>{reminder.reminder}</li>
            ))}
        </ul>

      {showReminders && (
        <div className="add-reminder">
          <input
            type="text"
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
            placeholder="Add a new reminder..."
          />
          <button onClick={addReminder}>Add</button>
        </div>
      )}
    </div>
  );
}
