import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from "../APICalls/api"

export const useGetAllProducts=(url)=>{
    return useQuery({
        queryKey:['products'],
        queryFn:(url)=>getAllProducts(url),
    })
}