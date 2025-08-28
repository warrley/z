"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Logo } from "../ui/logo"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { HomeMenu } from "./home-menu"

export const HomeHeader = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className="lg:hidden flex justify-between p-6 border-b-2 border-gray-900 items-center">
            <div className="lg:hidden">
                <Logo size={24}/>
            </div>
            <div className="hidden lg:block text-2xl">
                Home Page
            </div>

            <div
                className="lg:hidden cursor-pointer"
                onClick={() => setShowMenu(true)}
            >
                <FontAwesomeIcon icon={faBars} className="text-xl" />
            </div>

            {showMenu && 
                <HomeMenu
                    closeAction={() => setShowMenu(false)}
                />
            }
        </header>
    )
}