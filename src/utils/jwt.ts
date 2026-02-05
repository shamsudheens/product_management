import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret';

export const generateToken = (user: { id: number; username: string }): string => {
    return jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, SECRET);
};
