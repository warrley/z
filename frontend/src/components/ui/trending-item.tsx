import Link from "next/link";

type Props = {
    label: string;
    count: number;
}

export const TrendingItem = ({ count, label }: Props) => {
    return (
        <Link
            href={`/search=${encodeURIComponent(label)}`}
            className="group/item"
        >
            <div className="group-hover/item:underline font-bold">{label}</div>
            <div className="text-sm text-gray-400">{count} posts</div>
        </Link>
    )
}

export const TrendingItemSkeleton = () => {
    return (
        <div className="flex flex-col gap-1 animate-pulse">
            <div className="bg-gray-600 w-3/4 h-4"></div>
            <div className="bg-gray-600 h-4 w-1/4"></div>
        </div>
    )
}