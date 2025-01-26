import React from 'react';
import "../../CSS/WebAdminDashboard/Admin.css";
import { useSelector } from "react-redux";
import RoomModal from "../RoomModal";
import EventModal from "../EventModal";
// icons
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';

function DASCard({ Icons, Name, RNumber, Para, Edit, Delete, ID }) {
  const { rooms } = useSelector((state) => state.roomStore);
  const { eventItems, loading } = useSelector((state) => state.EventStore);

  // Find the room by ID, if it exists
  const roomDetails = rooms.find((room) => room?._id === ID);
  const eventDetails = eventItems.find((event) => event?._id === ID);

  return (
    <div className="container-fluid DASCard w-100 d-flex align-items-center my-1 p-2">
    {Icons}
      
      <div className='d-flex flex-column align-items-start w-100 me-1 DASCardB1'>
        <h6 className='Roman ms-4 mb-0 text-start w-100 lightOrange'>{Name}</h6>
        <p className='Roman DASCardRP mb-0 px-1 w-100'>{RNumber}</p>
      </div>
      <div>
        <p className='text-start DASCardRP w-100' id='RCPara'>{Para}</p>
      </div>
      <div className='d-flex justify-content-center w-50'>
        <button onClick={Edit} className='button p-0 m-0'>
          <EditCalendarIcon className='icons' id='Green' />
        </button>
        <button onClick={Delete} className='button p-0 m-0'>
          <DeleteIcon className='icons' id='Red' />
        </button>
        {/* Render Preview button and RoomModal only if roomDetails is found */}
        {roomDetails && 
          <RoomModal
            class1={'button'}
            BtnText={<PreviewIcon className='icons' id='grey' />}
            Id={roomDetails?._id}
            RNumber={roomDetails?.roomNumber}
            image={roomDetails.roomImage}  
            price={roomDetails?.price}
            title={roomDetails?.roomType}
            meter={roomDetails?.squareMeter}
            bed={roomDetails?.bedrooms}
            bathroom={roomDetails?.bathrooms}
            description={roomDetails?.description}
            entrance={roomDetails?.entrance}
            departure={roomDetails?.departure}
            facility={roomDetails?.facilities}
            Guest={roomDetails?.capacity}
          />
        }
        {eventDetails && 
          <EventModal
          class1={'button'}
          BTN={<PreviewIcon className='icons' id='grey' />}
          image={eventDetails?.image}
          date={eventDetails?.date}
          title={eventDetails?.title}
          description={eventDetails?.description}
          time={eventDetails?.time}
          location={eventDetails?.location}
          price={eventDetails?.price}
          maxAttendees={eventDetails?.maxAttendees}
          />
        }
      </div>
    </div>
  );
}

export default DASCard;
