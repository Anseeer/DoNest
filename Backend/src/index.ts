import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { mongooseConnection } from './config/mongoDB';
import userRoute from "./routes/userRoutes"
import taskRoute from "./routes/taskRoutes"
import { errorHandler } from './midllewares/errorMiddleware';
import { socketInit } from './config/socket';
dotenv.config();
mongooseConnection()

const app = express();
const server = http.createServer(app);
const io = socketInit(server);
app.set("io", io);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use('/test', (_, res) => {
    res.status(200).json({ message: "Hello Ansi, Its DoNest !" })
})

app.use('/api/', userRoute);
app.use('/api/task/', taskRoute);

app.use(errorHandler)

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`DoNest lisintg on the port :http://localhost:${PORT}`)
})