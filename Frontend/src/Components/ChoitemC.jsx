import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { deleteGift, minusGift, addGift } from '../RTK/Slices/GiftSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// Css Files
import "../CSS/ChoitemC.css";
import "react-lazy-load-image-component/src/effects/blur.css"

function ChoitemC() {
  const { items, totalQuantity, totalPrice, loading, error } = useSelector((state) => state.GiftStore);
  const dispatch = useDispatch();
  
  // Local state for quantity
  const [quantity, setQuantity] = useState(totalQuantity);

  // Update local quantity whenever totalQuantity changes
  useEffect(() => {
    setQuantity(totalQuantity);
  }, [totalQuantity]);

  const handleChange = (event) => {
    const value = Math.max(0, Number(event.target.value)); // Ensure it's non-negative
    setQuantity(value);
  };

  if (loading) {
    return <div class="spinner-border text-light" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>; // Show a loading state
  }

  if (error) {
    return <div>Error loading gifts!</div>;
  }

  return (
    <div className='itemC d-flex align-items-center p-1 mx-1 my-3' style={{ justifyContent: "space-between" }}>
      <LazyLoadImage effect="blur" src="/assets/images/GiftIcon.png" alt="Error" style={{ width: "10rem", height: "100%" }} />
      <div className="d-flex flex-column align-items-center" style={{ justifyContent: "center" }}>
        <div className='d-flex flex-row text-center' style={{ height: "2rem" }}>
          <button type="button" className="btn btn-primary btnS" onClick={() => dispatch(addGift(items[0]))}><AddIcon /></button>
          <input
            type="number"
            className="form-control InputN"
            value={quantity}
            onChange={handleChange}
            placeholder={totalQuantity}
          />
          <button type="button" className="btn btn-primary btnS" onClick={() => dispatch(minusGift({ id: items[0].id }))}><RemoveIcon /></button>
        </div>
        <div className='d-flex align-items-center justify-content-center text-center pt-3 Roman'>
          <h4>Total Price: <span className='lightOrange'> {totalPrice}$</span></h4>
        </div>
      </div>
      <div>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch(deleteGift())}></button>
      </div>
    </div>
  );
}

export default ChoitemC;
