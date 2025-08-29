import { prisma } from "../utils/prisma"
import { getPublicURL } from "../utils/url";

export const find = async (id: number) => {
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

export const create = async (userSlug: string, body: string, answer: number) => {
    return await prisma.tweet.create({
        data: {
            body,
            userSlug,
            answerOf: answer ?? 0
        }
    });
};