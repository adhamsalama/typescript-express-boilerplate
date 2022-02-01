import express, { Request, Response } from 'express';
import cookieSession from 'cookie-session';
import { currentUser } from './middleware/current-user';
import { requireAuth } from './middleware/require-auth';
import { signUpRouter } from './routes/signup';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
const app = express();

app.use(express.json());
app.use(cookieSession({ signed: false }));

app.use(signUpRouter);
app.use(signInRouter);
app.use(currentUser);
app.use(signOutRouter);

export { app };