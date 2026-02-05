import { UserRepository } from '../repositories/userRepository';
import { comparePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';
import { AppError } from '../utils/AppError';
import { User } from '../types/userType';

export class AuthService {
    static async login(user: User): Promise<{ token: string }> {
        const { username, password } = user;
        if (!username || !password) {
            throw new AppError('Username and password are required', 400);
        }

        const existingUser = await UserRepository.findByUsername(username);
        if (!existingUser || !existingUser.password) {
            throw new AppError('Invalid credentials', 401);
        }

        const isMatch = await comparePassword(password, existingUser.password);
        if (!isMatch) {
            throw new AppError('Invalid credentials', 401);
        }

        // We know existingUser.id is defined because it came from DB
        const token = generateToken({ id: existingUser.id!, username: existingUser.username });
        return { token };
    }
}
