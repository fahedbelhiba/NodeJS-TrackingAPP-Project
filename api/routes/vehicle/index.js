import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import { fileURLToPath } from 'url';
import path from 'path';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();
const server = http.createServer(router);
const io = new Server(server);



 router.get("/monitoring-trucks", (req, res) => {
     res.sendFile(path.join(__dirname, "./../../../public", "monitoring-trucks.html"));

    });




export default router;
