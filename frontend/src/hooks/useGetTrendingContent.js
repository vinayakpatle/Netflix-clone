import { useState ,useEffect} from "react"
import { useContentStore } from "../store/content.js";
import { axiosInstance } from "../lib/axios.js";

export const useGetTrendingContent = () => {
    const [trendingContent, setTrendingContent] = useState(null)
    const {contentType}=useContentStore();

  useEffect(()=>{
    const fetchTrendingContent=async()=>{
        try{
          const response=await axiosInstance.get(`/${contentType}/trending`);
          setTrendingContent(response.data.content);
        }catch(e){
          console.log("Error in fetchTrendingContent "+e?.response?.data?.message);
          setTrendingContent([])
        }
    }

    fetchTrendingContent();

  },[contentType])

  //console.log(trendingContent)
  return {trendingContent};
}
