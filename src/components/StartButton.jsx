import React from 'react';

const StartButton = () => {
  const buttonStyle = {
    position: 'absolute',
    top: '600px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 20px',
    backgroundColor: 'orange',
    color: 'black',
    border: '1px solid black',
    borderRadius: '4px',
    cursor: 'pointer',
    zIndex: 200
  };

  return (
    <button style={buttonStyle}>
      Start
    </button>
  );
};

export default StartButton;
