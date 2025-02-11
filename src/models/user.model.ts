import mongoose from "mongoose";
import { IUser } from "../interfaces/user.interface";

const UserSchema = new mongoose.Schema<IUser>({
    
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
    settingId: {
        type: String,
        required: true
    },
});


export const User = mongoose.model('User', UserSchema);

