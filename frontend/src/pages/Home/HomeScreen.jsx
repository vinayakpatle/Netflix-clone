import React from 'react'
import { useAuthStore } from '../../store/authStore'
import Navbar from '../../component/Navbar'
import { Link } from 'react-router-dom'
import {Play,Info} from 'lucide-react'

const HomeScreen = () => {
  

  return (
    <div className='relative h-screen text-white '>
        <Navbar />
        <img src='/extraction.jpg' alt='Content-poster' className='absolute top-0 left-0 w-full h-full object-cover -z-50'/>

        <div className='absolute top-0 left-0 w-full h-full bg-black/50 -z-50' aria-hidden='true' />

        <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
          <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-transparent' />

          <div className='max-w-2xl'>
            <h1 className='text-6xl mt-4 font-extrabold text-balance'>
              Extraction
            </h1>
            <p className='mt-2 text-lg'>
              2020 | 18+
            </p>
            <p className='mt-4 text-lg'>
            While battling his own demons, Tyler, a ruthless mercenary, accepts the offer of rescuing an Indian crime lord's teenage son from Bangladesh. However, when he arrives, a gruesome blood bath ensues.
            </p>
          </div>

          <div className='mt-8 flex'>
            <Link to='/play' className='flex items-center mr-4 bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded'>
              <Play className='size-6 mr-2 fill-black' />
              Play
            </Link>

            <Link to='/info' className='flex items-center bg-gray-500/30 hover:scale-105 text-white font-medium rounded py-2 px-4 '>
              <Info className='size-6 mr-2' />
              More Info
            </Link>
          </div>
        </div>
    </div>
  )
}

export default HomeScreen