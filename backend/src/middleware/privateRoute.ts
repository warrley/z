import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
    userSlug?: string;
};

type payloadType = {
    iat: number;
    exp: number;
    userSlug: string;
}

export const privateRoute = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token =  req.headers.authorization?.split("Bearer ")[1];
    if(!token) {
        res.json({ error: "Token not provided" });
        return;
    };

    const result = await verifyToken(token);
    if(!result.valid) {
        res.json({ error: "Acess denied" });
        return;
    }

    req.userSlug = (result.payload as payloadType).userSlug;
    next();
};