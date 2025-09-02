import { Response } from "express";
import { AuthRequest } from "../middleware/privateRoute";
import { find } from "../services/trending";

export const getTrends = async (req: AuthRequest, res: Response) => {
    const trends = await find();

    res.json({ error: null, trends });
};