import mongoose from "mongoose";
const CarSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    vin_plate: { 
        type: String, 
        required: true, 
        unique: true 
    },
    provider_info: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Provider', 
        required: true 
    },
    picture: {
        type: String, 
        required: true
    },
    capacity: { 
        type: Number, 
        required: true 
    },
    model: { 
        type: String, 
        required: true 
    },
    pricePerDay: { 
        type: Number, 
        required: true 
    },
  },
);
const Car = mongoose.models.Car || mongoose.model("Car",CarSchema)
export default Car