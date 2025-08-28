import { User } from "./User";

export type Tweet = {   
    id: number;
    user: User;
    body: string;
    image?: string;
    likeCount: number;
    commentCount: number;
    retweetCount: number;
    liked: boolean;
    retweeted: boolean;
    dataPost: Date;
}