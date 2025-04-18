import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LogOut, Menu, Search } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useContentStore } from '../store/content.js'

const Navbar = () => {
    const [isMobileMenuOpen, setIsMbileMenuOpen] = useState(false);
    const { logout, user } = useAuthStore()
    const {setContentType}=useContentStore();

    const toggleMenuOpen = () => {
        setIsMbileMenuOpen(curr => !curr);
    }

    return <>
        <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between h-20 p-4'>
            <div className='flex items-center gap-10 z-50'>
                <Link to='/' >
                    <img src='/netflix-logo.png' alt='Netflix-logo' className='w-32 sm:w-40 md:w-52' />
                </Link>

                {/* desktop navbar item */}
                <div className='hidden sm:flex items-center gap-2'>
                    <Link to='/' className='hover:underline' onClick={()=>setContentType("movie")}>
                        Movies
                    </Link>

                    <Link to='/' className='hover:underline' onClick={()=>setContentType("tv")}>
                        Tv Shows
                    </Link>

                    <Link to='/history' className='hover:underline'>
                        Search History
                    </Link>
                </div>
            </div>

            <div className='flex items-center gap-2 z-50'>
                <Link to='/search'>
                    <Search className='size-6 cursor-pointer' />
                </Link>
                <img src={user.image} alt='avatar-logo' className='rounded cursor-pointer h-8' />
                <LogOut className='size-6 cursor-pointer' onClick={logout} />
                <div className='sm:hidden'>
                    <Menu className='size-6 cursor-pointer' onClick={toggleMenuOpen} />
                </div>
            </div>

            {/* mobile navbar item */}
            {isMobileMenuOpen && (<div className='w-full sm:hidden mt-4 z-50 border border-gray-800 bg-black rounded'>
                <Link to='/' className='p-2 block hover:underline' onClick={toggleMenuOpen} >
                    Movies
                </Link>

                <Link to='/' className='p-2 block hover:underline' onClick={toggleMenuOpen}>
                    Tv Shows
                </Link>

                <Link to='/history' className='p-2 block hover:underline' onClick={toggleMenuOpen}>
                    Search History
                </Link>
            </div>)}
        </header>


    </>
}

export default Navbar