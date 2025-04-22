import React from 'react'
import {Link} from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div style={{backgroundImage:'url("/404.png")'}} className='min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white'>
        <header className='absolute top-0 left-0 p-4 bg-black w-full'>
            <Link to='/' className=''>
                <img src='/netflix-logo.png' alt='netflix-logo' className='h-10' />
            </Link>
        </header>
        <main className='text-center error-page--content z-10'>
            <h1 className='text-7xl font-semibold mb-4'>Lost your way?</h1>
            <p className='mb-6 text-xl'>Sorry, we can't find that page. You'll find lots to explore on the home page.</p>
            <Link to='/' className='bg-white text-black px-4 py-2 rounded'>
                Netflix Home
            </Link>
        </main>
    </div>
  )
}

export default NotFoundPage