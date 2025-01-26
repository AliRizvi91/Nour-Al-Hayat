import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ChoitemC from '../Components/ChoitemC';
import SendIcon from '@mui/icons-material/Send';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import { clearAllGift } from '../RTK/Slices/GiftSlice.js';

// Css Files
import '../CSS/Offcanvas.css';

const OffcanComponent = ({ showIn }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { Gift, totalQuantity } = useSelector((state) => state.GiftStore);
  const { user } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ref to track if toast has been shown
  const toastShown = useRef({
    success: false,
    canceled: false,
  });

  // Handle opening and closing of the offcanvas
  const handleClose = useCallback(() => setShow(false), []);
  const handleShow = useCallback(() => setShow(true), []);

  // Payment Integration
  const makePayment = async () => {
    setLoading(true);
    const stripe = await loadStripe('pk_test_51Q9h7JAS6IyDfeB2jW5X1XXzcC89s3ckJYwycOCN8KUQnVbBrCiNCxpHGLWy4sSVNt6MayiI1geMf9nlzpEvyRtv007llhpnkl');

    const giftsData = Gift.map(item => ({
      description: item.description,
      price: item.price,
    }));

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/giftcard/checkout`, { Gifts: giftsData, Quantity: totalQuantity });
      const session = response.data;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error);
        toast.error('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  console.log("Offcavas");
  

  useEffect(() => {
    const savingGift = async () => {
      try {
        const response = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/user/${user._id}`, { giftStore: Gift});
        
      } catch (error) {
        console.error(error);
        toast.error('Failed to save booking data. Please try again.');
      }
    };

    const params = new URLSearchParams(window.location.search);

    const handleSavingGift = async () => {
      if (params.get('success') && Gift.length > 0) {
        if (!toastShown.current.success) {
          toast.success('Congratulations! Your payment was successful.');
          toastShown.current.success = true;
        }

        // Saving gift logic (optional, commented for now)
        await savingGift();
        dispatch(clearAllGift());
        navigate('/giftcard')
      } else if (params.get('canceled') && !toastShown.current.canceled) {
        toast.error('Sorry! Your payment was canceled.');
        toastShown.current.canceled = true;
      }
    };

    handleSavingGift();
  }, [Gift, user, dispatch]);

  return (
    <>
      <div className='Scircle'>
        <strong>{totalQuantity}</strong>
      </div>
      <Button variant="primary" id="storeIcon" onClick={handleShow}>
        {showIn}
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h3><strong>Store</strong></h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {Gift.length === 0 ? (
            <p>No Gift</p>
          ) : (
            <ChoitemC />
          )}
          <button
            type="button"
            className="btn btn-success checkOut Roman"
            onClick={makePayment}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Loading...
              </>
            ) : (
              <>CheckOut <SendIcon className='icons' /></>
            )}
          </button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default React.memo(OffcanComponent);
