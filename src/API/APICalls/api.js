import axios from "axios"
import { graphData,performanceMatrics,AIrecommendations, maintenanceData ,graphsData, projectData} from "./mockCallApi";

const instance = axios.create({
  baseURL : 'https://fakestoreapi.com',
  headers: {
    "Content-Type": "application/json",
  }, 
});

instance.interceptors.request.use(async (config) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return config;
});

export async function getGraphData(selected){
    // return await instance.get(url).then(response=>response.data)
    return await Promise.all(graphData[selected])
}

export async function getPerformanceMatrics(){
    // return await instance.get(url).then(response=>response.data)
    return await Promise.all(performanceMatrics)
}

export async function getAIrecommendationsData(selected){
  // return await instance.get(url).then(response=>response.data)
  return await Promise.all(AIrecommendations[selected])
}

export async function getMaintainceData(){
  return maintenanceData
}

export async function getGraphsData(){
  return graphsData
}

export async function getProjectData(){
  return projectData
}

export default instance;