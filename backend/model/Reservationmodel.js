import  mongoose  from 'mongoose';

const reservationSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
    
  },
  numberOfGuests: {
    type:String,
    required: true
  },
  isAdmin: {
    type: String,
    default: "user"
  }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default  Reservation;
