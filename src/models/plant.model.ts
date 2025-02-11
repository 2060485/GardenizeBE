import mongoose from "mongoose";
import { IPlant } from "../interfaces/plant.interface";

const PlantSchema = new mongoose.Schema<IPlant>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    captorID: {
        type: String,
    }
});

export const Plant = mongoose.model<IPlant>("Plant", PlantSchema);
