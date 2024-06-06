import express from "express";
import VehicleSimulator from "../../services/vehicle/vehicleSimulator.js";



const router = express.Router();


const simulator = new VehicleSimulator();
simulator.start();

router.get("/", async (req, res) => {
   
    res.json(simulator.vehicles);



});
export default router;
