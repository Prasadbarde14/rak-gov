import axios from "axios"
import { graphData,AIrecommendations } from "./mockCallApi";

const instance = axios.create({
  baseURL : 'https://fakestoreapi.com',
  headers: {
    "Content-Type": "application/json",
  }, 
});

export async function getGraphData(){
    // return await instance.get(url).then(response=>response.data)
    return Promise.all(graphData)
}

export async function getAIrecommendationsData(){
  // return await instance.get(url).then(response=>response.data)
  return Promise.all(AIrecommendations)
}

export default instance;