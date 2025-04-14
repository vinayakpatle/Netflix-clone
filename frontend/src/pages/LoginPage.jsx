import React ,{useState,useEffect}from 'react'
import {Link} from 'react-router-dom';
import {Loader} from 'lucide-react';
import {toast} from 'react-hot-toast'
import { useAuthStore } from '../store/authStore';



const LoginPage = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const {isLoggingIn,login}=useAuthStore()

    const validateForm = () => {
        if(!email.trim()) return toast.error("Email is required");
        if(!/\S+@\S+\.\S+/.test(email)) return toast.error("Invalid error format");
        if(!password) return toast.error("Password is required");
        if(password.length<6) return toast.error("Password must be at least 6 character")
        return true;
      };

    const handleLogin=(e)=>{
        e.preventDefault();
        const success=validateForm();

        if(success===true){
            login({email:email,password:password})
        }
    }

  return (
        <div className='h-screen w-full hero-bg'>
            <header className='max-w-6xl mx-auto flex items-center justify-between p-4 '>
                <Link to={"/"}>
                    <img src="/netflix-logo.png" alt='logo' className='w-52' />
                </Link>
            </header>
            <div className='flex items-center justify-center mt-20 mx-3'>
                <div className='w-full max-w-md bg-black/60 space-y-6 rounded-lg shadow-md p-8'>
                    <h1 className='text-center text-white font-bold text-2xl mb-4'>
                        Login
                    </h1>
                    <form onSubmit={handleLogin} className='space-y-4' >
                        <div>
                            <label htmlFor='email' className='text-sm font-medium text-gray-300 block'>
                                Email
                            </label>
                            <input
                                type='email'
                                className='w-full mt-1 py-2 px-3 rounded-md border border-gray-700 bg-transparent text-white focus:outline-none focus:ring'
                                placeholder='you@example.com'
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                id='email'
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='text-sm font-medium text-gray-300 block'>
                                Password
                            </label>
                            <input
                                type='password'
                                className='w-full mt-1 py-2 px-3 rounded-md border border-gray-700 bg-transparent text-white focus:outline-none focus:ring'
                                placeholder='••••••••'
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                id='password'
                            />
                        </div>
    
                        <button type='submit' disabled={isLoggingIn} className='w-full bg-red-600 flex items-center justify-center text-white font-semibold rounded-md py-2 hover:bg-red-700 focus:ring'>
                            {isLoggingIn ? <Loader className='size-7 animate-spin' /> : "Login"}
                        </button>
                    </form>
                    <div className='text-gray-400 text-center'>
                        Don't have an account?{" "}
                        <Link to="/signup" className='text-red-500 hover:underline'>
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default LoginPage