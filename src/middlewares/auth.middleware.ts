import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/jwt.util';

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            res.status(403).json({ message: 'Access denied. No token provided.' });
            return;
        }

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                res.status(403).json({ message: 'Access denied or invalid token.' });
                return;
            }
            
            req.body.user = user;
            next();
        });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token or unauthorized access.' });
    }
};
