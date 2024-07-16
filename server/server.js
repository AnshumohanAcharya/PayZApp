import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import transactionRoutes from  "./routes/transactionRoute"
import requestRoutes from "./routes/requestRoute"
import cors from 'cors';

dotenv.config();


const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/users', userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/requests",requestRoutes);

const conn = await mongoose.connect(process.env.MONGODB_URI)

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`MongoDB connected to ${conn.connection.host}`)
})