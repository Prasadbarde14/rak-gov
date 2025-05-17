import { useQuery,useQueryClient } from "@tanstack/react-query"
import {  getGraphData } from "../APICalls/api"

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
