import React ,{useState,useEffect,useRef} from 'react'
import { useParams,Link } from 'react-router-dom'
import { useContentStore } from '../store/content'
import { axiosInstance } from '../lib/axios'
import Navbar from '../component/Navbar'
import { ChevronLeft,ChevronRight } from 'lucide-react'
import ReactPlayer from 'react-player'
import {formatReleaseDate} from '../utils/dateFunction.js'
import {ORIGINAL_IMG_BASE_URL,SMALL_IMG_BASE_URL} from "../utils/constant.js"
import WatchPageSkeleton from "../component/skeleton/WatchPageSkeleton.jsx"

const WatchPage = () => {
    const {id}=useParams() // it gives object that's why destructure it
    const [trailers,setTrailers]=useState([]);
    const [currentTrailerId,setCurrentTrailerId]=useState(0)
    const [content,setContent]=useState(null);
    const [loading,setLoading]=useState(true);
    const [similarContent,setSimilarContent]=useState([]);
    const {contentType}=useContentStore()
    const scrollRef=useRef(null)

    useEffect(()=>{
        const fetchTrailers=async()=>{
            try{
                const response=await axiosInstance.get(`/${contentType}/${id}/trailers`);
                setTrailers(response.data.trailers);
            }catch(e){
                console.log("Error in fetchTrailers "+e?.response?.data?.message);
                setTrailers([])
            }
        }
        fetchTrailers()

    },[contentType,id])

    useEffect(()=>{
        const fetchSimilarContent=async()=>{
            try{
                const response=await axiosInstance.get(`/${contentType}/${id}/similar`)
                setSimilarContent(response.data.similarContent)
            }catch(e){
                console.log("Error in fetchSimilarContent "+e?.response?.data?.message);
                setSimilarContent([])
            }
        }
        fetchSimilarContent()
    },[contentType,id])

    
    useEffect(()=>{
        const fetchContentDetails=async()=>{
            try{
                const response=await axiosInstance.get(`/${contentType}/${id}/details`)
                setContent(response.data.details)
            }catch(e){
                console.log("Error in fetchContentDetails "+e?.response?.data?.message);
                setContent(null)
            }finally{
                setLoading(false)
            }
        }
        fetchContentDetails()
    },[contentType,id]);

    if(loading){
        return <div className='min-h-screen bg-black p-10'>
            <WatchPageSkeleton />
        </div>
    }

    if(!content){
        return <div className='bg-black min-h-screen text-white'>
            <div className='max-w-6xl mx-auto'>
                <Navbar />
                <div className='text-center h-full px-4 py-8 mt-40'>
                    <h1 className='text-2xl sm:text-5xl font-bold text-balance'>Content not found 😥</h1>
                </div>
            </div>
        </div>
    }


    const handlePrev=()=>{
        if(currentTrailerId>0){
            setCurrentTrailerId(curr=>curr-1);
        }
    }

    const handleNext=()=>{
        if(currentTrailerId<trailers.length-1){
            setCurrentTrailerId(curr=>curr+1);
        }
    }

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

    //console.log(trailers)
    //console.log(similarContent)
    //console.log(content)

  return (
    <div className='bg-black min-h-screen text-white'>
        <div className='mx-auto container px-4 py-8 h-full'>
            <Navbar />

            {trailers.length>0 && (
                <div className='flex items-center justify-between mb-4'>
                    <button 
                        disabled={currentTrailerId===0}
                        className={`px-4 py-2 bg-gray-500/70 hover:bg-gray-500 rounded text-white ${currentTrailerId===0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handlePrev}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        disabled={currentTrailerId===trailers.length-1}
                        className={`px-4 py-2 bg-gray-500/70 hover:bg-gray-500 rounded text-white ${currentTrailerId===trailers.length-1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleNext}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            )}

            <div className='aspect-video mb-8 p-2 sm:px-10 md:px-32 '>
                {trailers.length>0 && (
                    <ReactPlayer 
                        controls={true}
                        width={"100%"}
                        height={"70vh"}
                        className='mx-auto overflow-hidden rounded'
                        url={`https://www.youtube.com/watch?v=${trailers[currentTrailerId]?.key}`}
                    />
                )}

                {trailers.length===0 && (
                    <h2 className='text-xl text-center mt-5'>
                        No trailers available for{" "}
                        <span className='font-bold text-red-600'>{content?.name || content?.title}</span> 😥
                    </h2>
                )}
            </div>

            {/* MOVIE DETAILS*/}
            <div className='max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-20'>
                <div className='mb-4 md:mb-0'>
                    <h2 className='text-5xl font-bold text-balance'>{content?.name || content?.title}</h2>
                    <p className='mt-2 text-lg'>
                        {formatReleaseDate(content?.release_date || content?.first_air_date)}{" "}| {" "}
                        {content?.adult ? <span className=' text-red-600'>
                            18+
                        </span> : <span className=' text-green-600'>PG-13</span>}
                    </p>
                    <p className='text-lg mt-4'>{content?.overview}</p>
                </div>
                <img src={`${ORIGINAL_IMG_BASE_URL}/${content?.poster_path}`}  alt={"poster img"} className='max-h-[600px] rounded-md' />
            </div>

            {/*SIMILAR CONTENT*/}
            {similarContent.length>0 && (
                <div className='mt-12 max-w-5xl mx-auto relative'>
                    <h3 className='text-3xl font-bold mb-4'>Similar Movies/Tv Show</h3>
                    <div className='flex overflow-x-scroll no-scrollbar gap-4 pb-4 ' ref={scrollRef}>
                        {similarContent.map((content)=>{
                            if (content.poster_path === null) return null;
                            return (
                                <Link key={content?.id} to={`/watch/${content?.id}`} className='w-52 flex-none'>
                                    <img src={`${SMALL_IMG_BASE_URL}/${content.poster_path}`} 
                                    alt='poster img'
                                    className='w-full rounded-md h-auto hover:scale-110 transition-transform duration-200 ease-in-out'/>

                                    <h4 className='mt-2 text-lg font-semibold'>{content?.name || content?.title}</h4>
                                </Link>
                            )
                        })}
                    </div>

                    <div className='absolute top-1/2 -translate-y-1/2 left-2 flex items-center justify-center bg-black/60 hover:bg-black/75  rounded-full cursor-pointer size-10 text-white' onClick={scrollLeft} >
                        <ChevronLeft size={24} />
                    </div>

                    <div className='absolute top-1/2 -translate-y-1/2 right-2 flex items-center justify-center bg-black/60 hover:bg-black/75  rounded-full cursor-pointer size-10 text-white' onClick={scrollRight}>
                        <ChevronRight size={24} />
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default WatchPage