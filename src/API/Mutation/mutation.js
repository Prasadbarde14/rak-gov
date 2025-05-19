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
            console.log('All responses:', res);
        },
        onError: (err) => {

            console.error('Error in mutation:', err.message);
        },
        enabled:enabled
    });
};
