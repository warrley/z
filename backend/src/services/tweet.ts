import { prisma } from "../utils/prisma"
import { getPublicURL } from "../utils/url";

export const findById = async (id: number) => {
    const tweet = await prisma.tweet.findFirst({ 
        include: {
            user: {
                select: {
                    name: true, avatar: true, slug: true
                }
            },
            likes: {
                select: { userSlug: true }
            }
        },
        where: { id } 
    });
    
    if(tweet) {
        tweet.user.avatar = getPublicURL(tweet.user.avatar);
        return tweet;
    };
};

export const findXTweetsByUserSlug = async (userSlug: string, page: number, limit: number) => {
    return await prisma.tweet.findMany({
        include: {
            likes: { 
                select: { userSlug: true }
            }
        },
        where: { userSlug, answerOf: 0 },
        orderBy: { createdAt: "desc" },
        skip: page * limit,
        take: limit
    });
};

export const findAnswers = async (id: number) => {
    const tweets = await prisma.tweet.findMany({
        include: {
            user: {
                select: {
                    name: true, avatar: true, slug: true
                }
            },
            likes: {
                select: { userSlug: true }
            }
        },
        where: { answerOf: id }
    });

    for(let tweetIndex in tweets) {
        tweets[tweetIndex].user.avatar = getPublicURL(tweets[tweetIndex].user.avatar);
    };

    return tweets;
};

export const create = async (userSlug: string, body: string, answer: number) => {
    return await prisma.tweet.create({
        data: {
            body,
            userSlug,
            answerOf: answer ?? 0
        }
    });
};


export const tweetIsLikedByUser = async (userSlug: string, id: number) => {
    const isLiked = await prisma.tweetLike.findFirst({
        where: { userSlug: userSlug, tweetId: id }
    });
    
    return isLiked ? true : false;
};

export const unlike = async (userSlug: string, id: number) => {
    await prisma.tweetLike.deleteMany({ where: { tweetId: id, userSlug } });
};

export const like = async (userSlug: string, id: number) => {
    await prisma.tweetLike.create({ data: { userSlug, tweetId: id } });
};