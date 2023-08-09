import { useState } from 'react';
import './App.css';
import Calendar from './components/calendar/Calendar';
import Spotify from './components/music/Spotify';
import ToDo from './components/toDo/Todo';
import Timer from './components/timer/Timer';
import Homepage from './components/pages/Homepage';
import LoginPage from './components/pages/LoginPage';
import { Route, Routes, Navigate } from 'react-router-dom'; 
import { getUser } from './utils/user_server';
import NavBar from './components/pages/Navbar';

function App() {
  const [user, setUser] = useState(getUser());

  function login(user) {
    setUser(user);
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <div className='App'>
      <header className="header">
        <h2>Study Dashboard</h2>
      </header>
      <div className="authentication">
        {user ? (
          <nav>
            <NavBar user={user} onLogout={logout} />
          </nav>
        ) : null}
        <Routes>
          {user && <Route path='/' element={<Homepage />} />}
          <Route path='/music' element={<Spotify />} />
          <Route path='/timer' element={<Timer />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/todo' element={<ToDo />} />
          <Route path='*' element={<Navigate to="/" />} /> 
        </Routes>
        {!user && (
          <LoginPage 
            onLogin={login} />
        )}
      </div>
    </div>
  );
}

export default App;
