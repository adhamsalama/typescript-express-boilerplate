import mongoose from 'mongoose';
import { Password } from './password';

interface User {
    email: string;
    password: string;
    checkPassword: (password: string) => boolean;
}

const userSchema = new mongoose.Schema<User>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.checkPassword = async function(password: string) {
    console.log("")
    return await Password.compare(this.password, password);
}

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});
const User = mongoose.model<User>('User', userSchema);

export { User };