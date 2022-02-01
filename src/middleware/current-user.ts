import { Request, Response, NextFunction } from 'express';
import jwt, {TokenExpiredError} from 'jsonwebtoken';
import { User } from '../models/user';

interface UserPayload {
    email: string;
    password: string;
}
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}
export async function currentUser(req: Request, res: Response, next: NextFunction) {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;
    }
    catch (TokenExpiredError) {}
    next();
}