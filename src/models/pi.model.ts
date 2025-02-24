import mongoose from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose);

const PISchema = new mongoose.Schema({
    _id: {
        type: Number,
        trim: true
    },
    authNumber: {
        type: String,
        required: true,
        trim: true
    },
    captors: [
      {
        captorid: {
          type: Number,
          required: true
        },
        value: {
            type: Number,
            required: true
        }
      },
    ],
}, { collection: 'PI' });

PISchema.plugin(AutoIncrement, { inc_field: '_id', id: 'pi_counter' });

export const PI = mongoose.model("PI", PISchema);
