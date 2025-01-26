import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import "../../CSS/SignUp/Signup.css";
import "../../CSS/WebAdminDashboard/Admin.css";
import DeleteIcon from '@mui/icons-material/Delete';
// RTK
import { getAllBooking,DeleteBooking } from "../../RTK/Thunks/BookingThunks";

function DABooking() {
  const { Bookingitems, loading, error } = useSelector((state) => state.BookingStore);
  const dispatch = useDispatch();

  // Get All bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        await dispatch(getAllBooking());
      } catch (error) {
        toast.error("Failed to load bookings.");
        console.log("Error fetching bookings", error);
      }
    };

    fetchBookings();
  }, [dispatch]);

  // Helper function to format dates
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Function to check if the current date is greater than the booking end date
  const isBookingExpired = (endDate) => {
    const currentDate = new Date();
    const endBookingDate = new Date(endDate);
    return currentDate > endBookingDate;
  };

  const handleDelete = useCallback((id) => {
    try {
      dispatch(DeleteBooking({ _id: id }));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <>
      <h1 className="Script pt-3">Booking</h1>
      <div className="container-fluid DARoomContainer p-4">
        {loading ? (
          <p>Loading bookings...</p>
        ) : error ? (
          <p>Error loading bookings.</p>
        ) : (
          <table className="table Roman">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Profile</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">RoomType</th>
                <th scope="col">RoomN0</th>
                <th scope="col">Guest</th>
                <th scope="col">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {Bookingitems && Bookingitems.length > 0 ? (
                Bookingitems.map((RBooked, index) => (
                  <tr
                    key={index + 1}
                    style={{
                      backgroundColor: isBookingExpired(RBooked.endDate) ? 'rgb(255 0 0 / 29%)' : 'transparent',
                    }}
                  >
                    <th scope="row">{index + 1}</th>
                    <td className='d-flex justify-content-center align-items-center'>
                      <div
                        style={{
                          borderRadius: '50%',
                          width: '2.7rem',
                          height: '2.7rem',
                          backgroundColor: 'white',
                          backgroundImage: RBooked.userId?.image ? `url(${RBooked.userId?.image})` : '',
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          margin:"0.4rem"
                        }}
                      />
                    </td>
                    <td>{RBooked.userId?.name}</td>
                    <td>{RBooked.userId?.email}</td>
                    <td>{formatDate(RBooked.startDate)}</td>
                    <td>{formatDate(RBooked.endDate)}</td>
                    <td>{RBooked.roomId?.roomType}</td>
                    <td>{RBooked.roomId?.roomNumber}</td>
                    <td>{RBooked.guests}</td>
                    <td>{`$ ${RBooked.amount}`}</td>
                    <td>
  <button className='button' onClick={() => handleDelete(RBooked._id)}>
    <DeleteIcon className='icons'/>
  </button>
</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No bookings available.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default DABooking;
