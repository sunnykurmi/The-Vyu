"use client"
import React, { useState, useEffect } from 'react';

const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); 

    return () => clearInterval(timer); 
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return <p   id='city_name' className='text-xs  uppercase'>{formattedTime}</p>;
};

export default LiveClock;
