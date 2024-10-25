import React from 'react';
import './DiyaAnimation.css'; // Import the CSS file

const DiyaAnimation = () => {
  return (
    <div className="diya-container">
      <div className="shadow"></div>
      <div className="diya">
        <div className="line-1"></div>
        <div className="line-2"></div>
        <div className="dots"></div>
      </div>
      <div className="inside">
        <div className="light"></div>
        <div className="flame"></div>
      </div>
    </div>
  );
};

export default DiyaAnimation;
