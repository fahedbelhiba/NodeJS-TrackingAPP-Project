import express from "express";
import { connect } from "mongoose";
import https from 'https'; // Import the HTTPS module
import http from 'http';
import { Server } from 'socket.io';
import userRouter from "./api/routes/users/index.js";
import vehicleRouter from "./api/routes/vehicle/index.js";
import cookieParser from 'cookie-parser';
import isAuthenticated from "./middlewares/isAuth/index.js";
import { fileURLToPath } from 'url';
import path from 'path';
import VehicleSimulator from "./api/services/vehicle/vehicleSimulator.js";
import { addTruckPosition } from "./api/services/vehicle/index.js";
import { redirectToHTTPS } from 'express-http-to-https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));

app.use("/users", userRouter);
app.use("/vehicles", isAuthenticated, vehicleRouter);

// Create an HTTP server
http.createServer(app).listen(6000);
// Create an HTTPS server
const httpsServer = https.createServer(app);

// Use the same instance of `socket.io` for the HTTPS server
const io = new Server(httpsServer);

const simulator = new VehicleSimulator(io);

io.on('connection', (socket) => {
  console.log('a user connected');
  simulator.start();
  socket.on('position', async (data) => {
    console.log(`Position received for ${data.vehicleId}: `, data.position);

    try {
      const updatedTruck = await addTruckPosition(data.vehicleId, data.position);
      console.log('Position upserted to MongoDB:', updatedTruck);
    } catch (error) {
      console.error('Error upserting position to MongoDB:', error);
    }
  });

  socket.on('error', (error) => {
    console.error('Socket.io error:', error);
  });
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Connect to MongoDB
connect("mongodb://localhost:27017/project_npm")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("error", error);
  });

// Start the HTTPS server
const port = 5000; // Typical HTTPS port for local development
httpsServer.listen(port, () => {
  console.log(`HTTPS server is running on port ${port}`);
});
