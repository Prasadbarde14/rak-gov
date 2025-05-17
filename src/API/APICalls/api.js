import axios from "axios"
import { graphData,performanceMatrics,AIrecommendations } from "./mockCallApi";

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
    console.log(selected)
    return Promise.all(graphData[selected])
}

export async function getPerformanceMatrics(){
    // return await instance.get(url).then(response=>response.data)
    return Promise.all(performanceMatrics)
}

export async function getAIrecommendationsData(selected){
  // return await instance.get(url).then(response=>response.data)
  return Promise.all(AIrecommendations[selected])
}

export default instance;