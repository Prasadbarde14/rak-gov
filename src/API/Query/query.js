import { useQuery } from "@tanstack/react-query"
import {  getGraphData,getAIrecommendationsData } from "../APICalls/api"

export const useGetGraphData=()=>{
    return useQuery({
        queryKey:['graphAnalysis'],
        queryFn:()=>getGraphData(),
    })
}

export const useGetAIrecommendationsData=()=>{
    return useQuery({
        queryKey:['AIrecommendations'],
        queryFn:()=>getAIrecommendationsData(),
    })
}

