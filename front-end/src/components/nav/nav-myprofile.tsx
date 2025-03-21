import { user } from "@/data/User"
import Link from "next/link"

export const NavMyProfile = () => {
    return (
        <div className="flex gap-2 items-center">
            <div className="size-10 rounded-full overflow-hidden">
                <Link href={`/${user.slug}`}>
                    <img src={user.avatar} alt={user.name} className="size-full" />
                </Link>
            </div>
            <div className="flex-1 overflow-hidden">
                <Link className="block truncate" href={`/${user.slug}`}>
                    {user.name}
                </Link>
                <div className="text-sm text-gray-400 truncate">
                    @{user.slug}
                </div>
            </div>
        </div>
    )
}