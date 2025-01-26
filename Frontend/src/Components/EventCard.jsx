import React from 'react'
import {Link} from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import EventModal from "./EventModal";

// Css Files
import "react-lazy-load-image-component/src/effects/blur.css"
import "../CSS/EventCard.css"

function EventCard({image,date,title,description,time,location,price,maxAttendees}) {
  return (
    <>

      <div className="card Ebody mx-2 my-1" style={{width: "20rem",}}>

        <div className="card-img-top">
  <LazyLoadImage  className="EventCImage" effect="blur" src={image}   alt="Error"/>
        </div>

  <div className="card-body text-start">
    <p className="card-title" >{date}</p>
    <h4 className="card-text Roman lightOrange">{title}</h4>
    {/* <Link to="#" className="btn btn-primary" id='EBtn' style={{textTransform:"uppercase"}}>Read More</Link> */}
    <EventModal
            image={image}
            date={date}
            title={title}
            description={description}
            time={time}
            location={location}
            price={price}
            maxAttendees={maxAttendees}
            />
  </div>

</div>



    </>
  )
}

export default EventCard
