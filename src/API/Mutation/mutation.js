import { useMutation, useQuery } from '@tanstack/react-query';
import { useGetFetchQuery } from '../Query/query';
import { postGetSimmulationResult } from '../APICalls/api';

export const usePostGetSimmulationResult = (query, selected, enabled = false) => {
    const data = useGetFetchQuery(['graphAnalysis', selected]);

    return useQuery({
        queryKey: ['Simmulation', selected],
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
        select: (res) => {
            return res.map((i) => {
                try {
                    const parsed = JSON.parse(i.data.text);
                    if (parsed["performanceMetrics"]) {
                        return parsed["performanceMetrics"];
                    }

                    return parsed;
                } catch (e) {
                    console.error("Failed to parse response", e);
                    return null;
                }
            }).filter(Boolean); // remove any null values if JSON parsing fails
        },

        enabled: enabled
    });
};

export const usePostGetProjectPlanning = (query, selected, index, data, enabled = false) => {
    const simData = useGetFetchQuery(['graphAnalysis', selected]);
    return useQuery({
        queryKey: ['projectPlanning', selected, index],
        queryFn: async () => {
            const newBody = { ...simData[index], ...data, "project title:": selected }
            return postGetSimmulationResult({ query, body: newBody })
        },
        select: (res) => {
            const newData = JSON.parse(res.data.text)
            if (newData.projectData)
                return newData.projectData
            else
                return newData
        },
        enabled: enabled
    });
};

export const usePostGetMaintanenceOverview = (query, selected, index, data, enabled = false) => {
    const simData = useGetFetchQuery(['graphAnalysis', selected]);

    return useQuery({
        queryKey: ['maintanenceOverview', selected, index],
        queryFn: async () => {
            const newBody = { ...simData[index], ...data, "project title:": selected }

            return postGetSimmulationResult({ query, body: newBody })
        },
        select: (res) => {
            return JSON.parse(res.data.text)
        },
        enabled: enabled
    });
};


export const usePostGraphsData = (query, selected, index, data, enabled = false) => {
    const simData = useGetFetchQuery(['graphAnalysis', selected]);

    return useQuery({
        queryKey: ['graphsData', selected, index],
        queryFn: async () => {
            const newBody = { ...simData[index], ...data, "project title:": selected }
            return postGetSimmulationResult({ query, body: newBody })
        },
        select: (res) => {
            return JSON.parse(res.data.text).graphsData
        },
        enabled: enabled
    });
};

export const usePostAIRecommendation = (query, selected, enabled = false) => {
    const data = useGetFetchQuery(['graphAnalysis', selected]);


    return useQuery({
        queryKey: ['AIRecommend', selected],
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
        select: (res) => {
            return res.map((i) => {
                try {
                    const parsed = JSON.parse(i.data.text);

                    if (parsed["AI recommendations"]) {
                        return parsed["AI recommendations"];
                    }

                    return parsed;
                } catch (e) {
                    console.error("Failed to parse response", e);
                    return null;
                }
            }).filter(Boolean); // remove any null values if JSON parsing fails
        },
        enabled: Array.isArray(data)
    });
};