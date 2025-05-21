import { useQuery,useQueryClient,useMutation } from "@tanstack/react-query"
import {  getGraphData,getAIrecommendationsData, getPerformanceMatrics, getMaintainceData, getGraphsData, getProjectData, getChatBotResponse, getAutoSimulation} from "../APICalls/api"

export const useGetFetchQuery = (key) => {
    const queryClient = useQueryClient();   
    const data= queryClient.getQueryData(key);
    return data;
};

export const useGetFetchQueryState=(key)=>{
    const queryClient=useQueryClient()
    const data=queryClient.getQueryState(key)
    return data
}

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

export const useGetProjectData=()=>{
    return useQuery({
        queryKey:['projectData'],
        queryFn:()=>getProjectData()
    })
}

export const usePostAgentResponse=(selected)=>{
    return useQuery({
        queryKey:['agentQuery',selected],
        queryFn:({queryKey})=>postAgentData(queryKey[1])
    })
}

export const useChatBotMutation = () => {
  return useMutation({
    mutationFn: getChatBotResponse,
  });
};

export const useGetAutoSimulation=(selected,enabled)=>{

    const data  = useGetFetchQuery(['graphAnalysis', selected]); 

    return useQuery({
        queryKey:['autoSimulate',selected],
        queryFn:()=>getAutoSimulation({body:data}),
        select:(res)=>{
            console.log(res)
            return JSON.parse(res.data.text)
        },  
        enabled:enabled
    })
}