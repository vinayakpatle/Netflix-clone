import React,{useState,useEffect}from 'react'
import Navbar from '../component/Navbar';
import { useContentStore } from '../store/content.js';
import { Search } from 'lucide-react';
import { axiosInstance } from '../lib/axios.js';
import {toast } from 'react-hot-toast'
import {Link} from 'react-router-dom'
import {SMALL_IMG_BASE_URL} from "../utils/constant.js"
 
const SearchPage = () => {
    const [activeTab,setActiveTab]=useState('movie');
    const [searchQuery,setSearchQuery]=useState('');
    const [results,setResults]=useState([])
    const {setContentType}=useContentStore()
    const [searching,setSearching]=useState(false)

    const handleTabClick=(tab)=>{
        setActiveTab(tab);
        tab==="movie" ? setContentType("movie") : setContentType("tv");
        setResults([]);
    }

    const handleSearch=async(e)=>{
        e.preventDefault()
        setSearching(true)
        try{
            const response=await axiosInstance.get(`/search/${activeTab}/${searchQuery}`);
            setResults(response.data.content);
        }catch(e){
            if(e.response.status===404){
                toast.error("Nothing found, make sure you are searching under the right category")
            }
            else{
                toast.error("An error occurred, please try again later")
            }
        }finally{
            setSearching(false);
        }
    }

    console.log(results)

  return (
    <div className='bg-black min-h-screen text-white'>
        <Navbar />
        <div className='container mx-auto px-4 py-8 h-full'>
            <div className='flex justify-center gap-3  mb-4'>
                <buton 
                    className={`px-4 py-2 rounded ${activeTab==="movie" ? 'bg-red-600' : 'bg-gray-800'} hover:bg-red-800`} 
                    onClick={()=>handleTabClick("movie")}
                >
                    Movie
                </buton>
                <buton 
                    className={`px-4 py-2 rounded ${activeTab==="tv" ? 'bg-red-600' : 'bg-gray-800'} hover:bg-red-800`}
                    onClick={()=>handleTabClick("tv")}
                >
                    TV Shows
                </buton>
                <buton 
                    className={`px-4 py-2 rounded ${activeTab==="person" ? 'bg-red-600' : 'bg-gray-800'} hover:bg-red-800`}
                    onClick={()=>handleTabClick("person")}
                >
                    Person
                </buton>
            </div>

            <form onSubmit={handleSearch} className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto'>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e)=>setSearchQuery(e.target.value)}
                    placeholder={`Search for a ${activeTab}`}
                    className='w-full p-2 bg-gray-800 rounded text-white'
                />
                <button disabled={searching} type='submit' className='p-2 rounded bg-red-600 hover:bg-red-800 text-white cursor-pointer'>
                    <Search className='size-6' />
                </button>
            </form>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {results.map((result)=>{
                    if(!result.poster_path && !result.profile_path) return null;
                    return(
                        <div key={result.id} className='bg-gray-800 p-4 rounded'>
                            {activeTab==="person" ? (
                                <div className='flex flex-col items-center'>
                                    <img src={`${SMALL_IMG_BASE_URL}/${result.profile_path}`} alt={`${result?.name}`} className='max-h-96 rounded mx-auto' />
                                    <h2 className='mt-2 text-xl text-center font-bold'>{result.name}</h2>
                                </div>    
                            ) : (
                                <Link onClick={()=>{setContentType(activeTab)}} to={`/watch/${result.id}`} className='flex flex-col items-center'>
                                    <img src={`${SMALL_IMG_BASE_URL}/${result.poster_path}`} alt={result?.name || result?.title}
                                    className='max-h-96 mx-auto rounded'  
                                    />
                                    <h2 className='mt-2 text-xl font-bold text-center'>{result?.name || result?.title}</h2>
                                </Link>
                            )}
                         </div>   
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default SearchPage