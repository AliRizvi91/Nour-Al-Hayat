import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../../CSS/WebUserDashboard/UDProfile.css";
import MButton from "../MButton";
import { getAllFeedbacks, postFeedback } from "../../RTK/Thunks/FeedbackThunk";
import { toast } from 'react-toastify'; // Import toast
import { ActionOurFeedbacks } from "../../RTK/Slices/FeedbackSlice";
import ImageUploader from "../ImageUploader";
import { userUpdate } from '../../RTK/Thunks/UserThunk';

const UDProfile = () => {
  const [feedback, setFeedback] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.userStore);
  const { Feedbacks } = useSelector((state) => state.feedbackStore);
  
  const OurFeedbacks = Feedbacks.filter((feed) => feed.userId?._id === user._id);
  
  // Handle the change of feedback text
  const handleChange = useCallback((e) => {
    const { value } = e.target;
    setFeedback(value);
  }, []);
  
  // Handle form submission
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (feedback.trim() === "") {
      toast.info("Please enter some feedback!");
      return;
    }

    // Make sure the user ID is available before submitting
    if (user && user._id) {
      dispatch(postFeedback({ feedback, userId: user._id, cityAreaId: user.cityAreaId?._id }))
        .then((action) => {
          if (action.type === postFeedback.fulfilled.type) {
            dispatch(getAllFeedbacks());
            dispatch(ActionOurFeedbacks({ userId: user._id }));
            
            setFeedback(""); // Clear the feedback input after successful submission
          }
        })
        .catch((error) => {
          console.error("Error submitting feedback:", error);
          toast.error("Failed to submit feedback. Please try again.");
        });
    } else {
      console.error("User ID is not available");
      toast.error("User information is missing!");
    }
  }, [feedback, user, dispatch]);

  useEffect(() => {
    dispatch(getAllFeedbacks());
    if (user?._id) {
      dispatch(ActionOurFeedbacks({ userId: user._id }));
    }
  }, [dispatch, user]);

  const handleImageSelect = useCallback((file) => {
    setImage(file);
    
  }, []);

  useEffect(() => {
    if (image) {
      const handleSubmitImage = async () => {
        try {
        const formData = new FormData();
        
        if (image) {
          formData.append('image', image);
          formData.append('id', user?._id);  // Ensure this is passed correctly
        }
        
        
          // Dispatch userUpdate with formData
          const dispatchImage = async()=>{
            dispatch(userUpdate({formData:formData,id:user?._id}));
          }
          await dispatchImage()
          
        } catch (error) {
          console.error('Error Update Image:', error);
          toast.error('Failed to Update Image');
          const errorSound = new Audio('/assets/sounds/error.mp3');
          errorSound.play();
        }
      };
      handleSubmitImage();
    }
  }, [image]);

  return (
    <>
      <h1 className='Script mt-5'>Profile</h1>
      <div className='container-fluid mainContainer d-flex flex-row justify-content-center px-5 pt-3 pb-5'>
        
        {/* Block 1 */}
        <div className="block1 d-flex flex-column justify-content-center align-items-center py-4 px-4">
          <ImageUploader originalFilePath={null} onImageSelect={handleImageSelect} DefaultImg={true} BRadius={'50%'} />
          <h1 className='mb-0 Roman lightOrange'>{user?.name}</h1>
          <p>{user?.email}</p>
          <div className='text-start d-flex flex-column'>
            <h6><strong>About Me</strong></h6>
            <p>I’m {user?.name}, and I strive to live my life with kindness, honesty, and empathy, always aiming to treat others with respect and understanding.</p>
            <div className='w-100 d-flex justify-content-between align-items-center'>
              <strong className='lightOrange'>City</strong>
              <p className='mb-1'>{user?.cityAreaId?.name}</p>
            </div>
            <div className='w-100 d-flex justify-content-between align-items-center'>
              <strong className='lightOrange'>Mobile</strong>
              <p className='mb-1'>+ {user?.contactNo}</p>
            </div>
          </div>
        </div>

        <div className='d-flex flex-column justify-content-center align-items-center w-100 mx-2'>
          {/* Block 2 */}
          <div className="block2 d-flex flex-column justify-content-center align-items-start mb-1 p-3">
            <div className="input-group w-100">
              <textarea
                className="form-control mb-2"
                aria-label="With textarea"
                cols="100%"
                rows="5"
                placeholder="Post a new Comment!"
                value={feedback}
                onChange={handleChange}
              ></textarea>
            </div>
            <MButton text="Submit" onClick={handleSubmit} />
          </div>

          {/* Block 3 */}
          <div className="block3 mt-1 p-3">
            <div className='d-flex flex-column justify-content-center align-items-start'>
              {/* Our Feedback */}
              {Array.isArray(OurFeedbacks) && OurFeedbacks.length > 0 ? (
                OurFeedbacks.map((feed, index) => (
                  <div className="OFeed p-1 m-1 d-flex w-100" key={index}>
                    <div className='OFeedpara text-start py-2 px-3'>
                      <div className='d-flex align-items-center'>
                        <div className='OFeedImg mx-2' style={{ backgroundImage: `url(${feed.userId?.image})` }}></div>
                        <strong className='lightOrange Roman'>{feed.userId?.name}</strong>
                      </div>
                      <p className='mt-2'>{feed?.feedback}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No feedback available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UDProfile;
