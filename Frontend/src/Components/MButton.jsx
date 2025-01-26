// AnimatedButton.js
import React from 'react';
import '../CSS/MButton.css';

const AnimatedButton = ({ text,type,onClick }) => {
  return (
    <button type={type} onClick={onClick} className="animated-button">
      {text}
    </button>
  );
};

export default AnimatedButton;
