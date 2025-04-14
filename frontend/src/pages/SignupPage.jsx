import React ,{useState,useEffect}from 'react'
import {Link} from 'react-router-dom'
import { useSearchParams } from 'react-router-dom';
import {Loader} from 'lucide-react';
import {toast} from 'react-hot-toast'
import { useAuthStore } from '../store/authStore.js';

const SignupPage = () => {
    const [searchParams]=useSearchParams();
    const emailValue=searchParams.get("email");

    const [email,setEmail]=useState(emailValue || "");
    const [password,setPassword]=useState("");
    const [username,setUsername]=useState("");

    const {isSigningUp,signup}=useAuthStore();
    
    const validateForm = () => {
        if(!email.trim()) return toast.error("Email is required");
        if(!/\S+@\S+\.\S+/.test(email)) return toast.error("Invalid error format");
        if(!username.trim()) return toast.error("Username is required");
        if(!password) return toast.error("Password is required");
        if(password.length<6) return toast.error("Password must be at least 6 character")
        return true;
      }

    const handleSignup=(e)=>{
        e.preventDefault();
        const success=validateForm()
        if(success===true){
            signup({email:email,username:username,password:password});
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
                    Sign Up
                </h1>
                <form onSubmit={handleSignup} className='space-y-4' >
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
                        <label htmlFor='username' className='text-sm font-medium text-gray-300 block'>
                            Username
                        </label>
                        <input
                            type='text'
                            className='w-full mt-1 py-2 px-3 rounded-md border border-gray-700 bg-transparent text-white focus:outline-none focus:ring'
                            placeholder='vinayak patle'
                            value={username}
                            onChange={e=>setUsername(e.target.value)}
                            id='username'
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

                    <button type='submit' disabled={isSigningUp} className='w-full bg-red-600 flex items-center justify-center text-white font-semibold rounded-md py-2 hover:bg-red-700 focus:ring'>
                        {isSigningUp ? <Loader className='size-7 animate-spin'/> : "Sign Up"}
                    </button>
                </form>
                <div className='text-gray-400 text-center'>
                    Already a member?{" "}
                    <Link to="/login" className='text-red-500 hover:underline'>
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignupPage;