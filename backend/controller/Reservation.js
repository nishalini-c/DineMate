import Reservation from  '../model/Reservationmodel.js';
import nodemailer from 'nodemailer';
// import  twilio  from 'twilio';

// Create a reservation
const createReservation = async (req, res) => { 
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { 
        user: process.env.GMAIL,
        pass: process.env.PASS 
      }
    });

    const mailOptions = {
      from: 'dinemate29@gmail.com', 
      to: reservation.email,
      subject: 'Reservation Confirmation', // Proper subject line
      html: `<p><b>Dear Sir/Madam,</b></p>
      <br/>
             <p>Thank you for choosing DineMate! We are delighted to confirm your reservation successfully!</p>
             <p>Here are your reservation details:</p>
             <ul>
             <li>Name:${reservation.Name}</i>
               <li>Date: ${ reservation.date}</li>
               <li>Time: ${ reservation.time}</li>
               <li>Number of Guests: ${ reservation.numberOfGuests}</li>
               <!-- Add more details as needed -->
             </ul>
             <p>We look forward to welcoming you to our restaurant. If you need to make any changes to your reservation or have any questions, please feel free to contact us.</p>
             <br/>
             <p>Thanks & Regards,<br/> 
             Dine Mate.</p>` 
    };

    // Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(201).json({ message: 'Your reservation was created successfully', reservation });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create reservation', details: error.message });
  }
};


// Get all reservations
 const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json({ message: 'Successfully retrieved reservations', reservations });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve reservations', details: error.message });
  }
};

// Get a single reservation by ID
const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.status(200).json({ message: 'Reservation found', reservation });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve reservation', details: error.message });
  }
};

// Update a reservation by ID
 const updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.status(200).json({ message: 'Reservation updated successfully', reservation });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update reservation', details: error.message });
  }
};

// Delete a reservation by ID
 const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.status(200).json({ message: 'Reservation deleted successfully', reservation });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete reservation', details: error.message });
  }
};

export{
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation 
}
