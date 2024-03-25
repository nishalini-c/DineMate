import express from 'express';
import upload from '../utils/multer.js'
import { updateTableReservation } from '../controller/Tablecontroller.js';


import  {
  getAllTableReservations,
  getTableReservationById,
  createTableReservation,
  deleteTableReservation,
} from '../controller/Tablecontroller.js';

const router = express.Router();

router.get('/', getAllTableReservations);
router.get('/:id', getTableReservationById);
router.post('/new', createTableReservation);
router.put('/:id', upload.single('tableImage'), updateTableReservation);
router.delete('/:id', deleteTableReservation); 

export  default router;