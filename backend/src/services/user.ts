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

export const update = async (slug: string, data: Prisma.UserUpdateInput) => {
    return await prisma.user.update({ where: { slug }, data });
};

export const alreadyFollowing = async (user1Slug: string, user2Slug: string) => {
    return (await prisma.follow.findFirst({ where: { user1Slug, user2Slug }, select: { id: true } })) ? true : false;
};

export const follow = async (user1Slug: string, user2Slug: string) => {
    await prisma.follow.create({ data: { user1Slug, user2Slug } });
};

export const unfollow = async (user1Slug: string, user2Slug: string) => {
    await prisma.follow.deleteMany({ where: { user1Slug, user2Slug } });
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
