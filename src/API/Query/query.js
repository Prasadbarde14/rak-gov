import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { getGraphData, getAIrecommendationsData, getPerformanceMatrics, getMaintainceData, getGraphsData, getProjectData, getChatBotResponse, getAutoSimulation, getActionPlans } from "../APICalls/api"
import { postGetSimmulationResult } from '../APICalls/api';
import { actionPlans } from "../APICalls/mockCallApi";

export const useGetFetchQuery = (key) => {
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData(key);
    return data;
};

export const useGetFetchQueryState = (key) => {
    const queryClient = useQueryClient()
    const data = queryClient.getQueryState(key)
    return data
}

export const useGetGraphData = (selected) => {
    return useQuery({
        queryKey: ['graphAnalysis', selected ?? 'default'],
        queryFn: ({ queryKey }) => getGraphData(queryKey[1]),
        enabled: Boolean(selected),
    });
};

export const useGetPerformanceMatrics = () => {
    return useQuery({
        queryKey: ['performanceMatrics'],
        queryFn: () => getPerformanceMatrics(),
    })
}

export const useGetAIrecommendationsData = (selected) => {
    return useQuery({
        queryKey: ['AIrecommendations', selected ?? 'default'],
        queryFn: ({ queryKey }) => getAIrecommendationsData(queryKey[1]),
        enabled: Boolean(selected)
    })

}

export const useGetActionPlan = (selected) => {
    return useQuery({
        queryKey: ['ActionPlans', selected ?? "default"],
        queryFn: ({queryKey}) => getActionPlans(queryKey[1]),
        enabled: Boolean(selected)
    })
}

export const useGetMaintenanceData = () => {
    return useQuery({
        queryKey: ['maintenanceData'],
        queryFn: () => getMaintainceData(),
    })
}


export const useGetGraphsData = () => {
    return useQuery({
        queryKey: ['graphData'],
        queryFn: () => getGraphsData()
    })
}

export const useGetProjectData = () => {
    return useQuery({
        queryKey: ['projectData'],
        queryFn: () => getProjectData()
    })
}

export const usePostAgentResponse = (selected) => {
    return useQuery({
        queryKey: ['agentQuery', selected],
        queryFn: ({ queryKey }) => postAgentData(queryKey[1])
    })
}

export const useChatBotMutation = () => {
    return useMutation({
        mutationFn: getChatBotResponse,
    });
};

export const useGetAutoSimulation = (selected, enabled) => {

    const data = useGetFetchQuery(['graphAnalysis', selected]);

    return useQuery({
        queryKey: ['autoSimulate', selected],
        queryFn: () => getAutoSimulation({ body: data }),
        select: (res) => {
            console.log(res)
            return JSON.parse(res.data.text)
        },
        enabled: enabled
    })
}


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
                    if (parsed["data"]) {
                        return parsed["data"];
                    }

                    return parsed;
                } catch (e) {
                    console.error("Failed to parse response", e);
                    return null;
                }
            }).filter(Boolean);
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
            if (newData['data'])
                return newData['data']
            else
                return newData
        },
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
            return JSON.parse(res.data.text).data
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
            try {
                const parsed = JSON.parse(res.data.text);

                console.log(parsed.data)
                if (parsed["data"]) {
                    return parsed["data"];
                }
                return parsed;
            } catch (e) {

                console.error("Failed to parse response", e, res.data.text);
                return null;
            }
        },
        enabled: enabled
    });
};

export const usePostAIRecommendation = (query, selected, enabled,data) => {


    return useQuery({
        queryKey: ['AIRecommend', selected],
        queryFn: async () => {
                const responses = await Promise.all(
                    data.map((body) => postGetSimmulationResult({ query, body }))
                );
                return responses;
        },
        select: (res) => {
            return res.map((i) => {
                try {
                    const parsed = JSON.parse(i.data.text);
                    if (parsed["data"]) {
                        return parsed["data"];
                    }
                    return parsed;
                } catch (e) {

                    console.error("Failed to parse response", e, i.data.text);
                    return null;
                }
            }).filter(Boolean);
        },
        enabled: enabled
    });
};


export const usePostAIActionPlan = (query, selected, enabled,data) => {

    console.log("data: ",data);
    return useQuery({
        queryKey: ['AIRecommendAction', selected],
        queryFn: async () => {
                const responses = await Promise.all(
                    actionPlans[selected].map((body) => postGetSimmulationResult({ query, body }))
                );
                return responses;
        },
        select: (res) => {
            return res.map((i) => {
                try {
                    const parsed = JSON.parse(i.data.text);
                    if (parsed["data"]) {
                        return parsed["data"];
                    }
                    return parsed;
                } catch (e) {

                    console.error("Failed to parse response", e, i.data.text);
                    return null;
                }
            }).filter(Boolean);
        },
        enabled: enabled
    });
}