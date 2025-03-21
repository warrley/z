"use client"

import { user } from "@/data/user"
import { faImage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "../ui/button"

export const TweetPost = () => {
    const handleUploud = () => {

    };
    
    const handlePost = () => {

    }

    return (
        <div className="flex gap-6 px-8 py-6 border-b-2 border-gray-900">
            <img
                src={user.avatar}
                alt={user.name}
                className="size-12 rounded-full"
            />
            <div className="flex-1">
                <span
                    className="min-14 outline-0 text-lg text-white empty:before:text-gray-500 empty:before:content-[attr(data-placeholder)] inline-flex cursor-text"
                    role="textbox"
                    contentEditable
                    data-placeholder="What's happening?"
                >
                    
                </span>
                <div className="flex justify-between items-center mt-2">
                    <div className="cursor-pointer" onClick={handleUploud}>
                        <FontAwesomeIcon icon={faImage} className="text-xl"/>
                    </div>
                    <div className="w-28">
                        <Button
                            label="Post"
                            size={2}
                            onClick={handlePost}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}