import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import "../../CSS/SignUp/Signup.css";
import "../../CSS/WebAdminDashboard/Admin.css";
import ImageUploader from "../ImageUploader";
import MButton from "../MButton";
import DASCard from "../WebAdminDashboard/DASCard";
import CelebrationIcon from '@mui/icons-material/Celebration';
// RTK
import { postEvent, getAllEvent, DeleteEvent, updateEvent } from "../../RTK/Thunks/EventThunks";

function DAEvent() {
  const [EventState, setEventState] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    price: '',
    time: '',
    maxAttendees: '',
  });
  
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null); // Track the Event ID for updates
  const dispatch = useDispatch();
  const { eventItems, loading } = useSelector((state) => state.EventStore);

  const handleImageSelect = useCallback((file) => {
    setImage(file);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(EventState).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (image) {
        formData.append('image', image);
      }

      const resultAction = await dispatch(postEvent({ formData }));

      if (postEvent.fulfilled.match(resultAction)) {
        const successAudio = new Audio('/assets/sounds/success.mp3');
        successAudio.play();
        setEventState({
          title: '',
          description: '',
          location: '',
          date: '',
          price: '',
          time: '',
          maxAttendees: '',
        });
        toast.success('Event created successfully');
      } else {
        toast.error('Failed to create Event');
        const errorAudio = new Audio('/assets/sounds/error.mp3');
        errorAudio.play();
      }
    } catch (error) {
      console.error('Error creating Event:', error);
      toast.error('Failed to create Event');
      const errorAudio = new Audio('/assets/sounds/error.mp3');
      errorAudio.play();
    }
  };

  const handleDelete = useCallback((id) => {
    try {
      dispatch(DeleteEvent({ _id: id }));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      dispatch(getAllEvent());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const handleURData = (id) => {
    const FindEvent = eventItems.find((Event) => Event._id === id);
    if (FindEvent) {
      setEventState({
        title: FindEvent?.title || '',
        description: FindEvent?.description || '',
        location: FindEvent?.location || '',
        date: FindEvent?.date || '',
        price: FindEvent?.price || '',
        time: FindEvent?.time || '',
        maxAttendees: FindEvent?.maxAttendees || '',
      });
      setShow(true);
      setCurrentEventId(id); // Set the current Event id for update
      setImage(FindEvent?.image)
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!currentEventId) return; // Ensure there's a Event ID to update

    try {
      const formData = new FormData();
      Object.entries(EventState).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (image) {
        formData.append('image', image);
      }

      const resultAction = await dispatch(updateEvent({ Id: currentEventId, formData }));

      if (updateEvent.fulfilled.match(resultAction)) {
        const successAudio = new Audio('/assets/sounds/success.mp3');
        successAudio.play();
        setEventState({
          title: '',
          description: '',
          location: '',
          date: '',
          price: '',
          time: '',
          maxAttendees: '',
        });
        toast.success('Event updated successfully');
      } else {
        toast.error('Failed to update Event');
        const errorAudio = new Audio('/assets/sounds/error.mp3');
        errorAudio.play();
      }
    } catch (error) {
      console.error('Error updating Event:', error);
      toast.error('Failed to update Event');
      const errorAudio = new Audio('/assets/sounds/error.mp3');
      errorAudio.play();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventState((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <h3 className='pt-5'>...Loading</h3>;
  }

  return (
    <>
      <div className="container-fluid pt-5 d-flex flex-column justify-content-center align-items-center">
        <h1 className="Script">{show ? 'Update Event' : 'Create Event'}</h1>

        {/* Form */}
        <form className="smSpage DARoomForm position-relative p-4 mb-3 mx-3 d-flex flex-column align-items-center text-center">
          {/* Event Image */}
          <ImageUploader
            originalFilePath={show ? image : null}
            onImageSelect={handleImageSelect}
            Width="16rem"
            Height="9rem"
            BRadius="2px"
          />

          <input
            className="form-control py-2 mt-4 mb-1 text-center"
            type="text"
            name="title"
            value={EventState.title}
            onChange={handleChange}
            placeholder="Tiltle"
          />
          <textarea
            className="form-control py-2 mb-1 text-center"
            name="description"
            value={EventState.description}
            onChange={handleChange}
            placeholder="Description"
            rows={5}
          />
          <input
            className="form-control py-2 mb-1 text-center"
            type="text"
            name="location"
            value={EventState.location}
            onChange={handleChange}
            placeholder="Location"
          />
          {/* Block 1 */}
          <div className="d-flex align-items-center justify-content-center">
            <input
              className="form-control py-2 me-1 mb-1 text-center"
              type="date"
              name="date"
              value={EventState.date}
              onChange={handleChange}
              placeholder="Date"
            />
            
            <input
              className="form-control py-2 ms-1 mb-1 text-center"
              type="text"
              name="time"
              value={EventState.time}
              onChange={handleChange}
              placeholder="Time"
            />
          </div>

          {/* Block 2 */}
          <div className="d-flex align-items-center justify-content-center">
          <input
              className="form-control py-2 mx-1 mb-1 text-center"
              type="number"
              name="price"
              value={EventState.price || ''}
              onChange={handleChange}
              placeholder="Price"
            />
            <input
              className="form-control py-2 mx-1 mb-1 text-center"
              type="number"
              name="maxAttendees"
              value={EventState.maxAttendees}
              onChange={handleChange}
              placeholder="Max-Attendess"
            />
          </div>

          {show ? (
            <MButton text="Update" onClick={handleUpdate} />
          ) : (
            <MButton text="Submit" onClick={handleSubmit} />
          )}
        </form>

        {/* All Events */}
        <div className="container DAEventContainer">
          <h1 className="Script">Events</h1>
          {Array.isArray(eventItems) && eventItems.length > 0 ? (
            eventItems.map((Event) => (
              <DASCard
                key={Event._id}
                Icons={<CelebrationIcon className='icons DASIcon' />}
                ID={Event._id}
                Name={Event.title}
                Para={Event.description}
                Delete={() => handleDelete(Event._id)}
                Edit={() => handleURData(Event._id)}
              />
            ))
          ) : (
            <p>No Events available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default DAEvent;
