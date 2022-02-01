import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import { createJWT } from './utils';
import  MongoServerError from 'mongoose';

const router = Router();

router.post('/api/users/signup',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').isStrongPassword().withMessage('Password must be strong')
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = new User({
            email,
            password
        });
        try {
            await user.save();
        }
        catch (MongoServerError) {
            return res.send("Email is taken").status(400);
        }
        const token = createJWT({ email: user.email });

        req.session = {
            jwt: token,
            ...req.session
        };

        res.send(user).status(201);
});

export { router as signUpRouter };