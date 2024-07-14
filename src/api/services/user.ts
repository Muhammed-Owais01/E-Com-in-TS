import UserDAO from '../daos/user';
import RequestError from '../exceptions/requestError';
import User from '../models/user';
import bcrypt from 'bcrypt';
import CartDAO from '../daos/cart';
import Cart from '../models/cart';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class UserService {
    async signUpUser(username: string, password: string): Promise<Cart> {
        const existingUser: User | null = await UserDAO.getByName(username);

        if (existingUser) throw new RequestError("User Already Exists", 409);
        
        const hash: string = await bcrypt.hash(password, 10);
        const user: User | null = await UserDAO.create(username, hash);
        if (!user) throw new RequestError("Could not create User", 505);
        
        const cart: Cart | null = await CartDAO.create(user.id);
        if (!cart) throw new RequestError("Could not create cart", 505);

        return cart;
    }

    async loginUser(username: string, password: string): Promise<string> {
        const user: User | null = await UserDAO.getByName(username);

        if (!user) throw new RequestError("User does not exist", 401);

        const result: boolean = await bcrypt.compare(password, user.password);
        if (!result) throw new RequestError("Authorization Failed", 401);

        const token: string = jwt.sign({
            username: user.username,
            userId: user.id
        }, process.env.JWT_KEY as string, { expiresIn: "4h" });

        return token;
    }

    async updateUser(id: number, username: string | undefined, password: string | undefined): Promise<void> {
        if (username) {
            const user: User | null = await UserDAO.getByName(username)
            if (!user) throw new RequestError("User does not exist", 401);
        }

        if (password) {
            const hash: string = await bcrypt.hash(password, 10);
            password = hash;
        }

        await UserDAO.update(id, username, password);
    }

    async deleteUser(userId: number): Promise<void> {
        const user: User | null = await UserDAO.getById(userId);
        if (!user) throw new RequestError("User does not exist", 401);

        await UserDAO.delete(userId);
    }
}

const UserServiceObj = new UserService;

export default UserServiceObj;