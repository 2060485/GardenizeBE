import mongoose from "mongoose";
import { IUser } from "../interfaces/user.interface";
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema<IUser>({
  _id: {
    type: Number,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  notifications: [
    {
      message: {
        type: String,
      },
      date: {
        type: Date,
      },
      isRead: {
        type: Boolean,
      },
    },
  ],
  settings: {
    enableNotifications: {
      type: Boolean,
      default: true,
    },
    enableAlarm: {
      type: Boolean,
      default: false,
    }
  }
}, { collection: 'User' });

UserSchema.plugin(AutoIncrement, { inc_field: '_id', id: 'user_id_counter' });

export const User = mongoose.model('User', UserSchema);
