import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Admin/Dashboard.css';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [reservationsData, setReservationsData] = useState(null);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:9000/api/users/users')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

    axios.get('http://localhost:9000/api/booking/reservations')
      .then(response => {
        setReservationsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching reservation data:', error);
      });

    axios.get('http://localhost:9000/api/table/')
      .then(response => {
        setOrderData(response.data);
      })
      .catch(error => {
        console.error('Error fetching order data:', error);
      });
  }, []);

  return (
    <div>
      <div className="footer-container">
        <div className="card3">
          <div className="card-content3">
            <h1>User</h1>
            <i className="fa-solid fa-user"></i>
            <p>{userData ? userData.length : 'Loading...'}</p>
          </div>
        </div>
        <div className="card3">
          <div className="card-content3">
            <h1>Booking</h1>
            <i className="fa-solid fa-table"></i>
            <p>{reservationsData ? reservationsData.length : 'Loading...'}</p>
          </div>
        </div>
        <div className="card3">
          <div className="card-content3">
            <h1>Table View </h1>
            <i className="fa-solid fa-table-cells"></i>
            <p>{orderData ? orderData.length : 'Loading...'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
