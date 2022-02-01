import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.currentUser) {
        return res.send({
            error: 'Not authorized',
            code: 403
        });
    }
    next();
}