import axios from "axios"
import { graphData,performanceMatrics } from "./mockCallApi";

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

export async function getPerformanceMatrics(){
    // return await instance.get(url).then(response=>response.data)
    return Promise.all(performanceMatrics)
}

export default instance;