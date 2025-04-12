import fetchFromTMDB from "../services/tmdb.service.js";
import client from '../lib/db.js'

export const searchPerson=async(req,res)=>{
    const query=req.params.query;
    try{
        const response=await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)
        if(response.results.length===0){
            return res.status(404).send(null);
        }
        await client.user.update({
            where:{
                id:req.user.id
            },
            data:{
                searchHistory:{
                    push:{
                        id:response.results[0].id,
                        image:response.results[0].profile_path,
                        title:response.results[0].name,
                        searchType:"person",
                        createdAt:new Date()
                    }
                }
            }
        })

        return res.status(200).json({content:response.results});

    }catch(e){
        console.log('Error in searchPerson',e.message);
        return res.status(500).json({message:"Internal server error",error:e.message});
    }
}

export const searchMovie=async(req,res)=>{
    const query=req.params.query;
    try{
        const response=await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
        if(response.results.length===0){
            return res.status(404).send(null);
        }
        await client.user.update({
            where:{
                id:req.user.id
            },
            data:{
                searchHistory:{
                    push:{
                        id:response.results[0].id,
                        image:response.results[0].poster_path,
                        title:response.results[0].title,
                        searchType:"movie",
                        createdAt:new Date()
                    }
                }
            }
        })

        return res.status(200).json({content:response.results});

    }catch(e){
        console.log('Error in searchMovie',e.message);
        return res.status(500).json({message:"Internal server error",error:e.message});
    }
}

export const searchTv=async(req,res)=>{
    const query=req.params.query;
    try{
        const response=await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)
        if(response.results.length===0){
            return res.status(404).send(null);
        }
        await client.user.update({
            where:{
                id:req.user.id
            },
            data:{
                searchHistory:{
                    push:{
                        id:response.results[0].id,
                        image:response.results[0].poster_path,
                        title:response.results[0].name,
                        searchType:"tv",
                        createdAt:new Date()
                    }
                }
            }
        })

        return res.status(200).json({content:response.results});

    }catch(e){
        console.log('Error in searchTv',e.message);
        return res.status(500).json({message:"Internal server error",error:e.message});
    }
}

export const getSearchHistory=async(req,res)=>{
    try{
        const content=req.user.searchHistory;
        return res.status(200).json({content:content})
    }catch(e){
        console.log('Error in getSearchHistory',e.message);
        return res.status(500).json({message:"Internal server error",error:e.message})
    }
}

export const removeItemFromSearchHistory = async(req, res) => {
    const id = req.params.id;
    try {
        const currentUser=await client.user.findUnique({
            where:{
                id:req.user.id
            },
            select:{
                searchHistory:true
            }
        })

        const updatedHistory=currentUser.searchHistory.filter(item=>item.id!==parseInt(id));
        await client.user.update({
            where:{
                id:req.user.id
            },
            data:{
                searchHistory:{
                    set:updatedHistory
                }
            }
        })
        return res.status(200).json({message: "Item removed from search history"});
    } catch(e) {
        console.log('Error in removeItemFromSearchHistory', e.message);
        return res.status(500).json({message: "Internal server error", error: e.message});
    }
}