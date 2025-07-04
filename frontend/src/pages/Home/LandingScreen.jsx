import React ,{useState}from 'react'
import { Link } from 'react-router-dom'
import {ChevronRight} from "lucide-react"
import { useNavigate } from 'react-router-dom'

const LandingScreen = () => {
    const [email,setEmail]=useState("");
    const navigate=useNavigate();

    const handleFormSubmit=(e)=>{
        e.preventDefault()
        navigate(`/signup?email=${email}`);
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

        {/*2nd section */}
        <div className='py-10 bg-black text-white'>
            <div className='max-w-6xl mx-auto flex items-center justify-center flex-col-reverse md:flex-row px-4 md:px-2'>
                {/*left side*/}
                <div className='flex-1 relative'>
                    <div className='realtive'>
                        <img src='/stranger-things-lg.png' alt='str-image-1' className='mt-4' />

                        <div className='bg-black flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2'>
                            <img src='/stranger-things-sm.png' alt='str-image-2' className='h-full' />
                            <div className='flex items-center justify-between w-full'>
                                <div className='flex flex-col gap-0'>
                                    <span className='text-md lg:text-lg font-bold'>Stranger Things</span>
                                    <span className='text-blue-500 text-sm'>Downloading...</span>
                                </div>
                                <img src='/download-icon.gif' alt="download-image" className='h-12' />
                            </div>
                        </div>
                    </div>
                </div>
                {/*right side*/}
                <div className='flex-1 text-center md:text-left'>
                    <h2 className='text-4xl md:text-5xl font-extrabold mb-4 text-balance'>Download your shows to watch offline</h2>
                    <p className='text-lg md:text-xl'>Save your favorites easily and always have something to watch.</p>
                </div>
            </div>
        </div>

        {/* separator */}
        <div className='h-2 bg-[#232323] w-full aria-hidden="true" '></div>

        {/*3rd section */}
        <div className='bg-black text-white py-10'>
            <div className='max-w-6xl mx-auto flex items-center justify-center flex-col md:flex-row px-4 md:px-2'>
                {/*left side */}
                <div className='flex-1 text-center md:text-left'>
                    <h1 className='text-4xl md:text-5xl font-extrabold mb-4'>Watch everywhere</h1>
                    <p className='text-lg md:text-xl'>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
                </div>
                 {/*right side */}
                <div className='flex-1 relative overflow-hidden'>
                    <img src={'/device-pile.png'} alt='device image' className='mt-4 z-20 relative ' />
                    <video 
                        className='absolute top-2 left-1/2 -translate-x-1/2 h-2/3 max-w-[63%] z-10'
                        playsInline
                        autoPlay={true}
                        muted
                        loop
                    >
                        <source src='/video-devices.m4v' type='video/mp4' />
                    </video>
                </div>
            </div>
        </div>

        {/* separator */}
        <div className='h-2 bg-[#232323] w-full aria-hidden="true" '></div>

        {/*4th section */}
        <div className='bg-black text-white py-10'>
            <div className='max-w-6xl mx-auto flex items-center justify-center flex-col md:flex-row px-4 md:px-2'>
                 {/*left side */}
                <div className='flex-1 realtive'>
                    <img src='/kids.png' alt='Enjoy on your TV' className='mt-4' />
                </div>
                {/*right side */}
                <div className='flex-1 text-center md:text-left'>
                    <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Create profiles for kids</h2>
                    <p className='text-lg md:text-xl'>Send kids on adventures with their favorite characters in a space made just for them—free
                    with your membership.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LandingScreen