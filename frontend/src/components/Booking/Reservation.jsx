import React, { useState } from 'react';
import '../Booking/Booking.css';
import dine from '../Booking/img/background03.jpg';
import Events from './Event';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function Reservation() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    phoneNumber: '',
    time: '',
    date: '',
    numberOfGuests: '',
  });

  const { Name, email, phoneNumber, time, date, numberOfGuests } = formData;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleError = (err) => {
    toast.error(err);
  };

  const handleSuccess = (msg) => {
    toast.success(msg);
  };

  const handleUnknownError = () => {
    toast.error('Failed to make the reservation. Please try again later.');
  };

  const validateForm = () => {
    if (
      !Name ||
      !emailIsValid(email) ||
      !phoneNumberIsValid(phoneNumber) ||
      !time ||
      !numberOfGuests ||
      !date
    ) {
      handleError('Please fill in all fields with valid data');
      return false;
    }

    return true;
  };

  const emailIsValid = (email) => {
    // Use a regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const phoneNumberIsValid = (phoneNumber) => {
    // Use a regular expression for phone number validation
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Send a POST request to your backend API
      fetch('http://localhost:9000/api/booking/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Reservation failed');
          }
          return response.json();
        })
        .then((data) => {
          // Handle the response from the server
          handleSuccess('Your Reservation successfully!..');
          navigate('/'); // Use navigate to navigate to a different route
        })
        .catch((error) => {
          // Handle any errors that occur
          console.error(error);
          handleError(error.message);
          handleUnknownError();
        });
    }
  };

  return (
    <>
      <div id="reservation" className="section">
        <div className="bg-image" style={{ backgroundImage: `url(${dine})` }}></div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-1 col-sm-10 col-sm-offset-1">
              <form className="reserve-form row" onSubmit={handleSubmit}>
                <div className="section-header text-center">
                  <h2 className="title white-text">Book Your Table</h2>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      className="input"
                      type="text"
                      placeholder="Name"
                      id="name"
                      name="Name"
                      value={formData.Name}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                      className="input"
                      type="tel"
                      placeholder="Phone Number"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                      className="input"
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      className="input"
                      type="email"
                      placeholder="Email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="numberOfGuests">Number Of Guests:</label>
                    <select
                      className="input guest-select"
                      id="numberOfGuests"
                      name="numberOfGuests"
                      value={formData.numberOfGuests}
                      onChange={handleOnChange}
                      
                    >
                      <option>1 Person</option>
                      <option>2 People</option>
                      <option>3 People</option>
                      <option>4 People</option>
                      <option>5 People</option>
                      <option>7 People</option>
                      <option>8 People</option>
                      <option>9 People</option>
                      <option>10 People</option>
                      <option>11 People</option>
                      <option>12 People</option>
                      <option>13 People</option>
                      <option>14 People</option>
                      <option>15 People</option>
                      <option>16 People</option>
                      <option>17 People</option>
                      <option>18 People</option>
                      <option>19 People</option>
                      <option>20 People</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="time">Time:</label>
                    <input
                      className="input"
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                </div>
                <div className="row book">
                  <div className="col-md-6">
                    <button type="submit" className="main-button">
                      Book Now
                    </button>
                  </div>
                  <div className="col-md-6">
                    <Link to="/table">
                      <button type="button" className="main-button">
                        View Table
                      </button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-4 col-md-offset-0 col-sm-10 col-sm-offset-1">
              <div className="opening-time row">
                <div className="section-header text-center">
                  <h2 className="title white-text">Opening Time</h2>
                </div>
                <ul>
                  <li>
                    <h4 className="day">Sunday</h4>
                    <h4 className="hours">8:00 am – 11:00 pm</h4>
                  </li>
                  <li>
                    <h4 className="day">Monday</h4>
                    <h4 className="hours">8:00 am – 11:00 pm</h4>
                  </li>
                  <li>
                    <h4 className="day">Tuesday</h4>
                    <h4 className="hours">8:00 am – 11:00 pm</h4>
                  </li>
                  <li>
                    <h4 className="day">Wednesday</h4>
                    <h4 className="hours">8:00 am – 11:00 pm</h4>
                  </li>
                  <li>
                    <h4 className="day">Thursday</h4>
                    <h4 className="hours">8:00 am – 11:00 pm</h4>
                  </li>
                  <li>
                    <h4 className="day">Friday</h4>
                    <h4 className="hours">8:00 am – 11:00 pm</h4>
                  </li>
                  <li>
                    <h4 className="day">Saturday</h4>
                    <h4 className="hours">Closed</h4>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Events />
    </>
  );
}

export default Reservation;
