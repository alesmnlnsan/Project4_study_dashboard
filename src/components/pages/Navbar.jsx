import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function NavBar({ user, onLogout }) {
  return (
    <div className="navbar">
      {/* <div className="navbar-brand">Study Dashboard</div> */}
      <ul className="navbar-links">
        {user && (
          <>
            <li><Link className="navbar-link" to="/">Homepage</Link></li>
            <li><Link className="navbar-link" to="/music">Spotify</Link></li>
            <li><Link className="navbar-link" to="/timer">Timer</Link></li>
            <li><Link className="navbar-link" to="/calendar">Calendar</Link></li>
            <li><Link className="navbar-link" to="/todo">ToDo's</Link></li>
            {user && <div className="navbar-user">Logged in as {user.email}</div>}
            <li><button className="navbar-logout" onClick={onLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </div>
  );
}