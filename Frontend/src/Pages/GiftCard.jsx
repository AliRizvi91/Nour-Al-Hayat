import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// RTK
import { getAllGift } from '../RTK/Thunks/GifDataThunks.js';
import { addGift } from '../RTK/Slices/GiftSlice.js';
// CSS Files
import "react-lazy-load-image-component/src/effects/blur.css";
import '../CSS/GiftCard/GiftCard.css';
// Components
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import OffcanComponent from '../Components/Offcavas.jsx'; 
import MButton from '../Components/MButton';
// icons
import LocalGroceryStoreSharpIcon from '@mui/icons-material/LocalGroceryStoreSharp';

function GiftCard() {
  const { items, loading, error } = useSelector((state) => state.GiftStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Memoized fetch function to prevent re-fetching
  const fetchGift = useCallback(async () => {
    try {
       dispatch(getAllGift());
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchGift();
  }, [fetchGift]);

  const AddGift = useCallback(async() => {
    try {
      await  dispatch(addGift(items[0]));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);
  if (loading) {
    return <div className="spinner-border text-light" role="status"><span className="visually-hidden">Loading...</span></div>;
  }

  if (error) {
    return navigate('/page404');
  }
  
  console.log("GiftCard");

  return (
    <>
      <Navbar />
      <div className="container-fluid text-center d-flex flex-column justify-content-center align-items-center">
        <div className="w-100 d-flex justify-content-end mt-2 p-2">
          <OffcanComponent showIn={<LocalGroceryStoreSharpIcon className='icons offIcon' />} />
        </div>
        <h1 className='mb-1 mt-2 Script' style={{ fontSize: '4rem' }}>Luxury Awaits</h1>
        <h2 className='mb-5 mt-1 Roman lightOrange'>Gift the Ultimate Hotel Experience!</h2>
        <div className="container d-flex flex-column justify-content-center align-items-center">
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              {items.length > 0 && items[0]?.giftImages.slice(0, 3).map((image, index) => (
                <div className={`carousel-item GiftsC ${index === 0 ? 'active' : ''}`} key={index}>
                  <LazyLoadImage effect="blur" src={image} className="d-block Gifts w-80" alt={`Gift image ${index + 1}`} />
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className='d-flex flex-column align-items-center mb-5'>
            <div style={{ width: '60%' }}>
              <h6 className='me-4'>{`${items[0]?.description} ${items[0]?.price}$`}</h6>
            </div>
            <MButton text='ADD' onClick={AddGift} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default React.memo(GiftCard);
