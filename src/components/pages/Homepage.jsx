import React from 'react';
import Calendar from '../calendar/Calendar';
import Spotify from '../music/Spotify';
import ToDo from '../toDo/Todo';
import Timer from '../timer/Timer';
import Reminder from '../calendar/Reminder';
import './Homepage.css';


export default function Homepage() {
  return (
    <div className="homepage-container">
      <div className="left-sidebar">
        <ToDo />
      </div>
      <div className="top-middle">
        <Timer />
      </div>
      <div className="right-sidebar">
        <Calendar />
      </div>
      <div className="middle">
        <Reminder /> 
        {/* user={user} */}
      </div>
      <div className="bottom-bar">
        <Spotify />
      </div>
    </div>
  );
}
