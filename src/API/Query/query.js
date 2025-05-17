import { useQuery } from "@tanstack/react-query"
import {  getGraphData, getPerformanceMatrics} from "../APICalls/api"

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