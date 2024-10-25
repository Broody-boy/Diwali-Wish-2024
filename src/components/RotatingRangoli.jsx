import React, { useState, useEffect } from 'react';
import './RotatingRangoli.css';

const RotatingRangoli = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay the visibility after 1 second (1000ms)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`rangoli-container ${isVisible ? 'visible' : ''}`}>
      <img src="/Rangoli.png" alt="Rangoli" className="rotating-rangoli" />
    </div>
  );
};

export default RotatingRangoli;
