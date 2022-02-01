import mongoose from 'mongoose';
import { app } from './app';

import "dotenv/config";


async function start() {
    if (!process.env.JWT_KEY) throw new Error("JWT_KEY not provided");
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Connected to MongoDB')
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Running at port ${PORT}`);
    });    
}

start();