import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import connectToDB from "./utils/ConnectToDB.js";
import AuthRoutes from './Routes/Auth.Routes.js'
const app = express();
dotenv.config();
app.use(express.json());
app.use('/auth',AuthRoutes);
app.listen(process.env.PORT, () => {
  console.log(`connected to sever on port ${process.env.PORT}`);
  connectToDB();
});
