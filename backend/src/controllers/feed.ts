import { Response } from "express";
import { AuthRequest } from "../middleware/privateRoute";
import { usersFollowing } from "../services/user";
import { findFeed } from "../services/tweet";

export const getFeed = async (req: AuthRequest, res: Response) => {
    const limit = parseInt(req.query.limit as string ?? 10);
    const page = parseInt(req.query.page as string ?? 0);

    const following = await usersFollowing(req.userSlug as string);
    const tweets = await findFeed(following, limit, page);

    res.json({ error: null, tweets, page })
};