import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {connectDB} from "./src/config/db.js"
import cors from 'cors';
import errorMiddleware from './src/middlewares/errorMiddleware.js';
import authRoutes from "./src/routes/authRoutes.js";
import cookieParser from "cookie-parser";
// import chatRoutes from './src/routes/chatRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ['http://localhost:5173']; 

app.use(cors({
  origin: allowedOrigins,
  credentials: true, 
}));

app.use(errorMiddleware)

connectDB();

// Routes
app.use("/api/auth",authRoutes);
// app.use("/api/chat",chatRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});