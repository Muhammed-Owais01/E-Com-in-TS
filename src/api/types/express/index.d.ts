import { JwtPayload } from "jsonwebtoken";
import { Express } from "express";
import { Multer } from "multer";

declare global {
    namespace Express {
        interface Request {
            userData?: JwtPayload;
            userId?: number;
            file?: Express.Multer.File;
        }
    }
}