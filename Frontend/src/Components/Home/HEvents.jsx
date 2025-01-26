import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvent } from '../../RTK/Thunks/EventThunks'; // Adjust the path as needed
import "../../CSS/Home/HEvents.css";
import EventCard from "../../Components/EventCard";
import MButton from "../MButton";

function HEvents() {
  const navigate =useNavigate()
  const dispatch = useDispatch();
  const { eventItems, loading, error } = useSelector((state) => state.EventStore);

  useEffect(() => {
    dispatch(getAllEvent());
  }, [dispatch]);

  // Get the last two events
  const lastTwoEvents = eventItems.slice(-2);

  if (loading) {
    return <div className="spinner-border text-light" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>; // Show a loading state
  }

  const goEvents = ()=>{
    navigate('/page404')
  }

  return (
    <>
      <div className="container-fluid text-center">
        <p className='Roman lightOrange' style={{ textTransform: "uppercase", fontStyle: "initial" }}>Becoming Events</p>
        <h1 className='Roman mb-5'>News/Events</h1>

        <div className="container-xxl HEXContainer d-flex flex-rows justify-content-center align-items-center">
          
          {/* Column 1 */}
          <div className="col d-flex flex-row mx-1 mb-2" id='HECCol'>
            {error && <p>Error: {error}</p>}
            {lastTwoEvents.map((event) => (
              <EventCard
                key={event._id} // Assuming each event has a unique id
                BTN={'Read More'}
                image={event.image} // Adjust the property names based on your API response
                date={`Date :- ${new Date(event.date).toISOString().split('T')[0]}`}
                title={event.title}
                description={event.description}
                time={event.time}
                location={event.location}
                price={event.price}
                maxAttendees={event.maxAttendees}
              />
            ))}
          </div>
          {/* Column 2 */}
          <div className="col mx-1 HEText">
            <p style={{ width: "12rem" }}>Join us for an inspiring lineup of upcoming events at Nour Al-Hayat, where community and creativity come together!</p>
            <h2 className='Script lightOrange'>Previous News/Events</h2>
            <MButton text='Events' onClick={goEvents} />
            
          </div>
          
        </div>
      </div>
    </>
  )
}

export default HEvents;
