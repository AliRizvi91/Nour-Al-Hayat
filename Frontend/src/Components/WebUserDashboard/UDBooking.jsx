import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../../CSS/WebUserDashboard/UDBooking.css";
import "../../CSS/RoomsPage/Rooms.css";
import { getAllBooking } from '../../RTK/Thunks/BookingThunks';
import { getAllRoom } from '../../RTK/Thunks/RoomThunks';
import RoomModal from "../RoomModal";

function UDBooking() {
  const dispatch = useDispatch();

  // Track loading state
  const [isDataReady, setIsDataReady] = useState(false);

  // Fetch bookings data when the component mounts
  useEffect(() => {
    dispatch(getAllBooking());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllRoom());
  }, [dispatch]);

  // Get data from Redux store
  const { Bookingitems } = useSelector((state) => state.BookingStore);
  const { rooms } = useSelector((state) => state.roomStore);
  const { user } = useSelector((state) => state.userStore);

  // Set data as ready when both user and booking items are available
  useEffect(() => {
    if (user && Bookingitems) {
      setIsDataReady(true); // Set to true once both are available
    }
  }, [user, Bookingitems]);

  // Filter booked dates only when data is ready
  useEffect(() => {
    if (isDataReady) {
      // Get booked dates for the current user
      const ourBookedDate = Bookingitems.filter(
        (bookDate) => bookDate.userId === user._id
      );
    }
  }, [isDataReady, Bookingitems, user]);

  return (
    <div className="container-fluid m-0 p-0 text-center d-flex flex-column justify-content-center">
      <div className='DBImg'>
        <img src="/assets/images/DBBanner.png" alt="ERROR" />
      </div>
      <h1 className='Script mt-4 mb-5'>Booking Dates</h1>

      {/* Loop through rooms and display booking details */}
      <div className="DBBlock container-fluid text-start mx-3 d-flex flex-column align-items-center">
        {rooms.map((room) => {
          // Find the booking item that matches the current room
          if(Bookingitems){
            const matchingBooking = Bookingitems.filter(
              (booking) => booking.roomId._id === room._id && booking.userId === user._id
            );
            // console.log("matchingBooking",matchingBooking);
          

          return matchingBooking ? (
            <div key={room._id} className="w-100 mb-4">
              <h6 className='Roman lightOrange'>Room No: {room.roomNumber}</h6>
                {matchingBooking.map((FBookR) => 
                <RoomModal
                class1={'DBRModal p-0 m-2'}
                BtnText={(<div className="DBBox" key={FBookR._id} style={{backgroundImage:`url(${FBookR.roomId?.roomImage})`}}>
              </div>)}
                Id={FBookR.roomId?._id}
                RNumber={FBookR.roomId?.roomNumber}
                image={FBookR.roomId?.roomImage}
                price={FBookR.roomId?.price}
                title={FBookR.roomId?.title}
                meter={FBookR.roomId?.squareMeter}
                bed={FBookR.roomId?.bedrooms}
                bathroom={FBookR.roomId?.bathrooms}
                description={FBookR.roomId?.description}
                facility={FBookR.roomId?.facilities}
                Guest={FBookR.roomId?.capacity}
                entrance={FBookR.startDate}
                departure={FBookR.endDate}
              />
              
                )}
            </div>
          ) : null;
        }
        })}
      </div>
    </div>
  );
}

export default UDBooking;
