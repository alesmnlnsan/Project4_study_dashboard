/** @format */

import './App.css';
import Calendar from './components/calendar/Calendar';
import Spotify from './components/music/Spotify';
import ToDo from './components/toDo/Todo';
import Timer from './components/timer/Timer';
import { useState } from 'react';
import Homepage from './components/pages/Homepage';
import LoginPage from './components/pages/LoginPage';

function App() {

  const [page, setPage] = useState("home")

  function renderPage() {
    switch(page){
      case "login": return <LoginPage />
      case "home": return <Homepage />
      case "music": return <Spotify />
      case "timer": return <Timer />
      case "calendar": return <Calendar />
      case "todo": return <ToDo />
      default: return <Homepage />
    }  
  }

  return (
    <div className='App'>
      {renderPage()}
      {/* <Timer />
      <Calendar />
      <ToDo />
      <Spotify /> */}
    </div>
  );
}

export default App;
