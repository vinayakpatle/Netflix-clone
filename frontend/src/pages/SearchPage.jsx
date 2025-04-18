import React,{useState,useEffect}from 'react'
import Navbar from '../component/Navbar';
import { useContentStore } from '../store/content.js';

const SearchPage = () => {
    const [activeTab,setActiveTab]=useState('movie');
    const [searchQuery,setSearchQuery]=useState('');
    const [results,setResults]=useState([])
    const {setContentType}=useContentStore()

    const handleTabClick=(tab)=>{
        setActiveTab(tab);
        tab==="movie" ? setContentType("movie") : setContentType("tv");
        setResults([]);
    }

  return (
    <div className='bg-black min-h-screen text-white'>
        <Navbar />
        <div className='container mx-auto px-4 py-8 h-full'>
            <div className='flex justify-center gap-3 mb-4'>
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
        </div>
    </div>
  )
}

export default SearchPage