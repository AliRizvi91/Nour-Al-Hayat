import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded';
import BedroomChildRoundedIcon from '@mui/icons-material/BedroomChildRounded';
import SendIcon from '@mui/icons-material/Send';
import Spinner from 'react-bootstrap/Spinner';
import StoreRCard from "../Components/StoreRCard";
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import Footer from "../Components/Footer";
import { fetchstatus } from '../RTK/Slices/StatusSlice';
import { removeAllBookRooms } from '../RTK/Slices/RoomSlice';

function BookStore() {
  const [SLoading, setSLoading] = useState(false);
  const [BookRoomData, setBookRoomData] = useState([]);
  const navigate = useNavigate()

  const { bookRooms, totalQuantity, totalPrice, loading, error } = useSelector((state) => state.roomStore);
  const { user } = useSelector((state) => state.userStore);
  const { Sitems, StatusLoading } = useSelector((state) => state.StatusStore);
  const Status = Sitems[0]?._id;
  const dispatch = useDispatch();
  const toastShown = useRef({ success: false, canceled: false });

  useEffect(() => {
    dispatch(fetchstatus());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (error) return <div>Error fetching rooms: {error.message}</div>;

  const makePayment = async () => {
    setSLoading(true);
    const stripe = await loadStripe('pk_test_51Q9h7JAS6IyDfeB2jW5X1XXzcC89s3ckJYwycOCN8KUQnVbBrCiNCxpHGLWy4sSVNt6MayiI1geMf9nlzpEvyRtv007llhpnkl');

    const roomData = bookRooms.map(item => ({
      title: item.title,
      price: item.price,
    }));

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/booking/checkout`, {
        roomData: roomData,
        Quantity: totalQuantity,
      });

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
      setSLoading(false);
    }
  };

  useEffect(() => {
    if (Status && bookRooms.length > 0 && user) {
      const data = bookRooms.map(item => ({
        userId: user._id,
        roomId: item.Id,
        startDate: item.entrance,
        endDate: item.departure,
        guests: item.Guest,
        amount: totalPrice,
        statusId: Status,
      }));
      setBookRoomData(data);
    }
  }, [Status, bookRooms, user]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const saveBooking = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/booking`, { BookRoomdata: BookRoomData });
        if (response.status === 201) {
          toast.success('Room bookings confirmed!');
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to save booking data. Please try again.');
      }
    };

    const handleSaveBooking = async()=>{

    if (params.get('success') && BookRoomData.length > 0) {
      await saveBooking()
      dispatch(removeAllBookRooms())
      
      if (!toastShown.current.success) {
        toast.success('Congratulations! Your payment was successful.');
        toastShown.current.success = true;
        navigate('/checkbooking')
      }
    } else if (params.get('canceled') && !toastShown.current.canceled) {
      toast.error('Sorry! Your payment was canceled.');
      toastShown.current.canceled = true;
    }
  }
  handleSaveBooking()
  }, [BookRoomData]);

  return (
    <>
      <div className="container-fluid m-0 p-0 text-center d-flex flex-column align-items-center justify-content-center">
        {/* Custom Navbar */}
        <div className="container-fluid text-center d-flex flex-row justify-content-center align-items-center">
          <Link to='/checkbooking'>
            <div className='d-flex flex-row justify-content-center align-items-center'>
              <InsertInvitationRoundedIcon className='icons' />
              <h4 className='Roman mx-3 my-4'>Flexible Dates</h4>
            </div>
          </Link>
          <hr style={{ border: "2px solid white", height: "3rem" }} />
          <Link to='/rooms'>
            <div className='d-flex flex-row justify-content-center align-items-center'>
              <h4 className='Roman mx-3 my-4'>Rooms & rates</h4>
              <BedroomChildRoundedIcon className='icons' />
            </div>
          </Link>
        </div>

        <LazyLoadImage
          effect="blur"
          className="d-block w-100"
          src="/assets/images/BStoreBG.png"
          alt="Store Background"
        />

        <h1 className='Script' style={{ fontSize: "5rem" }}>Store</h1>

        {/* Render StoreRCard for each room in bookRooms */}
        {Array.isArray(bookRooms) && bookRooms.length > 0 ? (
          bookRooms.map((book) => (
            <StoreRCard
              key={book.Id}
              Id={book.Id}
              image={book.image}
              RNumber={book.RNumber}
              title={book.title}
              description={book.description}
              price={book.price}
              Entrance={book.entrance}
              Departure={book.departure}
            />
          ))
        ) : (
          <p className='mb-5 lightOrange'>Kindly return and choose your perfect room!</p>
        )}

        <div className='mt-5'>
          <h3 className='Roman'>{`TOTAL PRICE: ${totalPrice}$`}</h3>
          <button
            type="button"
            className="btn btn-success checkOut Roman mb-5"
            onClick={makePayment}
            disabled={SLoading}
          >
            {user && SLoading ? (
              <>
                <Spinner animation="border" size="sm" /> Loading...
              </>
            ) : (
              <>CheckOut <SendIcon className='icons' /></>
            )}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookStore;
