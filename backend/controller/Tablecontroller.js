import TableReservation from '../model/TableModel.js';
import uploadCloudinary from '../utils/imagecloudinary.js';
// import multer from 'multer';

 const getAllTableReservations = async (req, res) => {
  try {
    const tableReservations = await TableReservation.find();
    res.json(tableReservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

 const getTableReservationById = async (req, res) => {
  try {
    const tableReservation = await TableReservation.findById(req.params.id);
    if (!tableReservation) return res.status(404).json({ message: 'Table reservation not found' });
    res.json(tableReservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// create table view 
 const createTableReservation = async (req, res) => {
  const { tableNumber,numberOfSeats,tableImage}=req.body
  // console.log(req.body);
  try {
    let imageData={}
    if(tableImage){
      const results= await uploadCloudinary(tableImage,"table")
      imageData=results

    }
    const createTable=await TableReservation.create({
      tableNumber,
      numberOfSeats,
  
      tableImage:imageData,
    })
    res.status(201).json(createTable);
    } catch(e){
      console.log(e.message,e.stack)

      res.status(500).json({error:"Internal server error"})
  }
};
//  end table create view


//update table view 
const updateTableReservation = async (req, res) => {
  try {
    const { tableNumber, numberOfSeats, tableImage } = req.body;
     console.log(tableImage)
    // Handle image upload if new image is provided
    let imageData = {};
    if (tableImage) {
      const result = await uploadCloudinary(tableImage, "table");
      imageData = result;
    }
// console.log( req.params.id);
    // Find the reservation by ID and update its fields
    const updatedReservation = await TableReservation.findByIdAndUpdate(
      req.params.id,
      {
        tableNumber,
        numberOfSeats,
        tableImage: {url:imageData.url} || updatedReservation.tableImage, // Use new image URL if uploaded, otherwise use existing URL
      },
      { new: true } // Return the updated document
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: 'Table reservation not found' });
    }

    res.json(updatedReservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// end update table view 

// delete table view 
 const deleteTableReservation = async (req, res) => {
  try {
    const tableReservation = await TableReservation.findByIdAndDelete(req.params.id);
    if (!tableReservation) return res.status(404).json({ message: 'Table reservation not found' });
    res.json({ message: 'Table reservation deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// delete table view 

export{
    getAllTableReservations,
    getTableReservationById,
    createTableReservation,
    updateTableReservation,
    deleteTableReservation,
}