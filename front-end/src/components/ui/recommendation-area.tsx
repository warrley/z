import { user } from "@/data/User"
import { RecommendationItem, RecommendationItemSkeleton } from "./recommendation-item"
import { TrendingItem, TrendingItemSkeleton } from "./trending-item"

export const RecommendationArea = () => {
    return (
        <div className="bg-gray-700 rounded-3xl p-4 flex flex-col gap-5">
            <h2 className="text-xl ">Suggestions</h2>
            <div className="flex flex-col gap-4 pt-0">
                <RecommendationItem user={user}/>
                <RecommendationItem user={user} />
                <RecommendationItemSkeleton/>
                <RecommendationItemSkeleton/>
            </div>
        </div>
    )
}