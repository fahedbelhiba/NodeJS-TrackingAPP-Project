import Truck from "../../../models/truck/index.js";

const addTruckPosition = async (truckId, position) => {
  try {
    const updatedTruck = await Truck.findOneAndUpdate(
      { truckId },
      {
        position: JSON.stringify(position), 
        timestamp: Date.now() 
      },
      {
        new: true,       
        upsert: true,    
        useFindAndModify: false 
      }
    );
    return updatedTruck;
  } catch (error) {
    console.error('Error upserting truck position:', error);
    throw error; 
  }
};

export { addTruckPosition };
