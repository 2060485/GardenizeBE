import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '../utils/jwt.util';
import { UserService } from './user.service';

export class AuthService {
    public static async login(email: string, password: string): Promise<string> {
        const user = await UserService.findByEmail(email);
        
        if (!user) {
            throw new Error("Email not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.data.password);
        
        if (isPasswordValid) {
            const token = jwt.sign({ id: user.data.id, role: user.data.role }, JWT_SECRET, { expiresIn: '1h' });
            return token;
        } else {
            throw new Error("Invalid password");
        }
    }

    public static verifyToken(token: string): any {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (error) {
            throw new Error("Invalid or expired token");
        }
    }
}
