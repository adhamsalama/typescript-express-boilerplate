import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import { createJWT } from './utils';


const router = Router();

router.post('/api/users/signin',
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
        const user = await User.findOne({ email: email });
        if (!user || await user.checkPassword(password) !== true) {
            return res.send({
                message: 'Invalid Credentials'
            }).status(403);
        }

        const token = createJWT({ email: user.email });

        req.session = {
            ...req.session,
            jwt: token
        };
    
        res.send("Logged in successfully").status(200);

});

export { router as signInRouter };