import { NextFunction, Request, Response } from "express";
import UserService from "../services/user";
import RequestError from "../exceptions/requestError";
import Cart from "../models/cart";
import { ReturnResponse } from "../types/global";

class UserController {
    async user_signup(req: Request, res: Response, next: NextFunction): Promise<ReturnResponse> {
        const { username, password }: { username: string | undefined, password: string | undefined } = req.body;
        if (!username || !password) throw new RequestError("Invalid Request", 405);

        const cart: Cart = await UserService.signUpUser(username, password);

        return res.status(200).json({ "message": "User created" });
    }

    async user_login(req: Request, res: Response, next: NextFunction): Promise<ReturnResponse> {
        const { username, password }: { username: string | undefined, password: string | undefined} = req.body;
        if (!username || !password) throw new RequestError("Invalid Request", 405);

        const token: string = await UserService.loginUser(username, password);

        return res.status(200).json({
            message: "User logged in",
            token: `Bearer ${token}`
        });
    }

    async update_user(req: Request, res: Response, next: NextFunction): Promise<ReturnResponse> {
        const id: number = parseInt(req.params.userId);
        
        const { username, password }: { username?: string, password?: string} = req.body;

        const updatedUser: void = await UserService.updateUser(id, username, password);

        return res.status(200).json({ message: "User Updated" });
    }

    async delete_user(req: Request, res: Response, next: NextFunction): Promise<ReturnResponse> {
        const id: number = parseInt(req.params.userId);

        const deletedUser = await UserService.deleteUser(id);

        return res.status(200).json({ message: "Successfully deleted user" });
    }
}

const UserControllerObj = new UserController;

export default UserControllerObj;