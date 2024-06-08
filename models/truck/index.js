import { Schema, model } from "mongoose";

const truckSchema = new Schema({
  truckId: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
});

const Truck = model("Truck", truckSchema);

export default Truck;