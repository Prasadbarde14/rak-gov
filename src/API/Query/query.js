import { useQuery } from "@tanstack/react-query"
import {  getGraphData } from "../APICalls/api"

export const useGetGraphData=()=>{
    return useQuery({
        queryKey:['graphAnalysis'],
        queryFn:()=>getGraphData(),
    })
}