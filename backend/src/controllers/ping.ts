import { Response } from "express";
import { AuthRequest } from "../middleware/privateRoute";

export const ping = (req: AuthRequest, res: Response) => {
    res.json({ pong: false })
};

export const privateping = (req: AuthRequest, res: Response) => {
    res.json({ userSlug: req.userSlug });
}