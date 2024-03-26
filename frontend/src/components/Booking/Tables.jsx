import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import t1 from '../Booking/seats/01.png';
import t2 from '../Booking/seats/t2.png';
import t3 from '../Booking/seats/05.png';
import t4 from '../Booking/seats/07.png';
import t5 from '../Booking/seats/9.png';
import t6 from '../Booking/seats/8.png';
import t7 from '../Booking/seats/03.png';
import t8 from '../Booking/seats/t6.png';
import t9 from '../Booking/seats/10.png';
import '../Booking/Table.css';

const TableReservation = () => {
  const [tableDetails, setTableDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchTableDetails = async (tableId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/table/${tableId}`);
      setTableDetails(response.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const tableId = '65e56c78114f005b2cae24fd';
    fetchTableDetails(tableId);
  }, []);

  const handleTableClick = (tableId) => {
    fetchTableDetails(tableId);
  };

  const getTableClass = (table) => {
    if (table && table.reserved) {
      return 'reserved';
    } else {
      return 'available';
    }
  };

  return (
    <>
      <h1>Select Your Table</h1>
      <br />
      <div className="row">
        <div className="section1 col-lg-7 ">
          <div className="parent-container">
            <div className={`child-container ${getTableClass(tableDetails)}`} id="one" onClick={() => handleTableClick('65f1e1a4d30fc3c1d0afbebe')}>
              <img src={t1} width="60%" height="auto" alt="Table 1" />
              <br />
              <img src={t2} width="60%" height="auto" alt="Table 2" /><br />
              <img src={t3} width="50%" height="auto" alt="Table 3" />
            </div>
            <div className={`child-container ${getTableClass(tableDetails)}`} id="two" onClick={() => handleTableClick('65f1e58dd30fc3c1d0afbedb')}>
              <img src={t4} width="60%" height="auto" alt="Table 4" /><br />
              <img src={t5} width="60%" height="auto" alt="Table 5" /><br />
              <img src={t6} width="60%" height="auto" alt="Table 6" />
            </div>
            <div className={`child-container ${getTableClass(tableDetails)}`} id="three" onClick={() => handleTableClick('65f1e676d30fc3c1d0afbeed')}>
              <img src={t7} width="60%" height="auto" alt="Table 7" /> <br />
              <img src={t8} width="60%" height="auto" alt="Table 8" /><br />
              <img src={t9} width="60%" height="auto" alt="Table 9" /><br />
            </div>
          </div>
        </div>
        <div className="col-lg-5 section2">
          <div className="row">
            <div className="booking-form">
              <div className="form-header">
                <h2>Reserve your Table</h2>
                <p>The fondest memories are gathered around the table </p>
              </div>
              {tableDetails !== null && (
                <div className="table-details">
                  <h2>Table Details</h2> 
                  <br/>
                  <p>Table Number: {tableDetails.tableNumber}</p>
                  <p>Number of Seats: {tableDetails.numberOfSeats}</p>
                  <p>Reserved: {tableDetails.reserved.toString()}</p>
                </div>
              )}
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-btn">
                  <button type="submit" className="submit-btn"> <Link to="/register">Book Now </Link> </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableReservation;
