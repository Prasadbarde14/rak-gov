import {
  TrendingUp,
} from "lucide-react";
import {
  useGetFetchQueryState,usePostAIRecommendation
} from "../../../API/Query/query";
import SkeletonRecommendationCard from "./SkeletonRecommendationCard";
import RecommendationCard from "../../ActionPlan/RecommendationCard";



// Main Recommendation Card


// Main Wrapper Component
function AIrecommendations({ selected }) {

  const data = useGetFetchQueryState(['graphAnalysis', selected]);
  
  const mutatePerformaceData = usePostAIRecommendation("give me AIRecommendations ", selected)
  return (
    <>
      <div className="border-b p-4 flex items-center gap-2 font-semibold text-gray-800">
        <TrendingUp color="#F59E0B" size={20} />
        AI Recommendations
      </div>

      <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
        {mutatePerformaceData.isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <SkeletonRecommendationCard key={i} />
          ))}

        {!mutatePerformaceData.isLoading &&
          !mutatePerformaceData.isError &&
          mutatePerformaceData?.data?.map((rec, index) => <RecommendationCard key={index} data={rec} selected={selected}/>)}
      </div>
    </>
  );
}

export default AIrecommendations;
