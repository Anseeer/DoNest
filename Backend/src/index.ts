import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { mongooseConnection } from './config/mongoDB';
import userRoute from "./routes/userRoutes"
import { errorHandler } from './midllewares/errorMiddleware';
dotenv.config();
mongooseConnection()

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}));

app.use('/test', (_, res) => {
    res.status(200).json({ message: "Hello Ansi, Its DoNest !" })
})

app.use('/api/', userRoute);

app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`DoNest lisintg on the port :http://localhost:${PORT}`)
})