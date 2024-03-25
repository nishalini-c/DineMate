import logo from "../Assets/Artboard 2 (1).png"; 
import React from 'react';
import  '../App.css'
import { Link } from "react-router-dom";

function Landing() { 
    return( 
        <section id="hero">
        <div className="hero-container"> 

          <img src={logo} alt="" className="hero-logo"/>
          <h1 data-aos="zoom-in">Welcome To DineMate </h1>
          <h2 data-aos="fade-up">Reserve your table now for an unforgettable dining experience! <br/>Book online in just a few clicks and secure your spot at our restaurant. </h2>
          <div className="container">
            <div className="row">
              

              <div className="col-6">

              <Link to="/table">
                <button type="button" className="btn btn-outline-warning mugam" >Table Reservation</button>
                </Link>
           </div>
            
           <div className="col-6">

           <Link to="/login">
              <button type="button" className="btn btn-outline-warning mugam1" >Login</button>
              </Link>

            </div>
              
            </div>
          </div><br/>
         {/* <h5 className="top">By <b>Dine Mate </b></h5> */}
        </div>
      </section>    
    )
}
export default Landing;