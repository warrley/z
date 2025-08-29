import { Response } from "express";
import { AuthRequest } from "../middleware/privateRoute";
import { findBySlug, followersCount, followingCount, tweetCount } from "../services/user";
import { findXTweetsByUserSlug } from "../services/tweet";

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

export const getUserTweets = async (req: AuthRequest, res: Response) => {
    const userSlug = req.params.slug;
    const limit = parseInt(req.query.limit as string ?? 10);
    const page = parseInt(req.query.page as string ?? 0);

    console.log(limit);

    const user = await findBySlug(userSlug);
    if(!user) {
        res.json({ error: "User does not exists" });
        return;
    };

    const tweets = await findXTweetsByUserSlug(userSlug, page, limit);
    
    res.json({ error: null, tweets, page });
};