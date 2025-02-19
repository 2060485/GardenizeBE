import mongoose, { Schema, Document } from "mongoose";
import { IPi } from "../interfaces/pi.interface";

const PiSchema = new Schema<IPi>({
  captors: [
    {
      humidity: {
        type: Number,
        required: true,
      },
    },
  ],
});

export const Pi = mongoose.model("Pi", PiSchema);