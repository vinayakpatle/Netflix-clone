import React,{useState,useEffect,useRef} from 'react'
import { useContentStore } from '../store/content.js'
import { Link } from 'react-router-dom';
import { axiosInstance } from '../lib/axios.js';
import {SMALL_IMG_BASE_URL} from '../utils/constant.js'
import { ChevronLeft,ChevronRight } from 'lucide-react';

const ContentSlider = ({category}) => {
    const {contentType}=useContentStore();
    const [content,setContent]=useState([])
    const [showArrow,setShowArrow]=useState(false)
    const scrollRef=useRef(null);

    useEffect(()=>{
        const fetchContentByCategory=async()=>{
            try{
                const response=await axiosInstance.get(`/${contentType}/${category}`);
                setContent(response.data.content)
            }catch(e){
                console.log("Error in fetchContentByCategory "+e?.response?.data?.message)
                setContent([])
            }
        }
        fetchContentByCategory()
    },[contentType,category])

    //console.log(content)

    const scrollLeft=()=>{
        if(scrollRef.current){
            scrollRef.current.scrollBy({left:-scrollRef.current.offsetWidth,behavior:"smooth"})
        }
    }

    const scrollRight=()=>{
        if(scrollRef.current){
            scrollRef.current.scrollBy({left:scrollRef.current.offsetWidth,behavior:"smooth"})
        }
    }

    const formatedCategory=category.replaceAll("_"," ")[0].toUpperCase() + category.replaceAll("_"," ").slice(1);
    const formatedContentType=contentType==="movie" ? "Movie" : "TV Shows";
  return (
    <div
        onMouseEnter={()=>setShowArrow(true)}
        onMouseLeave={()=>setShowArrow(false)}
        className='bg-black text-white relative font-bold px-5 md:px-20'>
        <h2 className='mb-4 text-2xl'>
            {formatedCategory} {formatedContentType}
        </h2>

        <div className='flex items-center space-x-4 overflow-x-scroll no-scrollbar'  ref={scrollRef}>
            {content.map((item,idx)=>
                <Link to={`/watch/${item?.id}`} key={idx} className='min-w-[250px] relative group '>
                    <div className='rounded-lg overflow-hidden '>
                        <img src={`${SMALL_IMG_BASE_URL}/${item?.poster_path}`} alt='Content img' className='transition-transform duration-200 ease-in-out group-hover:scale-125' />
                    </div>
                    <p className='mt-2 text-center'>{item?.title || item?.name}</p>
                </Link>
            )}
        </div>

        {showArrow && (
            <>
            <button 
                className='absolute top-1/2 -translate-y-1/2 left-5 md:left-20 flex items-center justify-center size-12 rounded-full bg-black/50 hover:bg-black/75 text-white z-10'
                onClick={scrollLeft}
            >
                <ChevronLeft size={24} />
            </button>

            <button 
                className='absolute top-1/2 -translate-y-1/2 right-5 md:right-20 flex items-center justify-center size-12 rounded-full bg-black/50 hover:bg-black/75 text-white z-10'
                onClick={scrollRight}
            >
                <ChevronRight size={24} />
            </button>
            </>
        )}
    </div>
  )
}

export default ContentSlider