import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import '../Admin/view.css';

const TableView = () => {
    const [tableNumber, setTableNumber] = useState('');
    const [numberOfSeats, setNumberOfSeats] = useState('');
    const [tableImage, setTableImage] = useState('');
    const navigate = useNavigate();

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/api/table/new', { tableNumber, numberOfSeats, tableImage }, {
                headers: {
                    "Content-Type": 'application/json',
                }
            });

            if (response.status === 200 || response.status === 201) { 
              toast.success("Table created successfully!");
              navigate('/admin');
            }
        } catch (error) {
            console.error(error); 
            toast.error("Error uploading: " + error.message);
        }
    }

    return (
        <div className="booking form">
            <div className="users">
                <form onSubmit={handleUpload}>
                    <h1>Table View Create Form</h1>
                    <label htmlFor="tableNumber">Table Number:</label> 
                    <input type="text" id="tableNumber" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} name="tableNumber" required />
                    <label htmlFor="numberOfSeats">Number ofSeats:</label>
                    <input type="text" id="numberOfSeats" value={numberOfSeats} onChange={(e) => setNumberOfSeats(e.target.value)} name="numberOfSeats" required />
                    <label htmlFor="tableImage">Table Image:</label>
                    <br/>
                    <input type="url" id="tableImage"  value={tableImage} onChange={(e) => setTableImage(e.target.value)} name="tableImage" required />
                    <button type="upload">Upload</button> 
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default TableView;
