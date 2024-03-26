// server.js
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
dotenv.config();
import cookieParser from 'cookie-parser'; 
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/UserRoutes.js';
import ReservationRoutes from './routes/Reservation.js'
import TableRoutes from './routes/TableRoutes.js';


const port = process.env.PORT || 9000;
const app = express();
const mongoString = process.env.DATABASE_URL; 
mongoose.connect(mongoString)
const database = mongoose.connection
const corsOptions ={
    origin:['https://dine-mate.vercel.app', "http://localhost:3000"], 
    credentials:true,           
    optionSuccessStatus:200
}
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/booking', ReservationRoutes);
app.use('/api/table',TableRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

app.use(cookieParser());
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
//database connection server 
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected')
}) 
