// Libraries
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { toast } from 'react-toastify';
// Css Files
import 'react-calendar/dist/Calendar.css';
import "../CSS/CheckBooking/Calendar.css";


function CalendarC() {
    const [entranceDate, setEntranceDate] = useState(null);
    const [departureDate, setDepartureDate] = useState(null);
    const [dateCount, setDateCount] = useState(0);
    const [bookedDates, setBookedDates] = useState([]); // State for booked dates
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/booking`);
                const bookings = response.data;
                // console.log("Response",bookings);
                

                // Filter bookings based on statusId and extract the dates
                const filteredDates = bookings.filter(booking => booking.statusId?._id === "671633b5b9b7594798be7590")
                // console.log("filteredDates",filteredDates);
                
                const flatMap = filteredDates.flatMap(booking => {
                    const start = new Date(booking.startDate);  // Convert to Date object
                    const end = new Date(booking.endDate);  // Convert to Date object
                
                    const datesInRange = [];
                
                    // Ensure the start date is moved one day back
                    start.setDate(start.getDate() - 1);  // Adjust start date by subtracting one day
                    end.setDate(end.getDate() - 1);  // Adjust start date by subtracting one day
                
                    // Loop from the adjusted start date (the day before the original start date) until the end date (inclusive)
                    for (let dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
                        // Push the current date
                        datesInRange.push(new Date(dt));
                    }
                
                    return datesInRange;
                });

                    // console.log('flatMap',flatMap);
                    setBookedDates(flatMap); // Set booked dates
                    
                } catch (error) {
                    console.error("Error fetching bookings:", error);
                }
            };
            
        fetchBookings();
    }, []);

    const handleDateChange = (date) => {
        // Check if the selected date is booked
        const isBooked = bookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString());
        
        if (isBooked) {
            console.log('Selected date is already booked. Please choose another date.');
            return; // Exit if the date is booked
        }


        if(date < new Date()){
            toast.info('This Date is Outdated!')
            // setEntranceDate(null)
        }else if (!entranceDate) {
            setEntranceDate(date);
        } else if (date > entranceDate && !departureDate) {
            setDepartureDate(date);
            calculateDateCount(entranceDate, date);
        } else if (date < entranceDate && !departureDate) {
            setEntranceDate(date);
            setDateCount(0);
        } else if (date && entranceDate && departureDate) {
            setEntranceDate(date);
            setDepartureDate(null);
            setDateCount(0);
        }else {
            console.log('Please select a valid departure date after entrance date.');
        }
    };

    const calculateDateCount = (startDate, endDate) => {
        const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        setDateCount(totalDays);
    };

    const clearDates = () => {
        setEntranceDate(null);
        setDepartureDate(null);
        setDateCount(0);
    };

    const showRooms = () => {
    
        // Add 1 day to the entranceDate
        const updatedEntranceDate = new Date(entranceDate);
        updatedEntranceDate.setDate(updatedEntranceDate.getDate() + 1);  // Add 1 day

        const updatedDepartureDate = new Date(departureDate);
        updatedDepartureDate.setDate(updatedDepartureDate.getDate() + 1);  // Add 1 day
    
        console.log('Updated Entrance Date (1 day added):', updatedEntranceDate.toISOString());
        console.log('Updated Departure Date (1 day added):', updatedDepartureDate.toISOString());
    
        // Navigate with the updated date (entranceDate + 1 day)
        navigate(`/rooms?entrance=${updatedEntranceDate.toISOString()}&departure=${updatedDepartureDate.toISOString()}&dateCount=${dateCount}`);
    };
    
    
    

    return (
        <>
        
            <h1 className='lightOrange Script'>Calendar</h1>
            <div className='d-flex flex-column justify-content-center align-items-center mb-1 CTContainer'>
                <p className='mb-2' style={{ width: "70%", textAlign: "center" }}>
                    🌟 Choose your date with ease—this color highlights its category for you! 📅✨ Thank you!
                </p>
                <div className='d-flex justify-content-center align-items-center'>
                    {/* Status Indicators */}
                    <div className='d-flex justify-content-center align-items-center mx-2' id='CSize'>
                        <div className='CBox mx-1' id='CBox1'></div>
                        <strong>Entrance</strong>
                    </div>
                    <div className='d-flex justify-content-center align-items-center mx-2' id='CSize'>
                        <div className='CBox mx-1' id='CBox2'></div>
                        <strong>Sold Out</strong>
                    </div>
                    <div className='d-flex justify-content-center align-items-center mx-2' id='CSize'>
                        <div className='CBox mx-1' id='CBox3'></div>
                        <strong>Only Departure</strong>
                    </div>
                </div>
            </div>

            {/* Calendar */}
            <Calendar 
                onChange={handleDateChange} 
                value={entranceDate || departureDate} 
                tileClassName={({ date }) => {
                    if (bookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString())) {
                        return 'booked-date'; // Add your CSS class for booked dates
                    }
                    if (date.toDateString() === entranceDate?.toDateString()) {
                        return 'entrance-color'; // Add your CSS class for entrance
                    }
                    if (date.toDateString() === departureDate?.toDateString()) {
                        return 'brown-color'; // Add your CSS class for departure
                    }
                    return null;
                }} 
            />

            {entranceDate && departureDate && (
                <div className="buttons-container">
                    <button onClick={showRooms} className='CBtn'>Show Rooms</button>
                    <button onClick={clearDates} className='CBtn C2Btn'>Clear Dates</button>
                    <p className='date-count ms-1'>Total Days: {dateCount}</p>
                </div>
            )}
        </>
    );
}

export default CalendarC;
