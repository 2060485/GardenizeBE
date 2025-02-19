import mongoose from "mongoose";
import { IPlant } from "../interfaces/plant.interface";
const AutoIncrement = require('mongoose-sequence')(mongoose);

const PlantSchema = new mongoose.Schema<IPlant>({
    _id: {
        type: Number,
        trim: true
    },
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
        required: false
    }
}, { collection: 'Plant' });

PlantSchema.plugin(AutoIncrement, { inc_field: '_id', id: 'plant_id_counter' });

export const Plant = mongoose.model<IPlant>("Plant", PlantSchema);
