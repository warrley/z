import { Response } from "express";
import { AuthRequest } from "../middleware/privateRoute";
import { findBySlug, followersCount, followingCount, tweetCount } from "../services/user";

export const getUser = async (req: AuthRequest, res: Response) => {
    const userSlug = req.params.slug;

    const user = await findBySlug(userSlug);
    if(!user) {
        res.json({ error: "User does not exists" });
        return;
    };

    const userFollowingCount = await followingCount(user.slug);
    const userFollowersCount = await followersCount(user.slug);
    const userTweetCount = await tweetCount(user.slug);

    res.json({ error: null, user: { ...user, followingQt: userFollowingCount, followersQt: userFollowersCount, tweetsQt: userTweetCount } });
};