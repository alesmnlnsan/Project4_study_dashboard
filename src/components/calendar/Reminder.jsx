/** @format */

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import './Reminder.css';

export default function Reminder({ user }) {
  //   const [reminders, setReminders] = useState([]);
  //   const [newReminder, setNewReminder] = useState('');
//   const [showReminders, setShowReminders] = useState(false);

  //   useEffect(() => {
  //     const fetchReminders = () => {
  //       axios
  //         .get(`/api/reminders/${user.user_id}`)
  //         .then((res) => {
  //           setReminders(res.data);
  //         })
  //         .catch((error) => {
  //           console.error('Error', error);
  //         });
  //     };

  //     fetchReminders();
  //   }, [user.user_id]);

  //   const addReminder = () => {
  //     if (newReminder.trim() === '') return;

  //     axios
  //       .post('/api/reminders', { reminder: newReminder, user_id: user.user_id })
  //       .then((res) => {
  //         setReminders([...reminders, res.data]);
  //         setNewReminder('');
  //       })
  //       .catch((error) => {
  //         console.error('Error', error);
  //       });
  //   };

//   const toggleReminders = () => {
//     setShowReminders(!showReminders);
//   };

  return (
    <div className="reminder">
      {/* <button className="toggle-button" onClick={toggleReminders}>
        {showReminders ? 'Hide Reminders' : 'Show Reminders'}
      </button>
  
      <h2>Reminders</h2>
      {showReminders && (
        <ul>
          {reminders.map((reminder) => (
            <li key={reminder.reminder_id}>{reminder.reminder}</li>
          ))}
        </ul>
      )}
    
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
      )} */}
    </div>
  );
}