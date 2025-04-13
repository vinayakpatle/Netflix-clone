import React ,{useState}from 'react'
import { Link } from 'react-router-dom'
import {ChevronRight} from "lucide-react"

const LandingScreen = () => {
    const [email,setEmail]=useState("");

    const handleFormSubmit=(e)=>{
        e.preventDefault()
    }

  return (
    <div className='hero-bg relative'>
        <header className='max-w-6xl mx-auto flex items-center justify-between p-4 pb-10'>
            <img src='/netflix-logo.png' alt='Netflix-logo' className='w-32 md:w-52' />
            <Link to={'/login'} className='text-white bg-red-600 py-1 px-2 rounded'>
                Sign In
            </Link>
        </header>

        <div className='max-w-6xl mx-auto flex flex-col items-center justify-center text-center text-white py-40'>
            <h1 className='font-bold text-4xl md:text-6xl mb-4'>Unlimited movies, TV shows, and more</h1>
            <p className='mb-4 text-lg'>Watch anywhere. Cancel anytime.</p>
            <p className='mb-4'>Ready to watch? Enter your email to create or restart your membership.</p>
            
            <form className='flex flex-col md:flex-row gap-4 w-1/2' onSubmit={handleFormSubmit}>
                <input
                    type='email'
                    placeholder='Email address'
                    className='p-2 rounded border flex-1 border-gray-700 bg-black/80'
                    value={email}
                    onChange={(e=>setEmail(e.target.value))}
                />
                <button className='bg-red-600 rounded flex items-center justify-center text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2'>
                    Get Started
                    <ChevronRight className='size-8 md:size-10' />
                </button>
            </form>
        </div>

        {/* separator */}
        <div className='h-2 bg-[#232323] w-full aria-hidden="true" '></div>

        {/*1st section */}
        <div className='bg-black text-white py-10'>
            <div className='max-w-6xl mx-auto flex items-center justify-center flex-col md:flex-row px-4 md:px-2'>
                {/*left side */}
                <div className='flex-1 text-center md:text-left'>
                    <h1 className='text-4xl md:text-5xl font-extrabold mb-4'>Enjoy on your TV</h1>
                    <p className='text-lg md:text-xl'>Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                </div>
                 {/*right side */}
                <div className='flex-1 relative'>
                    <img src={'/tv.png'} alt='Tv image' className='mt-4 z-20 relative ' />
                    <video 
                        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10'
                        playsInline
                        autoPlay={true}
                        muted
                        loop
                    >
                        <source src='/hero-vid.m4v' type='video/mp4' />
                    </video>
                </div>
            </div>
        </div>
        
        {/* separator */}
        <div className='h-2 bg-[#232323] w-full aria-hidden="true" '></div>

    </div>
  )
}

export default LandingScreen