import React from 'react';
import { Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDetails from './UserDetails';
import BookingFrom from './BookingFrom';
import TableView from './TableView';
// import Dashboard from './Dashboard';
import View from './TableList';



function AdminHome() {
    return (
      <div className="App">
  <admin/>
 
        <Routes>
          <Route path="/user" element={ <UserDetails/> }/>
          <Route path="/Table" element={ <BookingFrom/> }/>
          <Route path="/TableView" element={ <TableView/> }/>  
          <Route path="/View" element={ <View/> }/>          
          {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
  </Routes> 
  <ToastContainer />
  
      </div>
    )
  }
  
  export default AdminHome;
  