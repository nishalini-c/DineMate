import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Admin/Booking.css';

const BookingForm = () => {
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resPerPage] = useState(5);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/booking/reservations?page=${currentPage}&limit=${resPerPage}`, { withCredentials: true });
        setReservations(response.data.reservations);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        toast.error('Failed to fetch reservations');
      }
    };
    fetchReservations();
  }, [currentPage, resPerPage]);





  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='reservationList container'>
      <h1> User Booking </h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Time</th>
            <th>Date</th>
            <th>Number of Guests</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation._id}</td>
              <td>{reservation.Name}</td>
              <td>{reservation.email}</td>
              <td>{reservation.phoneNumber}</td>
              <td>{reservation.time}</td>
              <td>{new Date(reservation.date).toLocaleDateString()}</td>
              <td>{reservation.numberOfGuests}</td>
              
            </tr>
          ))}
        </tbody>
      </table>


      <ToastContainer />
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default BookingForm;
