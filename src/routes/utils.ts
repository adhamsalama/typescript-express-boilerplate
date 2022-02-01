import jwt from 'jsonwebtoken';

export function createJWT({...data}) {
    return jwt.sign({
        ...data,
    },
    process.env.JWT_KEY!, { expiresIn: 60});
}