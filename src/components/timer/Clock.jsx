import React, { useEffect, useState } from 'react';
import './Clock.css';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';

export default function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showClock, setShowClock] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');

    return (
      <div className="digit-container">
        <div className="digit">{hours.charAt(0)}</div>
        <div className="digit">{hours.charAt(1)}</div>
        <div className="digit-separator">:</div>
        <div className="digit">{minutes.charAt(0)}</div>
        <div className="digit">{minutes.charAt(1)}</div>
        <div className="digit-separator">:</div>
        <div className="digit">{seconds.charAt(0)}</div>
        <div className="digit">{seconds.charAt(1)}</div>
      </div>
    );
  };

  const handleToggleClock = () => {
    setShowClock(!showClock);
  };

  return (
    <div className="clock">
      <button className='toggle-btn' onClick={handleToggleClock}>
        {showClock ? <FaToggleOff /> : <FaToggleOn />} CLOCK
      </button>
      <br />
      <br />
      {showClock && (
        <>
          {formatTime(currentTime)}
        </>
      )}
    </div>
  );
}
