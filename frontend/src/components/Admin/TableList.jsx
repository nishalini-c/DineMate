import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const View = () => {
  const [tableReservations, setTableReservations] = useState([]);
  const [editReservation, setEditReservation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTableReservations = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/table/`);
        setTableReservations(response.data);
      } catch (error) {
        console.error('Error fetching table reservations:', error);
      }
    };
    fetchTableReservations();
  }, []);

  const handleEdit = (reservation) => {
    setEditReservation(reservation);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER}/api/table/${id}`);
      setTableReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation._id !== id)
      );
      toast.success('Table reservation deleted successfully');
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER}/api/table/${editReservation._id}`,
        editReservation
      );
      setShowModal(false);
      toast.success('Table reservation updated successfully');
    } catch (error) {
      console.error('Error updating reservation:', error);
      toast.error('Error updating reservation');
    }
  };
console.log(editReservation);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditReservation((prevReservation) => ({
      ...prevReservation,
      [name]: value,
    }));
  };

  return (
    <div className='adminDashboard container'>
      <h1>Table View </h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Table Number</th>
            <th>Number of Seats</th>
            <th>Reserved</th>
            <th>Table Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableReservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.tableNumber}</td>
              <td>{reservation.numberOfSeats}</td>
              <td>{reservation.reserved.toString()}</td>
              <td>
                {reservation.tableNumber && reservation.tableImage && reservation.tableImage.url ? (
                  <img
                    src={reservation.tableImage.url}
                    alt={reservation.tableNumber}
                    style={{ width: '100px', height: 'auto' }}
                  />
                ) : (
                  <p>No image available</p>
                )}
              </td>
              <td>
                <button
                  className='btn btn-primary btn-sm mr-2'
                  onClick={() => handleEdit(reservation)}
                >
                  Edit
                </button>
                
                
                <button
                  className='btn btn-danger btn-sm'
                  onClick={() => handleDelete(reservation._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="tableNumber">Table Number:</label>
            <input
              type="text"
              className="form-control"
              id="tableNumber"
              name="tableNumber"
              value={editReservation?.tableNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="numberOfSeats">Number of Seats:</label>
            <input
              type="number"
              className="form-control"
              id="numberOfSeats"
              name="numberOfSeats"
              value={editReservation?.numberOfSeats}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reserved">Reserved:</label>
            <select
              className="form-control"
              id="reserved"
              name="reserved"
              value={editReservation?.reserved.toString()}
              onChange={handleInputChange}
            >
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="tableImage">Image URL:</label>
            <input
              type="text"
              className="form-control"
              id="tableImage"
              name="tableImage"
              value={(editReservation!==null)&&editReservation.tableImage?editReservation.tableImage.url:''}
              onChange={handleInputChange}
            />
          </div>
          {/* Add other fields as needed */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default View;
