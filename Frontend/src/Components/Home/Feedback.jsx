import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from "react-redux";

// Css Files
import "react-lazy-load-image-component/src/effects/blur.css"
import '../../CSS/Home/Feedback.css';

// RTK
import { getAllFeedbacks } from "../../RTK/Thunks/FeedbackThunk";

function Feedback() {
  const dispatch = useDispatch();
  const { Feedbacks, loading, error } = useSelector((state) => state.feedbackStore);

  useEffect(() => {
    const fetchAllFeedback = async () => {
      try {
        await dispatch(getAllFeedbacks());
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllFeedback();
  }, [dispatch]);

  // Handle loading and error states
  if (loading) {
    return <div className="spinner-border text-light" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>; // Show a loading state
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Check if feedback exists
  if (!Feedbacks || Feedbacks.length === 0) {
    return <div>No feedback available.</div>;
  }

  return (
    <div className="container-fluid text-center">
      <h2 className='Roman lightOrange mb-5'>Feedback</h2>
      <Carousel data-bs-theme="dark">
      {Feedbacks.map((item, index) => (
  <Carousel.Item key={index}>
    <div className="FeedbackB container d-flex text-center flex-column justify-content-center align-items-center w-100">
      
      <div className="FeedBImg" style={{backgroundImage:`url(${item.userId?.image})`}}></div>
      <h5 className='mt-4'>
        <strong className='Roman lightOrange mb-0'>{item.userId?.name}</strong>
      </h5>
      <h6>{typeof item.cityAreaId?.name === 'string' ? item.cityAreaId?.name : item.cityAreaId?.name || 'Unknown Area'}</h6>
      <p className='mt-3' style={{ width: "60%" }}>{item.feedback}</p>
    </div>
  </Carousel.Item>
))}

      </Carousel>
    </div>
  );
}

export default Feedback;
