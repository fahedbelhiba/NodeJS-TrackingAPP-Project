import EventEmitter from 'events';

class VehicleSimulator extends EventEmitter {
  constructor(io) {
    super();
    this.vehicles = {};
    this.immobilityThreshold = 10000; 
    this.checkInterval = 2000; 
    this.immobilityProbability = 0.1;
    this.io = io; 
  }

  generateRandomPosition() {
    const lat = Math.abs(Math.random() * 180 - 90);
    const lon = Math.abs(Math.random() * 360 - 180);
    return { lat, lon };
  }

  start() {
    setInterval(() => {
      const vehicleId = 'vehicle-' + Math.floor(Math.random() * 10); 
      const currentVehicle = this.vehicles[vehicleId] || {
        position: this.generateRandomPosition(),
        timestamp: Date.now(),
        immobile: false,
      };

      if (Math.random() < this.immobilityProbability) {
        currentVehicle.immobile = true;
      } else {
        currentVehicle.position = this.generateRandomPosition();
        currentVehicle.immobile = false;
      }
      const timestamp = Date.now();

      if (currentVehicle.immobile) {
        if (timestamp - currentVehicle.timestamp > this.immobilityThreshold) {
          this.io.emit('alert', {
            vehicleId,
            message: `Vehicle ${vehicleId} is immobile for too long!`,
          });
        }
      } else {
        currentVehicle.timestamp = timestamp; // Reset timestamp if the vehicle moves
      }

      this.vehicles[vehicleId] = currentVehicle;
      this.io.emit('position', {
        vehicleId,
        position: currentVehicle.position,
        timestamp,
      });
    }, this.checkInterval);
  }
}

export default VehicleSimulator;
