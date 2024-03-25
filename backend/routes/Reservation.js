import express from 'express';
import {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation
} from '../controller/Reservation.js'; 

const router = express.Router();

router.post('/reservations', createReservation);
router.get('/reservations',getAllReservations);
router.get('/reservations/:id', getReservationById);
router.put('/reservations/:id', updateReservation);
router.delete('/reservations/:id', deleteReservation);

export default router;
