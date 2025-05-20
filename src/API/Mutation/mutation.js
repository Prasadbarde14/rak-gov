import { useMutation, useQuery } from '@tanstack/react-query';
import { useGetFetchQuery } from '../Query/query';
import { postGetSimmulationResult } from '../APICalls/api';

export const usePostGetSimmulationResult = (query, selected,enabled=false) => {
    const data  = useGetFetchQuery(['graphAnalysis', selected]); 

    return useQuery({
        queryKey:['Simmulation',selected],
        queryFn: async () => {
            if (Array.isArray(data)) {
                const responses = await Promise.all(
                    data.map((body) => postGetSimmulationResult({ query, body }))
                );
                return responses;
            } else {
                throw new Error('No data available to post');
            }
        },
        onSuccess: (res) => {
            // console.log('All responses:', res);
        },
        onError: (err) => {

            // console.error('Error in mutation:', err.message);
        },
        enabled:enabled
    });
};

export const usePostGetProjectPlanning = (query,selected,index,data,enabled=false) => {

    return useQuery({
        queryKey:['projectPlanning',selected,index],
        queryFn: async () => {
            return postGetSimmulationResult({ query, data})
        },
        select:(res)=>{
            return JSON.parse(res.data.text)
        },       
        enabled:enabled
    });
};

export const usePostGetMaintanenceOverview = (query,selected,index,data,enabled=false) => {

    return useQuery({
        queryKey:['maintanenceOverview',selected,index],
        queryFn: async () => {
            return postGetSimmulationResult({ query, data})
        },
        select:(res)=>{
            return JSON.parse(res.data.text)
        },       
        enabled:enabled
    });
};


export const usePostGraphsData = (query,selected,index,data,enabled=false) => {

    return useQuery({
        queryKey:['graphsData',selected,index],
        queryFn: async () => {
            return postGetSimmulationResult({ query, data})
        },
        select:(res)=>{
            
            return JSON.parse(res.data.text)
        }, 
        enabled:enabled      
    });
};
