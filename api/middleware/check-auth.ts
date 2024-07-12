import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler";
import RequestError from "../exceptions/requestError";


interface CustomRequest extends Request {
    userData?: string | JwtPayload;
}

const checkAuth = asyncHandler(async(req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader: string | undefined = req.headers.authorization;
        
        if (!authorizationHeader) throw new RequestError("Authorization Failed", 403);

        const token: string = authorizationHeader.split(" ")[1];
        const decoded: string | JwtPayload = jwt.verify(token, process.env.JWT_KEY as string);
        req.userData = decoded;
        next();
    } catch (error) {
        throw new RequestError("Authorization Failed", 403);
    }
})

export default checkAuth;