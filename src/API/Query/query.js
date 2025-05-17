import { useQuery } from "@tanstack/react-query"
import {  getGraphData,getAIrecommendationsData, getPerformanceMatrics} from "../APICalls/api"

export const useGetGraphData=()=>{
    return useQuery({
        queryKey:['graphAnalysis'],
        queryFn:()=>getGraphData(),
    })
}
export const useGetPerformanceMatrics=()=>{
    return useQuery({
        queryKey:['performanceMatrics'],
        queryFn:()=>getPerformanceMatrics(),
    })
}

export const useGetAIrecommendationsData=()=>{
    return useQuery({
        queryKey:['AIrecommendations'],
        queryFn:()=>getAIrecommendationsData(),
    })
}

