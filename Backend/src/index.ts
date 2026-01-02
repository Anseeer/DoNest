import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { mongooseConnection } from './config/mongoDB';
dotenv.config();
mongooseConnection()

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/',(_,res)=>{
    res.status(200).json({message:"Hello Ansi, Its DoNest !"})
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`DoNest lisintg on the port :http://localhost:${PORT}`)
})