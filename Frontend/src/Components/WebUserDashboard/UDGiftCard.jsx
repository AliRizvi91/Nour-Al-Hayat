import React, { useState } from 'react';
import '../../CSS/WebUserDashboard/UDGiftCard.css'; // Assuming you have the CSS file for styling
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

function UDGiftCard() {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useSelector((state) => state.userStore);

  // Handle undefined or invalid length gracefully
  const giftCardLength = user?.giftStore?.length || 0;

  return (
    <div className="container-fluid text-center d-flex flex-column justify-content-center align-items-center m-0 p-0">
      <h1 className='Script mb-5 mt-3' style={{ fontSize: "5.2rem" }}>Gift</h1>
      <div
        className="image-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src="/assets/images/DGiftImg.png" 
          className={`DGift ${isHovered ? 'fade-out' : ''}`} 
          alt="Gift Card" 
        />
        {isHovered && giftCardLength > 0 && (
          <Link to="/giftcard"> 
            <span className="link-text Roman lightOrange">{giftCardLength}</span>
          </Link>
        )}
      </div>
      <p className='mt-5' style={{ width: "60%" }}>
        Unlock the joy of giving with your GiftCard! Take a moment to check your balance and discover the possibilities that await. 
        Whether it’s a special treat for yourself or a thoughtful gift for someone else, your GiftCard is your ticket to delight.
        Don’t wait—explore what you can enjoy today!
      </p>
    </div>
  );
}

export default UDGiftCard;
