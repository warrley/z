import { Response } from "express";
import { AuthRequest } from "../middleware/privateRoute";
import { addTweetSchema } from "../schemas/add-tweet";
import { create, findAnswers, findById } from "../services/tweet";
import { addHastag } from "../services/trending";

export const addTweet = async (req: AuthRequest, res: Response) => {
    const safeData = addTweetSchema.safeParse(req.body);
    if(!safeData.success) {
        res.json({ error: safeData.error.flatten().fieldErrors });
        return;
    };

    const { body, answer } = safeData.data;

    if(answer) {
        if(!await findById(parseInt(answer))) {
            res.json({ error: "Original tweet doesn't exists" });
            return;
        };
    };

    const userSlug = req.userSlug as string;
    const tweet = await create( userSlug, body, answer ? parseInt(answer) : 0 );

    const hashtags = body.match(/#[a-zA-Z0-9_]+/g);
    if(hashtags) {
        for(let hashtag of hashtags) {
            if(hashtag.length >= 2) {
                await addHastag(hashtag);
            }
        };
    };


    res.status(201).json({ error: null, tweet });
};

export const getTweet = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const tweet = await findById(parseInt(id));
    if(!tweet) {
        res.json({ error: "Tweet inexists" });
        return;
    };
    
    res.json({ error: null, tweet });
};

export const getAnswers = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    
    const answers = await findAnswers(parseInt(id));

    res.json({ error: null, answers });
}