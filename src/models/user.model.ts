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
});


export const User = mongoose.model('User', UserSchema);

