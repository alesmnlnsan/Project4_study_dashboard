import { useState } from 'react';
import './App.css';
import Calendar from './components/calendar/Calendar';
import Spotify from './components/music/Spotify';
import ToDo from './components/toDo/Todo';
import Timer from './components/timer/Timer';
import Homepage from './components/pages/Homepage';
import LoginPage from './components/pages/LoginPage';
import { Route, Routes } from 'react-router-dom';
import { getUser } from './utils/user_server';
import NavBar from './components/pages/Navbar';
import Reminder from './components/calendar/Reminder';

function App() {
  const [user, setUser] = useState(getUser());
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(user));

  function login(user) {
    setUser(user);
    setIsLoggedIn(true);
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
  }

  return (
    <div className='App'>
      <div className='header-container'>
        <header className='header'>
          <h2>Study Dashboard</h2>
        </header>
        {isLoggedIn && (
          <nav>
            <NavBar user={user} onLogout={logout} />
          </nav>
        )}
      </div>
      <div className='authentication'>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path='/' element={<Homepage />} />
              <Route path='/music' element={<Spotify />} />
              <Route path='/timer' element={<Timer />} />
              <Route path='/calendar' element={<Calendar />} />
              <Route path='/reminder' element={<Reminder user_id={user.id} />} />
              <Route path='/todo' element={<ToDo user_id={user.id} />} />
            </>
          ) : (
            <Route path='*' element={<LoginPage onLogin={login} />} />
          )}
        </Routes>
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
