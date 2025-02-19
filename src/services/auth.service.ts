import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '../utils/jwt.util';
import { UserService } from './user.service';

export class AuthService {
    public static async login(email: string, password: string): Promise<string> {
        const user = await UserService.findByEmail(email);
        
        if (!user || user.http === 404) {
            throw new Error("Email not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.data.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const token = jwt.sign({ id: user.data.id, role: user.data.role }, JWT_SECRET, { expiresIn: '1h' });
        return token;
    }

    public static verifyToken(token: string): any {
        return jwt.verify(token, JWT_SECRET);
    }
}
