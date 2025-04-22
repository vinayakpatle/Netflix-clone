import React ,{useState,useEffect}from 'react'
import Navbar from '../component/Navbar'
import { Trash} from "lucide-react"
import { axiosInstance } from '../lib/axios.js'
import { SMALL_IMG_BASE_URL } from '../utils/constant'
import {toast} from "react-hot-toast"
import { formatReleaseDate } from '../utils/dateFunction.js'


const SearchHistoryPage = () => {
  const [searchHistory,setSearchHistory]=useState([])

  useEffect(()=>{
    const getSearchHistory=async()=>{
      try{
        const res=await axiosInstance.get('/search/history');
        setSearchHistory(res.data.content);
      }catch(e){
        console.error("Failed to fetch search history:", e);
        setSearchHistory([])
      }
    }
    getSearchHistory();
  },[])

  const handleDelete = async (id) => {
    try{
      await axiosInstance.delete(`/search/delete/${id}`);
      setSearchHistory(searchHistory.filter((item)=>item.id!==id));
    }catch(e){
      toast.error(`Failed to delete search history item: ${id}`)
    }
  }

  if(searchHistory?.length===0){
    return (
      <div className='bg-black min-h-screen text-white'>
        <Navbar />
        <div className='max-w-6xl mx-auto px-4 py-8'>
          <h1 className='text-3xl mb-8 font-bold'>Search History</h1>
            <div className='flex items-center justify-center h-96'>
              <p className='text-xl'>No search history found</p>
            </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-black text-white'>
        <Navbar />
        <div className='max-w-6xl mx-auto px-4 py-8'>
          <h1 className='text-3xl font-bold mb-8'>Search History</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {searchHistory?.map((entry)=>(
                <div key={entry?.id} className='bg-gray-800 p-4 rounded flex items-start'>
                  <img src={`${SMALL_IMG_BASE_URL}/${entry?.image}`} alt="history img" className='size-16 rounded-full object-cover mr-4' />
                  <div className='flex flex-col'>
                    <span className='text-white text-lg'>{entry?.title}</span>
                    <span className='text-gray-400 text-sm'>{formatReleaseDate(entry?.createdAt)}</span>
                  </div>  
                  <span
                    className={`px-3 py-1 min-w-20 text-center rounded-full text-sm ml-auto
                      ${entry?.searchType==='movie' 
                        ?"bg-red-600" 
                        : entry?.searchType==='tv' 
                        ? "bg-blue-600" 
                        : "bg-green-600"} `}
                  >
                    {entry?.searchType[0].toUpperCase()+entry?.searchType.slice(1)}
                  </span>
                  <Trash onClick={()=>handleDelete(entry?.id)} className='size-6 ml-4 cursor-pointer hover:fill-red-400 hover:text-red-400' />
                </div>  
              ))}
          </div>
        </div>
    </div>
  )
}

export default SearchHistoryPage