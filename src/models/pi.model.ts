import mongoose, { Schema, Document } from "mongoose";
import { IPi } from "../interfaces/pi.interface";

interface PiDocument extends IPi, Document {}

const PiSchema = new Schema<PiDocument>({
  captors: [
    {
      humidity: {
        type: Number,
        required: true,
      },
    },
  ],
});

export const Game = mongoose.model("Game", PiSchema);