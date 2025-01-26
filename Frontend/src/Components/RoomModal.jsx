import React,{ useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import RCardBtn from './RCardBtn';
import "../CSS/RoomCard.css";
import { toast } from 'react-toastify'; // Import toast
import { addRoom } from '../RTK/Slices/RoomSlice';
import "react-lazy-load-image-component/src/effects/blur.css";

// Css files
import "../CSS/RoomModal.css"
// Icons
import DeleteIcon from '@mui/icons-material/Delete';

function RoomModal({class1,BtnText,Id, RNumber,image, price, title, meter, bed, bathroom, description, entrance, departure,facility,Guest}) {
  // console.log(RNumber);
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  const dispatch = useDispatch(); // Initialize dispatch
  const bookRooms = useSelector((state) => state.roomStore.bookRooms); // Get booked rooms from the store

  const handleAddRoom = () => {
    // Check if the room is already booked
    const isRoomBooked = bookRooms.some(rooms => rooms.Id === Id);

    const Rdata= {Id,RNumber,image, price, title, meter, bed, bathroom, description, entrance, departure}
console.log(Rdata);

    if (isRoomBooked) {
      // Show toast notification if room is already booked
      toast.error('This room is already booked!');
    } else {
      // Dispatch addRoom action if room is not booked
      if(price!==0){
        dispatch(addRoom(Rdata));
        toast.success('Room added to booking!');
      }else{
        toast.info('Please select the Dates');
      }
    }
  };

  return (
    <>
      <Button variant="primary" className={`${class1}`} onClick={handleShow}>
        {BtnText}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h2 className='Script'>Room Detail:</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="card mx-4 my-3 RCard text-start" style={{ width: "34rem", borderRadius: "0px", border: "none" }}>
        <a href={image} target="_blank" rel="noopener noreferrer">
        <LazyLoadImage effect="blur" src={image} className='card-img-top w-100 h-100' style={{ borderRadius: "0px" }} alt="Room" />
      </a>
      <div className="card-body Rbody">
        <RCardBtn text={`STARTED AT ${price}$`} position="absolute" top="19rem" onClick={handleAddRoom} />
        <div className='d-flex align-items-center justify-content-between'>
        <h3 className="card-title Roman lightOrange">{title}</h3>
        <p>{`RoomNumber:${RNumber}`}</p>

        </div>
        <div className='d-flex flex-row align-items-center'>
          <p className='me-2'>{`${meter} M²`}</p>
          <p className='mx-2'>{`${bed} BEDROOM`}</p>
          <p className='mx-2'>{`${bathroom} BATHROOM`}</p>
        </div>
        <p className="card-text" >{facility}</p>

        <p className="card-text" >{description}</p>
        <h6 className="card-text" ><strong className='lightOrange'>{`Guest:${Guest}`}</strong></h6>
        <p className="card-text mb-1 Roman" >Entrance: { entrance ? new Date(entrance).toISOString().split('T')[0] : " ?"}</p>
        <p className="card-text Roman" >Departure: {departure ? new Date(departure).toISOString().split('T')[0] : " ?"}</p>
        
      </div>
    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='closebtn' onClick={handleClose}>
            Close
          </Button>
          <DeleteIcon className="icons" />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RoomModal;