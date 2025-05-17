import axios from "axios"
import { graphData } from "./mockCallApi";

const instance = axios.create({
  baseURL : 'https://fakestoreapi.com',
  headers: {
    "Content-Type": "application/json",
  }, 
});

export async function getGraphData(selected){
    // return await instance.get(url).then(response=>response.data)
    console.log(selected)
    return Promise.all(graphData[selected])
}

export default instance;