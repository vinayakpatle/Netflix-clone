import fetchFromTMDB from "../services/tmdb.service.js";


export const getTrendingTv=async(req,res)=>{
    try{
        const data=await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        const randomTv=data.results[Math.floor(Math.random()*data.results?.length)];
        return res.status(200).json({content:randomTv})
    }catch(e){
        if(e.message.includes("404")){
            return res.status(404).send(null)
        }
        console.log('Error in getTrendingTv',e.message);
        return res.status(500).json({message:"Internal server error",error:e.message})
    }
}

export const getTvTrailers=async(req,res)=>{
    const id=req.params.id;
    try{
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
        return res.status(200).json({trailers:data.results});
    }catch(e){
        if(e.message.includes("404")){
            return res.status(404).send(null)
        }
        console.log('Error in getTvTrailers',e.message);
        return res.status(500).json({message:"Internal server error",error:e.message});
    }
}

export const getTvDetails=async(req,res)=>{
    const id=req.params.id;
    try{
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        return res.status(200).json({details:data})
    }catch(e){
        if(e.message.includes("404")){
            return res.status(404).send(null)
        }
        console.log('Error in getTvDetails',e.message);
        return res.status(500).json({message:"Internal server error",error:e.message})
    }
}

export const getSimilarTv=async(req,res)=>{
    const id=req.params.id;
    try{
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        return res.status(200).json({similarContent:data.results});
    }catch(e){
        console.log('Error in getSimilarTv',e.message);
        return res.status(500).json({message:"Internal server error",error:e.message});
    }
}

export const getTvByCategory=async(req,res)=>{
    const category=req.params.category;
    try{
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
        return res.status(200).json({content:data.results})
    }catch(e){
        console.log('Error in getTvByCategory',e.message);
        return res.status(500).json({message:"Internal server error",error:e.message});
    }
}