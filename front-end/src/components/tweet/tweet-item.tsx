"use client"

import { Tweet } from "@/types/tweet"
import { formatRelativeTime } from "@/utils/format-relative"
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as faHeartFilled} from "@fortawesome/free-solid-svg-icons"
import { faRetweet } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useState } from "react"

type Props = {
    tweet: Tweet
    hideComments: boolean;
}

export const TweetItem = ({ tweet, hideComments }: Props) => {
    const [liked, setLiked] = useState(tweet.liked);

    const handleLike = () => {
        setLiked(!liked);
    };
    
    return (
        <div className="flex gap-2 p-6 border-b-2 border-gray-900">
            <Link href={`/${tweet.user.slug}`}>
                <img
                    src={tweet.user.avatar}
                    alt=""
                    className="size-10 rounded-full"
                />
            </Link>
            <div className="flex-1">
                <div className="flex flex-wrap items-center gap-x-3">
                    <Link href={`/${tweet.user.slug}`} className="font-bold text-lg">
                        {tweet.user.name}
                    </Link>
                    <div className="text-sm text-gray-500">@{tweet.user.slug} - {formatRelativeTime(tweet.dataPost)}</div>
                </div>
                <div className="py-4 text-lg">{tweet.body}</div>
                {tweet.image &&
                    <img
                        src={tweet.image}
                        alt=""
                        className="w-full rounded-2xl"
                    />
                }
                <div className="flex mt-6 text-gray-500">
                    {!hideComments &&  
                        <div className="flex-1">
                            <Link href={`/tweet/${tweet.id}`}>
                                <div className="inline-flex items-center gap-2 cursor-pointer">
                                    <FontAwesomeIcon icon={faComment} className="text-xl" />
                                    <div className="text-lg">{tweet.likeCount}</div>
                                </div>
                            </Link>
                        </div>
                    }
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 cursor-pointer">
                            <FontAwesomeIcon icon={faRetweet} className="text-xl" />
                            <div className="text-lg">{tweet.retweetCount}</div>
                        </div>
                    </div>
                    <div className={`flex-1 ${liked ? 'text-red-500' : "text-gray-500"}`}>
                        <div className="inline-flex items-center gap-2 cursor-pointer" onClick={handleLike}>
                            <FontAwesomeIcon icon={liked ? faHeartFilled : faHeart} className={`text-xl`} />
                            <div className="text-lg">{tweet.likeCount}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}