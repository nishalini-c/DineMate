import mongoose from "mongoose";

const TableReservationSchema = new mongoose.Schema({
  tableNumber: { 
    type: String,


    },
  numberOfSeats: { 
    type: String,

     },
  reserved: { 
    type: String,
     enum:['Available','Not available'],
     default:'Available'
    },
  tableImage: {
      public_id: {
        type: String,     
      },
      url: {
        type: String,   
      },
    }
    
});

const TableReservation = mongoose.model('TableReservation', TableReservationSchema);
export default TableReservation;