import { useQuery,useQueryClient } from "@tanstack/react-query"
import {  getGraphData,getAIrecommendationsData, getPerformanceMatrics, getMaintainceData, getGraphsData} from "../APICalls/api"

export const useGetFetchQuery = (key) => {
    const queryClient = useQueryClient();

    const data= queryClient.getQueryData(key);
    console.log(data)
    return data;
};


export const useGetGraphData = (selected) => {
    return useQuery({
        queryKey: ['graphAnalysis', selected ?? 'default'],  
        queryFn: ({ queryKey }) => getGraphData(queryKey[1]),
        enabled: Boolean(selected),  
    });
};

export const useGetPerformanceMatrics=()=>{
    return useQuery({
        queryKey:['performanceMatrics'],
        queryFn:()=>getPerformanceMatrics(),
    })
}

export const useGetAIrecommendationsData=(selected)=>{
    return useQuery({
        queryKey:['AIrecommendations',selected??'default'],
        queryFn:({queryKey})=>getAIrecommendationsData(queryKey[1]),
        enabled:Boolean(selected)
    })

}

export const useGetMaintenanceData=()=>{
    return useQuery({
        queryKey:['maintenanceData'],
        queryFn:()=>getMaintainceData(),
    })
}


export const useGetGraphsData=()=>{
    return useQuery({
        queryKey:['graphData'],
        queryFn:()=>getGraphsData()
    })
}