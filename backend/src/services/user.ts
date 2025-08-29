import { Prisma, User } from "../generated/prisma";
import { prisma } from "../utils/prisma";
import { getPublicURL } from "../utils/url";

export const findByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if(user) {
        return {
            ...user,
            avatar: getPublicURL(user.avatar),
            cover: getPublicURL(user.cover)
        };
    };

    return null;
};

export const findBySlug = async (slug: string) => {
    const user = await prisma.user.findUnique({ where: { slug }, select: { avatar: true, cover: true, slug: true, name: true, bio: true, link: true } });

    if(user) {
        return {
            ...user,
            avatar: getPublicURL(user.avatar),
            cover: getPublicURL(user.cover)
        };
    };

    return null;
};

export const save = async (newUser: Prisma.UserCreateInput) => {
    const user = await prisma.user.create({ data: newUser });

    return {
        ...newUser,
        avatar: getPublicURL(user.avatar),
        cover: getPublicURL(user.cover)
    }
};

export const followingCount = async (userSlug: string) => {
    return await prisma.follow.count({
        where: { user1Slug: userSlug }
    });
};

export const followersCount = async (userSlug: string) => {
    return await prisma.follow.count({
        where: { user2Slug: userSlug }
    });
}

export const tweetCount = async (userSlug: string) => {
    return await prisma.tweet.count({
        where: { userSlug }
    });
};