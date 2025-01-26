import React from 'react';
import '../CSS/RCardBtn.css';

const CardBtn = ({ text, position = 'relative', top = '0px', onClick }) => {
  const buttonStyle = {
    position: position,
    top: top,
  };

  return (
    <button className="RCardBtn" style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

export default CardBtn;
