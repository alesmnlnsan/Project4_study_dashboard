import React, { useState, useEffect } from 'react';
import Clock from './Clock';
import './Timer.css';

export default function PomodoroTimer() {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [workSeconds, setWorkSeconds] = useState(0);
  const [restMinutes, setRestMinutes] = useState(5);
  const [restSeconds, setRestSeconds] = useState(0);
  const [isWorkActive, setIsWorkActive] = useState(false);
  const [isRestActive, setIsRestActive] = useState(false);
  const [customWorkTime, setCustomWorkTime] = useState(25);
  const [customRestTime, setCustomRestTime] = useState(5);
  const [showTimer, setShowTimer] = useState(true);

  useEffect(() => {
    let workInterval, restInterval;

    if (isWorkActive && workMinutes >= 0 && workSeconds >= 0) {
      workInterval = setInterval(() => {
        if (workSeconds === 0) {
          if (workMinutes === 0) {
            clearInterval(workInterval);
            setIsWorkActive(false);
          } else {
            setWorkMinutes(workMinutes - 1);
            setWorkSeconds(59);
          }
        } else {
          setWorkSeconds(workSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(workInterval);
    }

    if (isRestActive && restMinutes >= 0 && restSeconds >= 0) {
      restInterval = setInterval(() => {
        if (restSeconds === 0) {
          if (restMinutes === 0) {
            clearInterval(restInterval);
            setIsRestActive(false);
          } else {
            setRestMinutes(restMinutes - 1);
            setRestSeconds(59);
          }
        } else {
          setRestSeconds(restSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(restInterval);
    }

    return () => {
      clearInterval(workInterval);
      clearInterval(restInterval);
    };
  }, [isWorkActive, isRestActive, workMinutes, workSeconds, restMinutes, restSeconds]);

  const toggleWorkTimer = () => {
    setIsWorkActive(!isWorkActive);
  };

  const toggleRestTimer = () => {
    setIsRestActive(!isRestActive);
  };

  const resetTimers = () => {
    setWorkMinutes(customWorkTime);
    setWorkSeconds(0);
    setRestMinutes(customRestTime);
    setRestSeconds(0);
    setIsWorkActive(false);
    setIsRestActive(false);
  };

  const handleCustomWorkTimeChange = (event) => {
    setCustomWorkTime(parseInt(event.target.value));
    resetTimers();
  };

  const handleCustomRestTimeChange = (event) => {
    setCustomRestTime(parseInt(event.target.value));
    resetTimers();
  };

  const toggleTimer = () => {
    setShowTimer(!showTimer);
  };

  return (
    <div>
      <button onClick={toggleTimer}>
        {showTimer ? 'Hide Timer' : 'Show Timer'}
      </button>
      {showTimer && (
        <div className='timer'>
          <div className='clock-container'>
            <Clock />
          </div>
          <div className='pomodoro-timer'>
            <h2>Pomodoro Timer</h2>
            <div className='timer-display'>
              <div className='work-timer'>
                Work: {workMinutes.toString().padStart(2, '0')}:{workSeconds.toString().padStart(2, '0')}
                <button onClick={toggleWorkTimer}>{isWorkActive ? 'Pause' : 'Start'}</button>
                <label htmlFor='customWorkTime'>Set Work Time (minutes):</label>
                <input
                  type='range'
                  id='customWorkTime'
                  value={customWorkTime}
                  onChange={handleCustomWorkTimeChange}
                  min='1'
                />
              </div>
              <div className='rest-timer'>
                Rest: {restMinutes.toString().padStart(2, '0')}:{restSeconds.toString().padStart(2, '0')}
                <button onClick={toggleRestTimer}>{isRestActive ? 'Pause' : 'Start'}</button>
                <label htmlFor='customRestTime'>Set Rest Time (minutes):</label>
                <input
                  type='range'
                  id='customRestTime'
                  value={customRestTime}
                  onChange={handleCustomRestTimeChange}
                  min='1'
                />
              </div>
            </div>
            <div className='timer-controls'>
              <button onClick={resetTimers}>Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
