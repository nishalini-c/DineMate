import React from 'react';
import { Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//components
import Landing from "./components/Landing"
import Login from './components/Login'
import Register from './components/Register';
import ReservationForm from './components/Booking/Reservation';
import Events from './components/Booking/Event';
import Admin from './components/Admin/admin';
import Menu from './components/Menu'
import TableReservation from './components/Booking/Tables';
import AdminHome from './components/Admin/AdminHome';


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={ <Landing/> }/>
        <Route path="/login" element={ <Login/> }/> 
        <Route path="/register" element={ <Register/> }/> 
        <Route path="/admin" element={ <Admin/> }/>
        <Route path="/resveration"element={<ReservationForm/>}/>
        <Route path="/events" element ={<Events/>}/>
        <Route path="/menu"element ={<Menu/>}/>
        <Route path="/table" element={<TableReservation/>}/>
        <Route path="/admin/*" element={<AdminHome/>}/> 

        

   

</Routes> 
    </div>
  )
}

export default App
