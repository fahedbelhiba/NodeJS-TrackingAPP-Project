import express from "express";
import { connect } from "mongoose";
import http from 'http';
import { Server } from 'socket.io';
import userRouter from "./api/routes/users/index.js";
import vehicleRouter from "./api/routes/vehicle/index.js";
import cookieParser from 'cookie-parser';
import isAuthenticated from "./middlewares/isAuth/index.js";
import { fileURLToPath } from 'url';
import path from 'path';
import VehicleSimulator from "./api/services/vehicle/vehicleSimulator.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cookieParser());
app.use(express.json());
    
app.use("/users", userRouter);
app.use("/vehicles",isAuthenticated, vehicleRouter);

const server = http.createServer(app);
const io = new Server(server);

const simulator = new VehicleSimulator(io);
io.on('connection', (socket) => {
  console.log('a user connected');
  simulator.start();
});

io.on('error', (error) => {
  console.error('Socket.io error:', error);
});

  
connect("mongodb://localhost:27017/project_npm")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("error", error);
  });

const port = 5000;
server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
