import fetchFromTMDB from "../services/tmdb.service.js";


export const getTrendingMovie=async(req,res)=>{
    try{
        const data=await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randomMovie=data.results[Math.floor(Math.random()*data.results?.length)];
        return res.status(200).json({content:randomMovie})
    }catch(e){
        if(e.message.includes("404")){
            return res.status(404).send(null)
        }
        console.log('Error in getTrendingMovie',e.message);
        return res.status(500).json({message:"Internal server error",error:e.message})
    }
}

export const getMovieTrailers=async(req,res)=>{
    const id=req.params.id;
    try{
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
        return res.status(200).json({trailers:data.results});
    }catch(e){
        if(e.message.includes("404")){
            return res.status(404).send(null)
        }
        console.log('Error in getMovieTrailers',e.message);
        return res.status(500).json({message:"Internal server error",error:e.message});
    }
}

export const getMovieDetails=async(req,res)=>{
    const id=req.params.id;
    try{
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        return res.status(200).json({details:data})
    }catch(e){
        if(e.message.includes("404")){
            return res.status(404).send(null)
        }
        console.log('Error in getMovieDetails',e.message);
        return res.status(500).json({message:"Internal server error",error:e.message})
    }
}

export const getSimilarMovies=async(req,res)=>{
    const id=req.params.id;
    try{
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        return res.status(200).json({similarContent:data.results});
    }catch(e){
        console.log('Error in getSimilarMovies',e.message);
        return res.status(500).json({message:"Internal server error",error:e.message});
    }
}

export const getMoviesByCategory=async(req,res)=>{
    const category=req.params.category;
    try{
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
        return res.status(200).json({content:data.results})
    }catch(e){
        console.log('Error in getMoviesByCategory',e.message);
        return res.status(500).json({message:"Internal server error",error:e.message});
    }
}