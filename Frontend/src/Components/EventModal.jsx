import React,{ useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { useDispatch, useSelector } from 'react-redux';
import RCardBtn from './RCardBtn';
import "../CSS/RoomCard.css";
// import { toast } from 'react-toastify'; // Import toast
// import { addRoom } from '../RTK/Slices/RoomSlice';
import "react-lazy-load-image-component/src/effects/blur.css";

// Css files
import "../CSS/RoomModal.css"

function RoomModal({BTN,class1,image,date,title,description,time,location,price,maxAttendees}) {
  // console.log(RNumber);
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  


  return (
    <>
      <Button variant="primary" className={`EBtn ${class1}`} onClick={handleShow}>
        {BTN}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h2 className='Script'>Event Detail:</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="card mx-4 my-3 RCard text-start" style={{ width: "34rem", borderRadius: "0px", border: "none" }}>
        <a href={image} target="_blank" rel="noopener noreferrer">
        <LazyLoadImage effect="blur" src={image} className='card-img-top w-100 h-100' style={{ borderRadius: "0px" }} alt="Room" />
      </a>
      <div className="card-body Rbody">
        <div className='d-flex align-items-center justify-content-between mt-3'>
        <h3 className="card-title Roman lightOrange">{title}</h3>
        <div className='text-end'>
        <p className="card-text mb-0 lightOrange" >{`Time :- ${time}`}</p>
        <p className="card-text lightOrange" >{`Date :- ${new Date(date).toISOString().split('T')[0]}`}</p>
        </div>

        </div>
        
        <p><span style={{fontSize:"1rem"}} className='lightOrange'>Location: </span>{location}</p>

        <p className="card-text" >{description}</p>
        <h6 className="card-text" ><strong className='lightOrange'>{`MaxAttendees:${maxAttendees}`}</strong></h6>
        <h5 className='Roman'>{`Price: ${price}$`}</h5>
        
      </div>
    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='closebtn' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RoomModal;