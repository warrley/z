import { Response } from "express";
import { AuthRequest } from "../middleware/privateRoute";
import { searchSchema } from "../schemas/searchSchema";
import { findByBody } from "../services/tweet";

export const searchTweets = async(req: AuthRequest, res: Response) => {
    const safeSearch = searchSchema.safeParse(req.query);
    if(!safeSearch.success) {
        res.json({ error: safeSearch.error.flatten().fieldErrors });
        return;
    };

    const limit = parseInt(req.query.limit as string ?? 10);
    const page = parseInt(req.query.page as string ?? 0);

    const tweets = await findByBody(safeSearch.data.q, limit, page);

    res.json({ error: null, tweets, page });
};