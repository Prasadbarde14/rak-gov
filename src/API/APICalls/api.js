import axios from "axios"

const instance = axios.create({
  baseURL : 'https://fakestoreapi.com',
  headers: {
    "Content-Type": "application/json",
  }, 
});

export async function getAllProducts(url){
    return await instance.get(url).then(response=>response.data)
}

export default instance;